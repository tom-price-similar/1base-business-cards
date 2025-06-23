document.addEventListener('DOMContentLoaded', function() {
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareCard);
    }
    
    // Save contact functionality
    const saveContactBtn = document.getElementById('save-contact-btn');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', saveContact);
    }
});

// Share business card
async function shareCard() {
    const name = document.getElementById('name').textContent;
    const title = document.getElementById('title').textContent;
    const company = document.getElementById('company').textContent;
    
    const shareData = {
        title: `${name}'s Business Card`,
        text: `${name} | ${title} at ${company}`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            alert('Copy this link to share: ' + window.location.href);
        }
    } catch (err) {
        console.error('Error sharing: ', err);
    }
}

// Save contact as vCard
function saveContact() {
    const name = document.getElementById('name').textContent;
    const phone = document.getElementById('phone').textContent;
    const email = document.getElementById('email').textContent;
    const website = document.getElementById('website').textContent;
    const company = document.getElementById('company').textContent;
    const title = document.getElementById('title').textContent;
    const location = document.getElementById('location').textContent;
    
    // Create vCard content
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=WORK,VOICE:${phone}
EMAIL;TYPE=WORK:${email}
URL:${website}
ORG:${company}
TITLE:${title}
ADR;TYPE=WORK:;;${location}
END:VCARD`;
    
    // Create a downloadable link for the vCard
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_contact.vcf`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Check if app is being used in standalone mode (installed)
window.addEventListener('load', () => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        console.log('App is running in standalone mode');
        // You can add special behaviors for installed app mode here
    }
});