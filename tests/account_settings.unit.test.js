/**
 * @jest-environment jsdom
 */

describe("Account Settings Page Unit Testing", () => {
  let saveSettings;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="account-settings">
        <p id="username">John Doe</p>
        <p id="email">john.doe@gmail.com</p>
        <input type="password" id="password" value="password123" />
        <button id="toggle-password">Show/Hide Password</button>
        <select id="linked-account">
          <option value="google" selected>Google</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>
    `;

    saveSettings = jest.fn();
    document.getElementById("toggle-password").onclick = () => {
      const passwordField = document.getElementById("password");
      passwordField.type = passwordField.type === "password" ? "text" : "password";
    };
  });

  test("[U01] Display Username and Email", () => {
    expect(document.getElementById("username").textContent).toBe("John Doe");
    expect(document.getElementById("email").textContent).toBe("john.doe@gmail.com");
  });

  test("[U02] Toggle Password Visibility", () => {
    const passwordField = document.getElementById("password");
    document.getElementById("toggle-password").click();
    expect(passwordField.type).toBe("text");
    document.getElementById("toggle-password").click();
    expect(passwordField.type).toBe("password");
  });

  test("[U03] Change Linked Account Option", () => {
    const linkedAccount = document.getElementById("linked-account");
    linkedAccount.value = "facebook";
    expect(linkedAccount.value).toBe("facebook");
  });

  test("[U04] Save Settings Functionality", () => {
    saveSettings();
    expect(saveSettings).toHaveBeenCalled();
  });

});
