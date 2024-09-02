function createChatWidget(businessId) {
  const widget = document.createElement('div');
  widget.style.position = 'fixed';
  widget.style.bottom = '0';
  widget.style.right = '0';
  widget.style.width = '300px';
  widget.style.height = '400px';
  widget.style.border = '1px solid #ccc';
  widget.style.borderRadius = '10px 10px 0 0';
  widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  widget.style.backgroundColor = '#fff';
  widget.style.display = 'flex';
  widget.style.flexDirection = 'column';
  widget.style.overflow = 'hidden';

  widget.innerHTML = `
      <div id="chat-header" style="background-color: #007bff; color: white; padding: 10px; text-align: center; font-weight: bold;">Chat</div>
      <div id="chat-messages" style="flex: 1; padding: 10px; overflow-y: auto; border-top: 1px solid #ccc;"></div>
      <div style="display: flex; border-top: 1px solid #ccc;">
        <input id="chat-input" type="text" style="flex: 1; padding: 10px; border: none; border-top-left-radius: 0; border-top-right-radius: 0;">
        <button id="chat-send" style="padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer;">Send</button>
      </div>
    `;
  document.body.appendChild(widget);

  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

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
        const response = await fetch('http://localhost:3000/api/chat', {
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
