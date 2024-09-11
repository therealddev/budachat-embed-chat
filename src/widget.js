function createChatWidget(businessId) {
  const widget = document.createElement('div');
  widget.id = 'chat-widget';
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px';
  widget.style.display = 'flex';
  widget.style.flexDirection = 'column';
  widget.style.alignItems = 'flex-end';
  widget.style.zIndex = '1000';

  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-container';
  chatContainer.style.width = '400px';
  chatContainer.style.maxHeight = '80vh'; // Set max-height to 80% of viewport height
  chatContainer.style.height = '600px';
  chatContainer.style.border = '1px solid #ccc';
  chatContainer.style.borderRadius = '10px';
  chatContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  chatContainer.style.backgroundColor = '#fff';
  chatContainer.style.display = 'none';
  chatContainer.style.flexDirection = 'column';
  chatContainer.style.overflow = 'hidden';
  chatContainer.style.marginBottom = '10px';

  chatContainer.innerHTML = `
    <div id="chat-header" style="background-color: #007bff; color: white; padding: 10px; text-align: center; font-weight: bold; position: relative;">
      Chat
      <button id="close-chat" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: white; font-size: 20px; cursor: pointer; display: none;">✕</button>
    </div>
    <div id="chat-messages" style="flex: 1; padding: 10px; overflow-y: auto;"></div>
    <div style="padding: 10px;">
      <div style="display: flex; align-items: center; background-color: #f0f0f0; border-radius: 9999px; padding: 5px;">
        <input id="chat-input" type="text" placeholder="Type a message..." style="flex: 1; padding: 10px; border: none; background: transparent; outline: none;">
        <button id="chat-send" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-right: 5px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" style="width: 20px; height: 20px;">
            <path fill="black" fill-rule="evenodd" d="M13.854.146a.5.5 0 0 1 .113.534l-5 13a.5.5 0 0 1-.922.027l-2.091-4.6L9.03 6.03a.75.75 0 0 0-1.06-1.06L4.893 8.046l-4.6-2.09a.5.5 0 0 1 .028-.923l13-5a.5.5 0 0 1 .533.113" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-button';
  toggleButton.style.width = '60px';
  toggleButton.style.height = '60px';
  toggleButton.style.borderRadius = '50%';
  toggleButton.style.backgroundColor = '#007bff';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.display = 'flex';
  toggleButton.style.alignItems = 'center';
  toggleButton.style.justifyContent = 'center';

  const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20.605 4.17a4.67 4.67 0 0 0-3.33-1.38H6.705a4.71 4.71 0 0 0-4.71 4.72v6.6a4.71 4.71 0 0 0 4.71 4.72h2.33l1.95 1.94c.127.143.284.255.46.33c.175.072.361.11.55.11q.286-.004.55-.11a1.6 1.6 0 0 0 .44-.31l2-2h2.33a4.7 4.7 0 0 0 3.33-1.38a4.8 4.8 0 0 0 1-1.53c.234-.575.357-1.19.36-1.81v-6.6a4.67 4.67 0 0 0-1.4-3.3m-13.24 8.17a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66m4.63 0a1.66 1.66 0 1 1 0-3.32a1.66 1.66 0 0 1 0 3.32m4.62 0a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66"/></svg>`;

  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"/></svg>`;

  toggleButton.innerHTML = chatIcon;

  widget.appendChild(chatContainer);
  widget.appendChild(toggleButton);
  document.body.appendChild(widget);

  // Add responsive styles
  const style = document.createElement('style');
  style.textContent = `
    #chat-container {
      max-height: 80vh;
      height: 600px;
    }
    @media (max-width: 768px) {
      #chat-widget {
        bottom: 0 !important;
        right: 0 !important;
        width: 100% !important;
      }
      #chat-container {
        width: 100% !important;
        height: 100vh !important;
        max-height: none !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        margin: 0 !important;
        border-radius: 0 !important;
        border: none !important;
        z-index: 9999 !important;
      }
      #chat-messages {
        height: calc(100vh - 120px) !important;
      }
      #close-chat {
        display: block !important;
      }
      #toggle-button {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
      }
    }
  `;
  document.head.appendChild(style);

  const closeButton = document.getElementById('close-chat');
  const toggleChat = () => {
    const isChatVisible = chatContainer.style.display !== 'none';
    chatContainer.style.display = isChatVisible ? 'none' : 'flex';
    toggleButton.innerHTML = isChatVisible ? chatIcon : closeIcon;
    if (window.innerWidth <= 768) {
      toggleButton.style.display = isChatVisible ? 'block' : 'none';
      document.body.style.overflow = isChatVisible ? 'auto' : 'hidden';
    }
  };

  toggleButton.onclick = toggleChat;
  closeButton.onclick = toggleChat;

  // Handle resize events
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      // Reset styles for desktop view
      chatContainer.style.removeProperty('position');
      chatContainer.style.removeProperty('top');
      chatContainer.style.removeProperty('left');
      chatContainer.style.removeProperty('right');
      chatContainer.style.removeProperty('bottom');
      chatContainer.style.width = '400px';
      chatContainer.style.height = '600px';
      chatContainer.style.maxHeight = '80vh';
      chatContainer.style.margin = '0 0 10px 0';
      chatContainer.style.borderRadius = '10px';
      toggleButton.style.display = 'flex';
      document.body.style.overflow = 'auto';
      toggleButton.innerHTML =
        chatContainer.style.display !== 'none' ? closeIcon : chatIcon;
    } else {
      // Apply mobile styles
      if (chatContainer.style.display !== 'none') {
        toggleButton.style.display = 'none';
        document.body.style.overflow = 'hidden';
      } else {
        toggleButton.style.display = 'flex';
        toggleButton.innerHTML = chatIcon;
      }
    }
  });

  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://www.budachat.com/api/chat'
      : 'http://localhost:3000/api/chat';

  send.onclick = async () => {
    if (input.value) {
      const userMessage = input.value;
      const messageElement = document.createElement('div');
      messageElement.textContent = userMessage;
      messageElement.style.padding = '5px';
      messageElement.style.margin = '5px 0';
      messageElement.style.backgroundColor = '#f1f1f1';
      messageElement.style.borderRadius = '5px';
      messages.appendChild(messageElement);
      input.value = '';
      messages.scrollTop = messages.scrollHeight; // Scroll to the bottom

      // Send message to the API
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            businessId: businessId,
            messages: [{ role: 'user', content: userMessage }],
          }),
        });

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.textContent = data.reply;
        botMessage.style.padding = '5px';
        botMessage.style.margin = '5px 0';
        botMessage.style.backgroundColor = '#e1f5fe';
        botMessage.style.borderRadius = '5px';
        messages.appendChild(botMessage);
        messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
}

if (module.hot) {
  module.hot.accept();
}

window.initChatWidget = createChatWidget;
