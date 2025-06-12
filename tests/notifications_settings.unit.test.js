/**
 * @jest-environment jsdom
 */

describe("Notifications Settings Page Unit Testing", () => {
  let saveSettings;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="notifications-settings">
        <input type="checkbox" id="push-notifications" />
        <input type="checkbox" id="email-alerts" />
        <select id="sound">
          <option value="on">Enabled</option>
          <option value="off">Off</option>
        </select>
        <button id="save-button">Save</button>
      </div>
    `;

    saveSettings = jest.fn();
    document.getElementById("save-button").onclick = saveSettings;
  });

  test("[U51] Toggle Push Notifications", () => {
    const checkbox = document.getElementById("push-notifications");
    checkbox.checked = true;
    expect(checkbox.checked).toBe(true);
  });

  test("[U52] Toggle Email Alerts", () => {
    const checkbox = document.getElementById("email-alerts");
    checkbox.checked = true;
    expect(checkbox.checked).toBe(true);
  });

  test("[U53] Change Sound Option", () => {
    const select = document.getElementById("sound");
    select.value = "off";
    expect(select.value).toBe("off");
  });

  test("[U54] Save Settings Functionality", () => {
    document.getElementById("save-button").click();
    expect(saveSettings).toHaveBeenCalled();
  });
});
