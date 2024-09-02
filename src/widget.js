function createChatWidget() {
    const widget = document.createElement('div');
    widget.innerHTML = `
      <div id="chat-header">Chat</div>
      <div id="chat-messages"></div>
      <input id="chat-input" type="text">
      <button id="chat-send">Send</button>
    `;
    document.body.appendChild(widget);
  
    const input = document.getElementById('chat-input');
    const send = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');
  
    send.onclick = () => {
      if (input.value) {
        const message = document.createElement('div');
        message.textContent = input.value;
        messages.appendChild(message);
        input.value = '';
      }
    };
  }
  
  if (module.hot) {
    module.hot.accept();
  }
  
  window.initChatWidget = createChatWidget;