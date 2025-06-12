/**
 * @jest-environment jsdom
 */

describe("Settings Page Unit Testing", () => {
  let navigateTo;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="settings">
        <a href="#" id="voice-settings" onclick="navigateTo('voice_setting.html')">Voice Settings</a>
        <a href="#" id="preferences-settings" onclick="navigateTo('preferences_setting.html')">Preferences Settings</a>
        <a href="#" id="notifications-settings" onclick="navigateTo('notifications_setting.html')">Notifications Settings</a>
        <a href="#" id="account-settings" onclick="navigateTo('account_setting.html')">Account Settings</a>
      </div>
    `;

    // Mock the navigateTo function
    navigateTo = jest.fn((url) => {
      window.location.href = url;
    });

    // Attach the function to global
    window.navigateTo = navigateTo;
  });

  test("[U91] Navigate to Voice Settings", () => {
    document.querySelector("#voice-settings").click();
    expect(navigateTo).toHaveBeenCalledWith("voice_setting.html");
  });

  test("[U92] Navigate to Preferences Settings", () => {
    document.querySelector("#preferences-settings").click();
    expect(navigateTo).toHaveBeenCalledWith("preferences_setting.html");
  });

  test("[U93] Navigate to Notifications Settings", () => {
    document.querySelector("#notifications-settings").click();
    expect(navigateTo).toHaveBeenCalledWith("notifications_setting.html");
  });

  test("[U94] Navigate to Account Settings", () => {
    document.querySelector("#account-settings").click();
    expect(navigateTo).toHaveBeenCalledWith("account_setting.html");
  });
});
