function startVoice(fieldId) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById(fieldId).value = transcript;
  };

  recognition.onerror = function (event) {
    alert("Voice input error: " + event.error);
  };
}

function speakMessage(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-US";
  synth.speak(utterance);
}

async function respondToUser() {
  const questionBox = document.getElementById("question");
  const chatMessages = document.getElementById("chat-messages");
  const question = questionBox.value.trim();

  if (question !== "") {
    // Add user message with ME badge
    const userMessage = document.createElement('div');
    userMessage.className = "chat-row user";
    userMessage.innerHTML = `
      <div class="message-bubble user-bubble">${question}</div>
      <div class="avatar user-avatar">ME</div>
    `;
    chatMessages.appendChild(userMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    questionBox.value = ""; // clear input

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      });

      const data = await res.json();
      const botReply = data.reply || "Sorry, no response received";

      // Add bot message with avatar icon
      const botMessage = document.createElement('div');
      botMessage.className = "chat-row bot";
      botMessage.innerHTML = `
        <div class="avatar bot-avatar">
          <img src="images/lumi-icon.png" alt="Bot" />
        </div>
        <div class="message-bubble bot-bubble">${botReply}</div>
      `;
      chatMessages.appendChild(botMessage);

      chatMessages.scrollTop = chatMessages.scrollHeight;
      speakMessage(botReply);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Please enter a question before submitting.");
  }
}



