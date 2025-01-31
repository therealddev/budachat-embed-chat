////////////////////////////////////////////////////

// PRODUCTION
// const API_URL = 'https://www.budachat.com/api';

// DEVELOPMENT
const API_URL = 'http://localhost:3000/api';

////////////////////////////////////////////////////

let chatSessionId;

async function createChatWidget(chatbotId) {
  // Create elements but don't append them to the document yet
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
    <div id="chat-header" style="background-color: transparent; color: #333; padding: 10px; text-align: center; font-weight: bold; position: relative; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
        <img src="" alt="" style="width: 30px; height: 30px; margin-right: 10px;">
        <span></span>
      </div>
      <button id="close-chat" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #333; font-size: 20px; cursor: pointer; display: none;">✕</button>
    </div>
    <div id="chat-messages" style="flex: 1; padding: 10px; overflow-y: auto;"></div>
    <div style="padding: 10px;">
      <div style="display: flex; align-items: center; background-color: #f0f0f0; border-radius: 9999px; padding: 5px;">
        <input id="chat-input" type="text" placeholder="Type a message..." style="flex: 1; padding: 10px; border: none; background: transparent; outline: none;">
        <button id="chat-send" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" style="width: 20px; height: 20px; margin-left: -2px; margin-top: 1px;">
            <path fill="#D1D5DB" fill-rule="evenodd" d="M13.854.146a.5.5 0 0 1 .113.534l-5 13a.5.5 0 0 1-.922.027l-2.091-4.6L9.03 6.03a.75.75 0 0 0-1.06-1.06L4.893 8.046l-4.6-2.09a.5.5 0 0 1 .028-.923l13-5a.5.5 0 0 1 .533.113" clip-rule="evenodd"/>
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

  // Add Poppins font
  const fontLink = document.createElement('link');
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // Update responsive styles to include Poppins font
  const style = document.createElement('style');
  style.textContent = `
    #chat-container, #chat-input {
      font-family: 'Poppins', sans-serif;
    }
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

  // Fetch chatbot details from the API
  try {
    const chatbotResponse = await fetch(`${API_URL}/chatbot/${chatbotId}`);
    const chatbotData = await chatbotResponse.json();
    const { name, logo_url, color } = chatbotData;

    // Use the provided color or default to #2A52BE if not set
    const chatbotColor = color || '#2A52BE';

    // Update chat header with chatbot name, logo, and color
    const chatHeader = chatContainer.querySelector('#chat-header');
    chatHeader.innerHTML = `
      <div style="display: flex; align-items: center;">
        ${
          logo_url
            ? `<img src="${logo_url}" alt="${name} logo" style="width: 30px; height: 30px; margin-right: 10px;">`
            : ''
        }
        <span>${name}</span>
      </div>
      <button id="close-chat" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #333; font-size: 20px; cursor: pointer; display: none;">✕</button>
    `;

    // Apply color scheme based on chatbot color
    const style = document.createElement('style');
    style.textContent = `
      #chat-header {
        background-color: transparent !important;
        color: #333 !important;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      #toggle-button {
        background-color: ${chatbotColor} !important;
      }
      #chat-send {
        background-color: white !important;
        transition: background-color 0.3s ease;
      }
      #chat-send svg path {
        fill: #D1D5DB !important; /* Light gray */
        transition: fill 0.3s ease;
      }
      #chat-send.active svg path {
        fill: #4B5563 !important; /* Dark gray */
      }
      .user-message {
        background-color: ${chatbotColor} !important;
        color: white !important;
      }
    `;
    document.head.appendChild(style);

    // Set toggle button color
    toggleButton.style.backgroundColor = chatbotColor;

    // Now that we have the chatbot data, append elements to the document
    widget.appendChild(chatContainer);
    widget.appendChild(toggleButton);
    document.body.appendChild(widget);

    // Add event listeners and other functionality
    const closeButton = chatContainer.querySelector('#close-chat');
    const toggleChat = async () => {
      const isChatVisible = chatContainer.style.display !== 'none';
      chatContainer.style.display = isChatVisible ? 'none' : 'flex';
      toggleButton.innerHTML = isChatVisible ? chatIcon : closeIcon;
      if (window.innerWidth <= 768) {
        toggleButton.style.display = isChatVisible ? 'block' : 'none';
        document.body.style.overflow = isChatVisible ? 'auto' : 'hidden';
      }
      if (!isChatVisible && !chatSessionId) {
        await createSession();
      }
    };

    toggleButton.onclick = toggleChat;
    closeButton.onclick = toggleChat;

    // Set up chat input and send functionality
    const input = chatContainer.querySelector('#chat-input');
    const send = chatContainer.querySelector('#chat-send');
    const messages = chatContainer.querySelector('#chat-messages');

    const updateSendButtonState = () => {
      if (input.value.trim() && !isGeneratingResponse) {
        send.classList.add('active');
        send.disabled = false;
      } else {
        send.classList.remove('active');
        send.disabled = isGeneratingResponse;
      }
    };

    input.addEventListener('input', updateSendButtonState);

    // Initial state
    updateSendButtonState();

    let isGeneratingResponse = false;

    const sendMessage = async () => {
      if (input.value.trim() && !isGeneratingResponse && chatSessionId) {
        isGeneratingResponse = true;
        send.disabled = true;

        const userMessage = input.value;
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<div class="user-message">${userMessage}</div>`;
        messageElement.style.display = 'flex';
        messageElement.style.justifyContent = 'flex-end';
        messageElement.style.margin = '10px 0';
        messageElement.firstChild.style.maxWidth = '70%';
        messageElement.firstChild.style.padding = '8px 12px';
        messageElement.firstChild.style.borderRadius = '18px 18px 0 18px';
        messages.appendChild(messageElement);
        input.value = '';
        updateSendButtonState();
        messages.scrollTop = messages.scrollHeight;

        // Add a delay before showing the typing indicator
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Add AI typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.innerHTML = `
          <div class="typing-indicator" style="
            display: inline-flex;
            align-items: center;
            background-color: #f1f0f0;
            border-radius: 18px 18px 18px 0;
            padding: 8px 12px;
            margin: 10px 0;
            min-height: 40px;
            box-sizing: border-box;
          ">
            <span style="width: 6px; height: 6px; background-color: #999; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite;"></span>
            <span style="width: 6px; height: 6px; background-color: #999; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite 0.3s;"></span>
            <span style="width: 6px; height: 6px; background-color: #999; border-radius: 50%; animation: typing 1s infinite 0.6s;"></span>
          </div>
        `;
        typingIndicator.style.display = 'flex';
        typingIndicator.style.justifyContent = 'flex-start';
        messages.appendChild(typingIndicator);
        messages.scrollTop = messages.scrollHeight;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
          @keyframes typing {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `;
        document.head.appendChild(style);

        // Generate AI response
        try {
          const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatbotId,
              messages: [{ role: 'user', content: userMessage }],
              chatSessionId,
            }),
          });

          const data = await response.json();

          // Remove typing indicator
          messages.removeChild(typingIndicator);

          // Display AI response
          const botMessage = document.createElement('div');
          botMessage.innerHTML = `<div>${data.reply}</div>`;
          botMessage.style.display = 'flex';
          botMessage.style.justifyContent = 'flex-start';
          botMessage.style.margin = '10px 0';
          botMessage.firstChild.style.maxWidth = '70%';
          botMessage.firstChild.style.padding = '8px 12px';
          botMessage.firstChild.style.backgroundColor = '#f1f0f0';
          botMessage.firstChild.style.borderRadius = '18px 18px 18px 0';
          messages.appendChild(botMessage);
          messages.scrollTop = messages.scrollHeight;

          // Save both user and AI messages to the database
          await fetch(`${API_URL}/save-messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatSessionId,
              userMessage,
              aiMessage: data.reply,
            }),
          });
        } catch (error) {
          console.error('Error:', error);
          // Remove typing indicator in case of error
          messages.removeChild(typingIndicator);
        } finally {
          isGeneratingResponse = false;
          send.disabled = false;
          updateSendButtonState();
        }
      }
    };

    send.onclick = () => {
      if (!isGeneratingResponse) {
        sendMessage();
      }
    };

    // Add event listener for Enter key press
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        if (!isGeneratingResponse) {
          sendMessage();
        }
      }
    });

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

    // Create a new chat session when the widget is opened
    const createSession = async () => {
      try {
        const response = await fetch(`${API_URL}/create-chat-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatbotId }),
        });
        const data = await response.json();
        chatSessionId = data.chatSessionId;
      } catch (error) {
        console.error('Error creating chat session:', error);
      }
    };
  } catch (error) {
    console.error('Error fetching chatbot details:', error);
  }
}

if (module.hot) {
  module.hot.accept();
}

window.initChatWidget = createChatWidget;
