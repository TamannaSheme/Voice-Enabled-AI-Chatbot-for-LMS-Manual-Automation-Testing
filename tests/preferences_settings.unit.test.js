/**
 * @jest-environment jsdom
 */

describe("Preferences Settings Page Unit Testing", () => {
  let saveSettings;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="preferences-settings">
        <select id="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <select id="font-size">
          <option value="small">Small</option>
          <option value="medium" selected>Medium</option>
          <option value="large">Large</option>
        </select>
        <select id="language">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        <button id="save-button">Save</button>
      </div>
    `;

    saveSettings = jest.fn();
    document.getElementById("save-button").onclick = saveSettings;
  });

  test("[U55] Change Theme Preference", () => {
    const theme = document.getElementById("theme");
    theme.value = "dark";
    expect(theme.value).toBe("dark");
  });

  test("[U56] Change Font Size", () => {
    const fontSize = document.getElementById("font-size");
    fontSize.value = "large";
    expect(fontSize.value).toBe("large");
  });

  test("[U57] Change App Language", () => {
    const language = document.getElementById("language");
    language.value = "es";
    expect(language.value).toBe("es");
  });

  test("[U58] Save Settings Functionality", () => {
    document.getElementById("save-button").click();
    expect(saveSettings).toHaveBeenCalled();
  });
});
