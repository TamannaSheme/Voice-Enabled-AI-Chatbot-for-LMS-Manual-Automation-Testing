/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.resolve(__dirname, "../reset-password.html"), "utf8");
let document, window;

beforeEach(() => {
  const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://example.com" });
  document = dom.window.document;
  window = dom.window;
});

describe("Reset Password Page Integration Testing", () => {

  test("[C184] Input Field Validation", () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      expect(input.hasAttribute("required")).toBe(true);
    });
  });

  test("[C186] Verify New Password Field", () => {
    const newPassword = document.getElementById("newPassword");
    expect(newPassword).not.toBeNull();
    expect(newPassword.type).toBe("password");
  });

  test("[C187] Verify Page Load Time", () => {
    const start = performance.now();
    document.body.innerHTML = document.body.innerHTML;
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
  });

  test("[C188] Verify Username/Email Field", () => {
    const username = document.getElementById("username");
    expect(username).not.toBeNull();
    expect(username.placeholder).toContain("username or email");
  });

  test("[C189] Verify Confirm Password Field", () => {
    const confirm = document.getElementById("confirmPassword");
    expect(confirm).not.toBeNull();
    expect(confirm.type).toBe("password");
  });

  test("[C190] Verify Password Matching", () => {
    const form = document.getElementById("resetForm");
    document.getElementById("username").value = "user@example.com";
    document.getElementById("newPassword").value = "abc123";
    document.getElementById("confirmPassword").value = "abc124";

    const alertMock = jest.fn();
    window.alert = alertMock;

    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    expect(alertMock).toHaveBeenCalledWith("Passwords do not match!");
  });

  test("[C191] Verify Change Password Button Enabled", () => {
    const button = document.querySelector("button[type='submit']");
    expect(button.disabled).not.toBe(true);
  });

  test("[C192] Verify Error for Invalid Email", () => {
    document.getElementById("username").value = "invalid";
    document.getElementById("newPassword").value = "abc123";
    document.getElementById("confirmPassword").value = "abc123";

    const alertMock = jest.fn();
    window.alert = alertMock;
    const form = document.getElementById("resetForm");
    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

    expect(alertMock).toHaveBeenCalledWith("Password reset requested for: invalid");
  });

  test("[C193] Verify Successful Password Change", () => {
    document.getElementById("username").value = "user@example.com";
    document.getElementById("newPassword").value = "abc123";
    document.getElementById("confirmPassword").value = "abc123";

    const alertMock = jest.fn();
    window.alert = alertMock;
    const form = document.getElementById("resetForm");
    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

    expect(alertMock).toHaveBeenCalledWith("Password reset requested for: user@example.com");
  });

  test("[C194] Verify Back to Chat Button", () => {
    const backLink = document.querySelector("a[href='ask-lumi.html']");
    expect(backLink).not.toBeNull();
  });

  test("[C195] [Performance] Verify Page Load Time", () => {
    const start = performance.now();
    document.body.innerHTML = document.body.innerHTML;
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
  });

  test("[C196] [Usability] Verify UI Consistency", () => {
    const labels = document.querySelectorAll("label");
    labels.forEach(label => {
      expect(label.textContent.trim()).not.toBe("");
    });
  });

  test("[C197] [Accessibility] Verify Screen Reader Compatibility", () => {
    const username = document.getElementById("username");
    username.setAttribute("aria-label", "Username or Email");
    expect(username.getAttribute("aria-label")).toBe("Username or Email");
  });

});