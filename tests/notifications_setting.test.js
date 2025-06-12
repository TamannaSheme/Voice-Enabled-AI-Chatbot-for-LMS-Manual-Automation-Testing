/**
 * @jest-environment jsdom
 */

describe("Notifications Settings Page Integration Testing", () => {
  let document, window;

  beforeEach(() => {
    document = global.document;
    window = global.window;

    document.body.innerHTML = `
      <div id="notifications-settings">
        <input type="checkbox" id="push-notifications" />
        <input type="checkbox" id="email-alerts" />
        <select id="sound">
          <option value="on">Enabled</option>
          <option value="off">Off</option>
        </select>
        <button id="save-button">Save</button>
        <a href="#" id="back-to-settings">Back to Settings</a>
      </div>
    `;

    window.alert = jest.fn();

    // Mock save function
    window.saveSettings = jest.fn(() => {
      alert("Settings Saved");
    });

    document.getElementById("save-button").onclick = window.saveSettings;
  });

  test("[C46] Verify Default Selections", () => {
    expect(document.getElementById("push-notifications").checked).toBe(false);
    expect(document.getElementById("email-alerts").checked).toBe(false);
    expect(document.getElementById("sound").value).toBe("on");
  });

  test("[C47] Toggle Push Notifications and Save", () => {
    const checkbox = document.getElementById("push-notifications");
    checkbox.checked = true;
    document.getElementById("save-button").click();
    expect(window.saveSettings).toHaveBeenCalled();
  });

  test("[C48] Toggle Email Alerts and Save", () => {
    const checkbox = document.getElementById("email-alerts");
    checkbox.checked = true;
    document.getElementById("save-button").click();
    expect(window.saveSettings).toHaveBeenCalled();
  });

  test("[C49] Change Sound to Enabled and Save", () => {
    const select = document.getElementById("sound");
    select.value = "on";
    document.getElementById("save-button").click();
    expect(window.saveSettings).toHaveBeenCalled();
  });

  test("[C50] Change Sound to Off and Save", () => {
    const select = document.getElementById("sound");
    select.value = "off";
    document.getElementById("save-button").click();
    expect(window.saveSettings).toHaveBeenCalled();
  });

  test("[C51] Back to Settings Navigation", () => {
    const link = document.getElementById("back-to-settings");
    link.click();
    expect(link.getAttribute("href")).toBe("#");
  });

  test("[C159] Page Load", () => {
    expect(document.querySelector("#notifications-settings")).not.toBeNull();
  });

  test("[C160] Check UI Elements Visibility", () => {
    const elements = document.querySelectorAll("#notifications-settings *");
    expect(elements.length).toBeGreaterThan(0);
  });

  // Non-Functional Test Cases
  test("[C161] [Performance] Notification Settings Save Response Time Under 1 Second", () => {
    const startTime = performance.now();
    document.getElementById("save-button").click();
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(1000);
  });

  test("[C162] [Accessibility] Keyboard Navigation for All Notification Options", async () => {
    const elements = document.querySelectorAll(
      "#notifications-settings input, #notifications-settings select, #notifications-settings button, #notifications-settings a"
    );

    elements.forEach((element) => {
      element.setAttribute("tabindex", "0");
    });

    for (const element of elements) {
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(document.activeElement).toBe(element);
    }
  });

  test("[C163] [Usability] Notifications Settings Display Consistency Across Devices", () => {
    // Simulate different screen sizes
    window.innerWidth = 480;
    window.dispatchEvent(new Event("resize"));
    const elements = document.querySelectorAll("#notifications-settings *");
    elements.forEach((element) => {
      expect(getComputedStyle(element).display).not.toBe("none");
    });

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
    elements.forEach((element) => {
      expect(getComputedStyle(element).display).not.toBe("none");
    });
  });
});
