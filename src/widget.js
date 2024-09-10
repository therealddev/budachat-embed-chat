function createChatWidget(businessId) {
  const widget = document.createElement('div');
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px';
  widget.style.display = 'flex';
  widget.style.flexDirection = 'column';
  widget.style.alignItems = 'flex-end';

  const chatContainer = document.createElement('div');
  chatContainer.style.width = '300px';
  chatContainer.style.height = '400px';
  chatContainer.style.border = '1px solid #ccc';
  chatContainer.style.borderRadius = '10px';
  chatContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  chatContainer.style.backgroundColor = '#fff';
  chatContainer.style.display = 'none';
  chatContainer.style.flexDirection = 'column';
  chatContainer.style.overflow = 'hidden';
  chatContainer.style.marginBottom = '10px';

  chatContainer.innerHTML = `
      <div id="chat-header" style="background-color: #007bff; color: white; padding: 10px; text-align: center; font-weight: bold;">Chat</div>
      <div id="chat-messages" style="flex: 1; padding: 10px; overflow-y: auto; border-top: 1px solid #ccc;"></div>
      <div style="display: flex; border-top: 1px solid #ccc;">
        <input id="chat-input" type="text" style="flex: 1; padding: 10px; border: none; border-top-left-radius: 0; border-top-right-radius: 0;">
        <button id="chat-send" style="padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer;">Send</button>
      </div>
    `;
  const toggleButton = document.createElement('button');
  toggleButton.style.width = '60px';
  toggleButton.style.height = '60px';
  toggleButton.style.borderRadius = '50%';
  toggleButton.style.backgroundColor = '#007bff';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.fontSize = '24px';
  toggleButton.innerHTML = '&#128172;'; // Speech bubble emoji

  widget.appendChild(chatContainer);
  widget.appendChild(toggleButton);
  document.body.appendChild(widget);

  // Toggle chat visibility
  toggleButton.onclick = () => {
    chatContainer.style.display =
      chatContainer.style.display === 'none' ? 'flex' : 'none';
  };

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
