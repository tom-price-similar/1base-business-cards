document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');
    
    if (!cardId) {
        window.location.href = 'create.html';
        return;
    }
    
    const cardData = localStorage.getItem(`card_${cardId}`);
    if (!cardData) {
        window.location.href = 'create.html';
        return;
    }
    
    const data = JSON.parse(cardData);
    displayCard(data);
    generateQRCode(data);
});

function displayCard(data) {
    // Display and link email
    const emailLink = document.getElementById('email-link');
    emailLink.href = `mailto:${data.email}`;
    emailLink.textContent = data.email;
}

function generateQRCode(data) {
    const vCardData = generateVCard(data);
    const qrContainer = document.getElementById('qr-code');
    
    // Clear any existing QR code
    qrContainer.innerHTML = '';
    
    try {
        // Create QR code using qrcode.js library
        new QRCode(qrContainer, {
            text: vCardData,
            width: 200,
            height: 200,
            colorDark: '#2c2b3e',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        // Fallback: show the vCard data as text
        qrContainer.innerHTML = '<p style="color: #666; text-align: center;">QR Code generation failed</p>';
    }
}

function generateVCard(data) {
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.company}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL;TYPE=WORK:${data.email}
URL:https://1base.io
END:VCARD`;
    
    return vCard;
}

async function shareCard(data) {
    const shareData = {
        title: `${data.name}'s Business Card`,
        text: `Contact ${data.name} at ${data.company}`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else if (navigator.clipboard) {
            // Use modern Clipboard API
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        }
    } catch (err) {
        console.error('Error sharing: ', err);
        alert('Could not share or copy link');
    }
}

function saveContact(data) {
    const vCard = generateVCard(data);
    
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}_contact.vcf`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}