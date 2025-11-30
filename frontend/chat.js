const characters = [
    { id: 'hyun', name: '현정욱', avatar: '/static/assets/images/Hyun.jpg' },
    { id: 'lee', name: '이윤서', avatar: '/static/assets/images/Lee.jpg' },
    { id: 'seok', name: '석성택', avatar: '/static/assets/images/Seok.jpg' },
    { id: 'ryu', name: '류한석', avatar: '/static/assets/images/Ryu.jpg' }
];

let currentCharacter = null;
const token = localStorage.getItem('token');

// DOM Elements
const charList = document.getElementById('character-list');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const charNameHeader = document.getElementById('current-char-name');
const charImgHeader = document.getElementById('current-char-img');
const backBtn = document.getElementById('back-to-game-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!token) {
        alert('Please login first.');
        window.location.href = '/';
        return;
    }
    renderCharacterList();
    setupEventListeners();
});

function renderCharacterList() {
    charList.innerHTML = characters.map(char => `
        <div class="character-item ${currentCharacter === char.id ? 'active' : ''}" onclick="selectCharacter('${char.id}')">
            <img src="${char.avatar}" alt="${char.name}" class="char-avatar">
            <div class="char-info">
                <span class="char-name">${char.name}</span>
                <span class="char-status">Online</span>
            </div>
        </div>
    `).join('');
}

function selectCharacter(charId) {
    currentCharacter = charId;
    const char = characters.find(c => c.id === charId);
    
    // Update Header
    charNameHeader.textContent = char.name;
    charImgHeader.src = char.avatar;
    charImgHeader.classList.remove('hidden');
    
    // Enable Input
    messageInput.disabled = false;
    sendBtn.disabled = false;
    messageInput.focus();

    // Update Sidebar UI
    renderCharacterList();

    // Load History (Mock for now, or clear)
    chatMessages.innerHTML = `
        <div class="message system">
            <p>Connected to ${char.name}. Start chatting!</p>
        </div>
    `;
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentCharacter) return;

    // Add User Message
    appendMessage('user', text);
    messageInput.value = '';
    messageInput.value = '';
    // messageInput.style.height = 'auto'; // Removed dynamic resizing

    // Show Loading
    const loadingId = appendLoading();

    try {
        const response = await fetch(`/character/${currentCharacter}/chat/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        removeMessage(loadingId);

        if (response.ok) {
            appendMessage('assistant', data.reply);
        } else {
            appendMessage('system', 'Error: ' + (data.error || 'Failed to send message'));
        }
    } catch (error) {
        removeMessage(loadingId);
        appendMessage('system', 'Network Error');
    }
}

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div.id = 'msg-' + Date.now();
}

function appendLoading() {
    const div = document.createElement('div');
    div.className = 'message assistant loading';
    div.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div.id = 'loading-' + Date.now();
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea removed as per user request
    // messageInput.addEventListener('input', function() {
    //     this.style.height = 'auto';
    //     this.style.height = (this.scrollHeight) + 'px';
    // });

    backBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
}
