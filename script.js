document.addEventListener('DOMContentLoaded', () => {
    // Sidebar menu elements
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('popoverMenu');

    // Chat elements
    const chatMenuItem = document.getElementById('chatMenuItem');
    const chatBtnFeature = document.getElementById('chatBtnFeature');
    const chatContainer = document.getElementById('chatContainer');

    // Products page elements
    const productsMenuItem = document.getElementById('productsMenuItem');
    const productsBtnFeature = document.getElementById('productsBtnFeature');
    const productsPage = document.getElementById('productsPage');
    const backHomeBtn = document.getElementById('backHomeBtn');
    const homeSections = document.querySelectorAll('section'); // All home page sections

    // Toggle sidebar
    menuBtn.addEventListener('click', () => sidebar.classList.add('show'));
    closeBtn.addEventListener('click', () => sidebar.classList.remove('show'));

    // Chat pop-up toggle
    chatMenuItem.addEventListener('click', () => {
        chatContainer.classList.toggle('hidden');
        sidebar.classList.remove('show');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    chatBtnFeature.addEventListener('click', () => {
        chatContainer.classList.remove('hidden');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Show Products page
    function showProductsPage() {
        homeSections.forEach(section => section.classList.add('hidden'));
        productsPage.classList.remove('hidden');
        sidebar.classList.remove('show');
        initializeMap();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    productsMenuItem.addEventListener('click', showProductsPage);
    productsBtnFeature.addEventListener('click', showProductsPage);

    // Back to home
    backHomeBtn.addEventListener('click', () => {
        productsPage.classList.add('hidden');
        homeSections.forEach(section => section.classList.remove('hidden'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Chat functionality
    let chatState = 'ready';
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const loadingRow = document.getElementById('loadingRow');
    const errorMessage = document.getElementById('errorMessage');

    sendButton.addEventListener('click', handleSendClick);
    messageInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSendClick(); });

    function handleSendClick() {
        if (chatState === 'ready') startLoading();
        else if (chatState === 'loading') cancelLoading();
    }

    function startLoading() {
        chatState = 'loading';
        loadingRow.classList.add('active');
        sendButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        sendButton.classList.add('close-button');
        messageInput.disabled = true;

        setTimeout(() => {
            const shouldFail = Math.random() > 0.3;
            if (shouldFail) showDisconnected();
            else showSuccess();
        }, 2000);
    }

    function cancelLoading() {
        chatState = 'ready';
        loadingRow.classList.remove('active');
        sendButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        sendButton.classList.remove('close-button');
        messageInput.disabled = false;
        errorMessage.classList.remove('active');
    }

    function showDisconnected() {
        chatState = 'disconnected';
        loadingRow.classList.remove('active');
        errorMessage.classList.add('active');
        sendButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        sendButton.classList.remove('close-button');
        messageInput.disabled = false;

        setTimeout(() => {
            errorMessage.classList.remove('active');
            chatState = 'ready';
        }, 3000);
    }

    function showSuccess() {
        chatState = 'ready';
        loadingRow.classList.remove('active');
        addBotMessage("That's a great question! We partner with local organic farms that meet our sustainability standards...");
        sendButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        sendButton.classList.remove('close-button');
        messageInput.disabled = false;
        messageInput.value = '';
    }

    function addBotMessage(text) {
        const chatBox = document.querySelector('.chat-box');
        const messageRow = document.createElement('div');
        messageRow.className = 'message-row';
        const botLabel = document.createElement('div');
        botLabel.className = 'bot-label';
        botLabel.textContent = 'FRAM';
        const message = document.createElement('div');
        message.className = 'message bot-message';
        message.textContent = text;
        messageRow.appendChild(botLabel);
        messageRow.appendChild(message);
        chatBox.insertBefore(messageRow, loadingRow);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Google Map initialization
    function initializeMap() {
        if (window.mapInitialized) return; // Initialize only once
        window.mapInitialized = true;

        const locations = [
            { lat: 59.3293, lng: 18.0686 }, // Example coordinates
            { lat: 57.7089, lng: 11.9746 }
        ];

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: locations[0],
        });

        locations.forEach(loc => {
            new google.maps.Marker({ position: loc, map: map });
        });
    }
});
