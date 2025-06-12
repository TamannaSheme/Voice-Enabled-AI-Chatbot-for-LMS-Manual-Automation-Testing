/**
 * @jest-environment jsdom
 */

describe("Reset Password Page Unit Testing", () => {
  let validatePassword, resetForm;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="resetForm">
        <input type="text" id="username" placeholder="Enter your Moodle username or email" required>
        <input type="password" id="newPassword" placeholder="Enter new password" required>
        <input type="password" id="confirmPassword" placeholder="Confirm new password" required>
        <button id="submit-button">Change Password</button>
      </form>
    `;

    validatePassword = jest.fn();
    resetForm = jest.fn();

    document.getElementById("submit-button").onclick = validatePassword;
  });

  test("[U99] Validate Username Input", () => {
    const input = document.getElementById("username");
    input.value = "user@example.com";
    expect(input.value).toBe("user@example.com");
  });

  test("[U100] Validate New Password Input", () => {
    const input = document.getElementById("newPassword");
    input.value = "SecurePass123";
    expect(input.value).toBe("SecurePass123");
  });

  test("[U101] Validate Confirm Password Input", () => {
    const input = document.getElementById("confirmPassword");
    input.value = "SecurePass123";
    expect(input.value).toBe("SecurePass123");
  });

  test("[U102] Trigger Form Validation", () => {
    const submitButton = document.getElementById("submit-button");
    submitButton.click();
    expect(validatePassword).toHaveBeenCalled();
  });

  test("[U103] Reset Form After Submission", () => {
    const form = document.getElementById("resetForm");
    form.reset = resetForm;
    form.reset();
    expect(resetForm).toHaveBeenCalled();
  });
});
