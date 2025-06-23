# Digital Business Card PWA

A Progressive Web App (PWA) that displays a digital business card. Works on both iOS and Android devices.

## Features

- Responsive design for all device sizes
- Works offline with service worker caching
- Installable on home screen
- Share functionality
- Save contact as vCard
- Customizable

## Setup Instructions

1. Replace placeholder content in `index.html` with your personal information
2. Replace `images/profile.jpg` with your profile photo
3. Generate app icons in various sizes and place them in the `images/icons` directory
4. Deploy to your web hosting service (needs HTTPS)

## Customization

You can customize the business card by:

- Changing colors in `styles/styles.css`
- Adding or removing social links in `index.html`
- Modifying the layout in `styles/styles.css`

## Deployment

To deploy this PWA, upload all files to a web server that supports HTTPS. The app needs to be served over HTTPS for service workers to function properly.

## Icon Generation

You need to generate icons in different sizes as specified in the `manifest.json` file:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

You can use tools like [PWA Image Generator](https://www.pwabuilder.com/imageGenerator) to create these icons from a single image.

## Testing Installation

1. Open the website in Chrome on Android or Safari on iOS
2. For Android: Look for the "Add to Home Screen" prompt or use the menu option
3. For iOS: Use the Share button and select "Add to Home Screen"

## License

MIT