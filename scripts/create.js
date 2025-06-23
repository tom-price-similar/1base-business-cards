document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-card-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const cardData = {
            name: formData.get('name'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            website: formData.get('website')
        };
        
        const cardId = generateUniqueId();
        
        localStorage.setItem(`card_${cardId}`, JSON.stringify(cardData));
        
        window.location.href = `card.html?id=${cardId}`;
    });
});

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}