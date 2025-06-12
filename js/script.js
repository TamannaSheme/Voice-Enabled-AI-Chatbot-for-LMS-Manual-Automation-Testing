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

function redirectToRolePage() {
  const studentIdInput = document.getElementById("studentId");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const emailInput = document.getElementById("email");

  const studentId = studentIdInput.value.trim();
  const phoneNumber = phoneNumberInput.value.trim();
  const email = emailInput.value.trim();

  // Validate Student ID (Must be a number)
  if (studentId === "" || isNaN(studentId)) {
    alert("Please enter a valid Student ID (numbers only).");
    return;
  }

  // Validate Phone Number (Must be a valid phone number)
  const phonePattern = /^[0-9\-\(\)\+\s]*$/; // Allows numbers, spaces, +, -, ()
  if (phoneNumber === "" || !phonePattern.test(phoneNumber)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Validate Email (Must be in a valid email format)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email === "" || !emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // If all validations pass, confirm submission and clear fields
  const message = "Information submitted successfully.";
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(message);
  utter.lang = "en-US";
  synth.speak(utter);

  // Clear fields after submission
  studentIdInput.value = "";
  phoneNumberInput.value = "";
  emailInput.value = "";
}
if (typeof module !== "undefined") {
  module.exports = { redirectToRolePage };
}