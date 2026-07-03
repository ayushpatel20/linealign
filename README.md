# LINEALIGN DENTAL LAB - Static Website

A premium, fully static, serverless website built for LINEALIGN DENTAL LAB. The site is optimized for performance, SEO, and visual excellence, and runs entirely on client-side HTML, CSS, and vanilla JavaScript.

## Features
- **Zero Node.js Server Overhead**: No database, no backend routing, no NPM dependencies.
- **Run Directly in Browser**: Open `index.html` directly from a local drive (`file://` protocol) or upload to any static host.
- **Extensionless URLs**: Configured `.htaccess` rewrite rules mapping pretty urls like `/solutions` to `solutions.html` internally.
- **Tailwind CSS Stylesheet**: Contains pre-compiled production CSS preserving all custom styles, responsive grid layouts, animations, and typography.
- **Interactive Biomechanics**: Smooth vanilla JavaScript components (visual sliders, animated counters, FAQ accordions, lightboxes).

## Directory Structure
```text
├── index.html        # Home Page
├── solutions.html    # Orthodontic Innovations Page
├── pricing.html      # Flexible Aligner Pricing Page
├── payment.html      # Checkout Registration & Order Summary Page
├── our-story.html    # Team Biography Page
├── faq.html          # Contact details & Accordion FAQ Helpdesk
├── css/
│   └── styles.css    # Compiled production Tailwind CSS stylesheet
├── js/
│   └── main.js       # Client-side interactive ES6+ JS file
└── public/           # Static asset images, logos, clinical videos
```

## Deployment on cPanel
1. Compress all files and directories into a single `.zip` folder.
2. Log into your cPanel File Manager and upload the zip file directly into the `public_html` directory of your domain.
3. Extract the zip file in `public_html`.
4. Ensure the `.htaccess` file is also extracted to support pretty URLs.
5. That's it! The website will run instantly at your domain name without requiring Node.js Passenger settings or background server tasks.
