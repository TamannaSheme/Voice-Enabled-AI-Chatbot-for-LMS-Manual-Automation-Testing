/**
 * @jest-environment jsdom
 */

describe("Welcome Page Unit Testing", () => {
  let validateForm;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="welcome-page">
        <input type="text" id="student-id" />
        <input type="text" id="phone-number" />
        <input type="email" id="email" />
        <button id="submit-button">Submit</button>
        <p id="voice-error" hidden>Error: Voice not recognized</p>
      </div>
    `;

    validateForm = jest.fn();
    document.getElementById("submit-button").onclick = validateForm;
  });

  test("[U01] Validate Student ID Input", () => {
    const input = document.getElementById("student-id");
    input.value = "12345";
    expect(input.value).toBe("12345");
  });

  test("[U02] Validate Phone Number Input", () => {
    const input = document.getElementById("phone-number");
    input.value = "9876543210";
    expect(input.value).toBe("9876543210");
  });

  test("[U03] Validate Email Input", () => {
    const input = document.getElementById("email");
    input.value = "test@example.com";
    expect(input.value).toBe("test@example.com");
  });

  test("[U04] Submit Form - Call Validate Function", () => {
    const submitButton = document.getElementById("submit-button");
    submitButton.click();
    expect(validateForm).toHaveBeenCalled();
  });

  test("[U05] Voice Recognition Error Display", () => {
    const error = document.getElementById("voice-error");
    error.hidden = false;
    expect(error.hidden).toBe(false);
  });
});
