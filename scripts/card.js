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
    
    document.getElementById('share-btn').addEventListener('click', () => shareCard(data));
    document.getElementById('save-contact-btn').addEventListener('click', () => saveContact(data));
});

function displayCard(data) {
    document.getElementById('company-name').textContent = data.company;
    document.getElementById('company-description').textContent = `Contact ${data.name} at ${data.company}`;
    
    const websiteLink = document.getElementById('website-link');
    if (data.website) {
        let website = data.website;
        if (!website.startsWith('http://') && !website.startsWith('https://')) {
            website = 'https://' + website;
        }
        websiteLink.href = website;
        websiteLink.textContent = data.website.replace(/^https?:\/\//, '');
    }
    
    const emailLink = document.getElementById('email-link');
    emailLink.href = `mailto:${data.email}`;
    emailLink.textContent = data.email;
}

function generateQRCode(data) {
    const vCardData = generateVCard(data);
    const qrContainer = document.getElementById('qr-code');
    
    QRCode.toCanvas(document.createElement('canvas'), vCardData, {
        width: 200,
        margin: 2,
        color: {
            dark: '#2c2b3e',
            light: '#ffffff'
        }
    }, function (error, canvas) {
        if (error) {
            console.error(error);
            return;
        }
        qrContainer.appendChild(canvas);
    });
}

function generateVCard(data) {
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.company}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL;TYPE=WORK:${data.email}`;
    
    if (data.website) {
        vCard += `\nURL:${data.website}`;
    }
    
    vCard += '\nEND:VCARD';
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
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        }
    } catch (err) {
        console.error('Error sharing: ', err);
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