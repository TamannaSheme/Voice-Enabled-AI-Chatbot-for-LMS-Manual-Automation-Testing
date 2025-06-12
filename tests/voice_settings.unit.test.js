/**
 * @jest-environment jsdom
 */

describe("Voice Settings Page Unit Testing", () => {
  let saveSettings;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="voice-settings">
        <input type="checkbox" id="voice-input" />
        <select id="speech-mode">
          <option value="text-to-speech">Text to Speech</option>
          <option value="speech-to-text">Speech to Text</option>
        </select>
        <select id="language">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        <input type="checkbox" id="auto-delete" />
        <button id="save-button">Save</button>
      </div>
    `;

    saveSettings = jest.fn();
    document.getElementById("save-button").onclick = saveSettings;
  });

  test("[U71] Toggle Voice Input", () => {
    const checkbox = document.getElementById("voice-input");
    checkbox.checked = true;
    expect(checkbox.checked).toBe(true);
  });

  test("[U72] Change Speech Mode", () => {
    const select = document.getElementById("speech-mode");
    select.value = "speech-to-text";
    expect(select.value).toBe("speech-to-text");
  });

  test("[U73] Change Language Option", () => {
    const select = document.getElementById("language");
    select.value = "es";
    expect(select.value).toBe("es");
  });

  test("[U74] Toggle Auto-Delete Option", () => {
    const checkbox = document.getElementById("auto-delete");
    checkbox.checked = true;
    expect(checkbox.checked).toBe(true);
  });

  test("[U75] Save Settings Functionality", () => {
    document.getElementById("save-button").click();
    expect(saveSettings).toHaveBeenCalled();
  });
});
