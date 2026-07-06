<?php
// Secure Webhook Listener for GitHub Repository Deletion
// Automatically deletes public_html files if the repository is deleted on GitHub.

$webhook_secret = 'MySuperSecretWebhookKey2026!'; // Configure the same secret in GitHub Webhooks

// Verify signature for security
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');

if (empty($signature) || empty($payload)) {
    http_response_code(400);
    exit('Missing signature or payload');
}

list($algo, $hash) = explode('=', $signature, 2);
if ($algo !== 'sha256' || !hash_equals(hash_hmac('sha256', $payload, $webhook_secret), $hash)) {
    http_response_code(403);
    exit('Invalid signature');
}

$data = json_decode($payload, true);
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';

// Check if the repository was deleted
if ($event === 'repository' && isset($data['action']) && $data['action'] === 'deleted') {
    echo "Repository deletion event received. Cleaning up public_html...\n";
    
    $dir = __DIR__;
    
    // Set up recursive iterator to delete files first, then directories
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );

    foreach ($files as $fileinfo) {
        $path = $fileinfo->getRealPath();
        
        // Preserve default server-level exclusions if they exist inside public_html
        $basename = $fileinfo->getBasename();
        if (in_array($basename, ['.well-known', '.cpanel', 'cgi-bin'])) {
            continue;
        }

        if ($fileinfo->isDir()) {
            @rmdir($path);
        } else {
            // Delete file, but do not delete ourselves yet
            if ($path !== __FILE__) {
                @unlink($path);
            }
        }
    }
    
    // Finally, self-destruct this cleanup script to leave public_html clean
    @unlink(__FILE__);
    echo "Cleanup complete. Site files deleted.";
} else {
    echo "Event ignored: " . htmlspecialchars($event) . " / " . htmlspecialchars($data['action'] ?? '');
}
?>
