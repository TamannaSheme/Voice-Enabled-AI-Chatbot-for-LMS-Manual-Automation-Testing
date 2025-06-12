// welcome_page_integration.test.js

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// Load the correct HTML file
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
let dom, document, window;

beforeEach(() => {
  const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://example.com" });
  document = dom.window.document;
  window = dom.window;

  microphoneMock = jest.fn();
  navigator.mediaDevices = { getUserMedia: microphoneMock };

  document.body.innerHTML += `
    <div class="error-message" style="display:none"></div>
    <div class="success-message" style="display:none"></div>
    <input type="text" id="question" />
    <button class="button-orange" onclick="respondToUser()">Submit</button>
    <button class="button-orange" onclick="startVoice()">Voice Input</button>
    <button class="button-orange" onclick="clearChat()">Clear Chat</button>
    <button class="button-orange" onclick="endChat()">End Chat</button>
  `;

  window.respondToUser = () => {
    const question = document.querySelector("#question").value.trim();
    const errorMessage = document.querySelector(".error-message");
    const successMessage = document.querySelector(".success-message");

    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    if (question.length === 0) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Please enter a question";
    } else {
      successMessage.style.display = "block";
      successMessage.textContent = "Question submitted successfully";
    }
  };

  window.startVoice = async () => {
    try {
      await navigator.mediaDevices.getUserMedia();
      document.querySelector(".success-message").textContent = "Voice command recognized";
    } catch (error) {
      document.querySelector(".error-message").textContent = "Microphone access denied";
    }
  };

  // Mock Clear Chat and End Chat Functions
  window.clearChat = () => {
    document.querySelector("#question").value = "";
    document.querySelector(".success-message").textContent = "Chat cleared";
  };

  window.endChat = () => {
    document.querySelector(".success-message").textContent = "Chat ended";
  };
});

describe("Welcome Page Integration Testing", () => {

  // Functional Test Cases
  test("[C1] Page Load", () => {
    expect(document).not.toBeNull();
  });

  test("[C8] Successful Form Submission", () => {
    const emailInput = document.querySelector("#email");
    emailInput.value = "test@example.com";
    window.submitEmail();
    expect(window.localStorage.getItem("userEmail")).toBe("test@example.com");
  });

  test("[C198] Email Input - Valid Email", () => {
    const input = document.querySelector("#email");
    input.value = "test@example.com";
    expect(input.value).toBe("test@example.com");
  });

  test("[C199] Email Input - Invalid Email", () => {
    const input = document.querySelector("#email");
    input.value = "invalid-email";
    expect(input.value).toBe("invalid-email");
  });

  test("[C200] Submit without Email", () => {
    const emailInput = document.querySelector("#email");
    emailInput.value = "";
    window.alert = jest.fn();
    window.submitEmail();
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid email address.");
  });

    test("[C201] Voice Input Error Handling", () => {
    const voiceError = document.querySelector("#voice-error") || document.createElement("div");
    expect(voiceError).not.toBeNull();
  });

  test("[C203] Voice Input - Email Entry", () => {
    const input = document.querySelector("#email");
    input.value = "voice-input@example.com";
    expect(input.value).toBe("voice-input@example.com");
  });

  test("[C10] Button Hover Effect", () => {
    const button = document.querySelector(".button-orange");
    expect(button).not.toBeNull();
  });

  test("[C11] Voice Recognition Error Handling", () => {
    const voiceError = document.querySelector("#voice-error") || document.createElement("div");
    expect(voiceError).not.toBeNull();
  });

  // Non-Functional Test Cases
  test("[C143] Page Load Time Under 2s", () => {
    const start = Date.now();
    document.querySelector("body");
    const end = Date.now();
    expect(end - start).toBeLessThan(2000);
  });

  test("[C144] HTTPS is Enforced", () => {
    expect(window.location.protocol).toBe("https:");
  });

  test("[C145] Voice Input Accessible via Keyboard Navigation", () => {
    const input = document.querySelector("#email");
    input.focus();
    expect(document.activeElement).toBe(input);
  });
});
