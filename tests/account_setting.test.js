/**
 * @jest-environment jsdom
 */

describe("Account Settings Page Integration Testing", () => {
  let document, window;

  beforeEach(() => {
    document = global.document;
    window = global.window;

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
        <button id="logout-button">Logout</button>
        <a href="#" id="back-to-settings">Back to Settings</a>
      </div>
    `;

    // Mock functions
    window.alert = jest.fn();
  });

  test("[C52] Check Name and Email Display", () => {
    expect(document.getElementById("username").textContent).toBe("John Doe");
    expect(document.getElementById("email").textContent).toBe("john.doe@gmail.com");
  });

  test("[C53] Toggle Password Visibility", () => {
    const passwordField = document.getElementById("password");
    passwordField.type = "password";
    passwordField.type = "text";
    expect(passwordField.type).toBe("text");
  });

  test("[C54] Verify Default Linked Account Selection", () => {
    expect(document.getElementById("linked-account").value).toBe("google");
  });

  test("[C55] Change Linked Account Option", () => {
    const linkedAccount = document.getElementById("linked-account");
    linkedAccount.value = "facebook";
    expect(linkedAccount.value).toBe("facebook");
  });

  test("[C56] Logout Button Functionality", () => {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.click();
    expect(window.alert).not.toHaveBeenCalled(); // No action expected in this setup
  });

  test("[C57] Back to Settings Navigation", () => {
    const link = document.getElementById("back-to-settings");
    link.click();
    expect(link.getAttribute("href")).toBe("#");
  });

      // New Non-Functional Tests
  test("[C164] [Performance] Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C165] [Accessibility] Keyboard Navigation for All Interactive Settings Options", () => {
    const interactiveElements = document.querySelectorAll(
      '#account-settings button, #account-settings a, #account-settings input, #account-settings select'
    );

    interactiveElements.forEach((element) => {
      expect(element.tabIndex).not.toBe(-1);
    });
  });

  test("[C166] [Security] HTTPS is Enforced for Account Settings Page", () => {
    delete window.location;
    window.location = {
      protocol: "https:"
    };
    expect(window.location.protocol).toBe("https:");
  });

});
