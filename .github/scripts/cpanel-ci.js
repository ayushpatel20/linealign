const https = require('https');
const url = require('url');

const host = process.env.CPANEL_HOST;
const username = process.env.CPANEL_USER;
const password = process.env.CPANEL_PASS;
const action = process.argv[2]; // 'backup', 'rollback', 'cleanup'
const backupName = process.env.BACKUP_NAME || `backup-${Date.now()}.zip`;

if (!host || !username || !password) {
  console.error("Error: Missing CPANEL_HOST, CPANEL_USER, or CPANEL_PASS environment variables.");
  process.exit(1);
}

if (!['backup', 'rollback', 'cleanup'].includes(action)) {
  console.error("Error: Action must be 'backup', 'rollback', or 'cleanup'.");
  process.exit(1);
}

function makeRequest(params) {
  return new Promise((resolve, reject) => {
    const query = new URLSearchParams({
      cpanel_jsonapi_user: username,
      cpanel_jsonapi_apiversion: '2',
      cpanel_jsonapi_module: 'Fileman',
      cpanel_jsonapi_func: 'fileop',
      ...params
    }).toString();

    // Construct URL with query parameters
    const requestUrl = `https://${host}:2083/json-api/cpanel?${query}`;
    console.log(`Connecting to cPanel at: https://${host}:2083`);

    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      },
      // Many cPanel servers use self-signed certificates or hostnames that don't match the client domain.
      // We set rejectUnauthorized to false to make the deployment pipeline extremely resilient.
      rejectUnauthorized: false 
    };

    const req = https.request(requestUrl, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP status code ${res.statusCode}: ${data}`));
          return;
        }

        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

function getCpanelResult(result) {
  if (!result || !result.cpanelresult) {
    throw new Error(`Unexpected cPanel API response format (missing cpanelresult). Full response: ${JSON.stringify(result)}`);
  }
  return result.cpanelresult;
}

async function run() {
  try {
    if (action === 'backup') {
      console.log(`[Backup] Compressing 'public_html' into '${backupName}'...`);
      const result = await makeRequest({
        op: 'compress',
        sourcefiles: 'public_html',
        destfiles: backupName,
        doubledecode: '0'
      });

      const cpanelResult = getCpanelResult(result);
      if (cpanelResult.error) {
        throw new Error(cpanelResult.error);
      }
      
      const success = cpanelResult.data && cpanelResult.data[0] && cpanelResult.data[0].result === 1;
      if (!success) {
        const reason = (cpanelResult.data && cpanelResult.data[0] && cpanelResult.data[0].reason) || "Unknown error";
        throw new Error(`Backup failed: ${reason}`);
      }

      console.log(`[Backup] Success! Website backed up to home directory as '${backupName}'`);
    } 
    else if (action === 'rollback') {
      console.log(`[Rollback] Extracting '${backupName}' back into home directory...`);
      const result = await makeRequest({
        op: 'extract',
        sourcefiles: backupName,
        destfiles: '', // Extracts to home directory (which contains public_html)
        doubledecode: '0'
      });

      const cpanelResult = getCpanelResult(result);
      if (cpanelResult.error) {
        throw new Error(cpanelResult.error);
      }

      const success = cpanelResult.data && cpanelResult.data[0] && cpanelResult.data[0].result === 1;
      if (!success) {
        const reason = (cpanelResult.data && cpanelResult.data[0] && cpanelResult.data[0].reason) || "Unknown error";
        throw new Error(`Rollback failed: ${reason}`);
      }

      console.log(`[Rollback] Success! Extracted '${backupName}' and restored website state.`);
    } 
    else if (action === 'cleanup') {
      console.log(`[Cleanup] Deleting backup archive '${backupName}'...`);
      const result = await makeRequest({
        op: 'unlink',
        sourcefiles: backupName,
        doubledecode: '0'
      });

      const cpanelResult = getCpanelResult(result);
      if (cpanelResult.error) {
        console.warn(`[Cleanup Warning] Failed to delete backup file: ${cpanelResult.error}`);
      } else {
        console.log(`[Cleanup] Success! Temporary backup file '${backupName}' deleted.`);
      }
    }
  } catch (error) {
    console.error(`[Error] Action '${action}' failed:`, error.message);
    process.exit(1);
  }
}

run();
