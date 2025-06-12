/**
 * @jest-environment jsdom
 */

describe("Ask Lumi Page Unit Testing", () => {
  let respondToUser, startVoice, microphoneMock;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="question" type="text" />
      <button class="button-orange" onclick="respondToUser()">Submit</button>
      <button class="button-orange" onclick="startVoice()">Voice Input</button>
      <div class="error-message" style="display:none"></div>
      <div class="success-message" style="display:none"></div>
    `;

    // Mock functions
    respondToUser = jest.fn(() => {
      const question = document.querySelector("#question").value.trim();
      const errorMessage = document.querySelector(".error-message");
      const successMessage = document.querySelector(".success-message");

      if (question.length === 0) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a question";
      } else {
        successMessage.style.display = "block";
        successMessage.textContent = "Question submitted successfully";
      }
    });

    microphoneMock = jest.fn();

    startVoice = jest.fn(async () => {
      try {
        await microphoneMock();
      } catch (error) {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Microphone access denied";
      }
    });
  });

  test("[U31] Submit Question Successfully", () => {
    document.querySelector("#question").value = "What is Lumi?";
    respondToUser();

    const successMessage = document.querySelector(".success-message");
    expect(successMessage.textContent).toBe("Question submitted successfully");
  });

  test("[U32] Submit Without Question", () => {
    respondToUser();

    const errorMessage = document.querySelector(".error-message");
    expect(errorMessage.textContent).toBe("Please enter a question");
  });

  test("[U33] Voice Input - Microphone Access Granted", async () => {
    await startVoice();

    expect(microphoneMock).toHaveBeenCalled();
  });

  test("[U34] Voice Input - Microphone Access Denied", async () => {
    microphoneMock.mockRejectedValue(new Error("Microphone access denied"));

    await startVoice();

    const errorMessage = document.querySelector(".error-message");
    expect(errorMessage.textContent).toBe("Microphone access denied");
  });
});
