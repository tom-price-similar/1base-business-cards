# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **1base Digital Business Card PWA** (Progressive Web App) project. The main purpose is to display digital business cards for team members that can be accessed directly via URL and installed as a PWA on mobile devices.

## Architecture & Structure

### Current Implementation
- **Single business card approach**: Each team member has their own HTML file (e.g., `yamen.html`)
- **Self-contained files**: Business cards include embedded fonts, styles, and assets to avoid Firebase hosting path issues
- **PWA functionality**: Includes manifest.json, service worker, and proper icons for mobile installation

### Key Files
- `yamen.html` - Main business card for Yamen (can be duplicated for other team members)
- `manifest.json` - PWA manifest configuration
- `service-worker.js` - Caches resources for offline functionality (needs updating for current structure)
- `fonts/` - Custom fonts (Coolvetica and Helixa)
- `images/` - Icons, logos, and background assets

### Design System
- **Background**: Custom gradient SVG (`images/bg.svg`)
- **Fonts**: Coolvetica (primary), Helixa (contact details)
- **Colors**: Purple theme (#1B0E2E, #3E26FF, #6366f1)
- **Logo**: 1base SVG logo embedded in HTML

## Development Workflow

### Creating New Business Cards
1. **Duplicate** `yamen.html` to create new team member cards (e.g., `john.html`)
2. **Update personal information**:
   - Name in `<h1 id="card-name">`
   - Title/role in `<p id="card-title">`
   - Company description in `<h2 id="company-description">`
   - Contact details in `.contact-section` elements
3. **Update vCard data** in the QR code generation script with correct contact info
4. **Test QR code** - ensure proper vCard format for mobile contact import

### vCard Format Requirements
The QR code uses vCard 3.0 format:
```
FN:Full Name
N:LastName;FirstName;;;
ORG:Company
TITLE:Job Title
TEL;TYPE=WORK,VOICE:+1234567890
EMAIL;TYPE=WORK:email@company.com
URL:https://company.com
```

### Firebase Deployment Considerations
- **Self-contained approach**: All assets are embedded to avoid 400 errors from Firebase hosting
- **PWA icons**: Multiple sizes (180x180, 152x152, 120x120) for proper iOS/Android support
- **Manifest configuration**: Points to main business card file as start_url

## Common Development Tasks

### Updating Service Worker
The service worker cache needs updating when files change:
1. Update `CACHE_NAME` version number
2. Update `urlsToCache` array to match current file structure
3. Remove references to deleted files (create.html, card.html, etc.)

### Fixing Path Issues
If assets don't load on Firebase:
1. Check relative paths (use `images/file.png` not `../images/file.png`)
2. Consider embedding assets as base64 data URIs for critical resources
3. Update manifest.json paths if needed

### Testing PWA Installation
1. **Desktop**: Chrome DevTools > Application > Manifest
2. **Mobile**: Test "Add to Home Screen" functionality
3. **Offline**: Verify service worker caching works correctly

## Technical Notes

### Font Loading
Fonts are embedded as base64 data URIs to ensure reliable loading across all deployment environments.

### QR Code Library
Uses QRCode.js from CDN (https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js).

### Background Assets
The background SVG uses a custom gradient and clip path for the distinctive card design.

## Troubleshooting

### Common Issues
1. **Fonts not loading**: Check base64 encoding and @font-face declarations
2. **Background not showing**: Verify SVG path and CSS background-image property  
3. **QR code not generating**: Check vCard format and QRCode.js library loading
4. **PWA not installing**: Verify manifest.json, HTTPS requirement, and service worker registration

### Firebase Deployment
- Ensure all paths are relative to the domain root
- Test on different devices after deployment
- Clear browser cache when testing changes