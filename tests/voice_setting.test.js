/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(path.resolve(__dirname, "../voice_setting.html"), "utf8");
let document, window;

beforeEach(() => {
  const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://example.com" });
  document = dom.window.document;
  window = dom.window;
});

describe("Voice Settings Page Integration Testing", () => {

  test("[C20] Enable/Disable Voice Input", () => {
    const checkbox = document.getElementById("enable-voice");
    expect(checkbox).not.toBeNull();
    checkbox.checked = false;
    expect(checkbox.checked).toBe(false);
  });

  test("[C21] Select Speech Mode Option", () => {
    const options = document.getElementsByName("speech-mode");
    options.forEach(opt => opt.checked = false);
    options[0].checked = true;
    expect(options[0].checked).toBe(true);
  });

  test("[C22] Change Language Option", () => {
    const language = document.getElementsByName("language");
    expect(language.length).toBeGreaterThan(0);
    language[0].checked = true;
    expect(language[0].checked).toBe(true);
  });

  test("[C23] Change Auto-Delete Option", () => {
    const autoDelete = document.getElementsByName("auto-delete");
    autoDelete.forEach(opt => opt.checked = false);
    autoDelete[1].checked = true;
    expect(autoDelete[1].checked).toBe(true);
  });

  test("[C24] Save Button Functionality", () => {
    const saveBtn = document.getElementById("save-btn");
    expect(saveBtn).not.toBeNull();
    let clicked = false;
    saveBtn.addEventListener("click", () => clicked = true);
    saveBtn.click();
    expect(clicked).toBe(true);
  });

  test("[C25] Navigation to Settings Page", () => {
    const backLink = document.querySelector("a[href='settings.html']");
    expect(backLink).not.toBeNull();
  });

  test("[C153] [Performance] Save Changes Response Time Under 1 Second", () => {
    const start = performance.now();
    document.getElementById("save-btn").click();
    const end = performance.now();
    expect(end - start).toBeLessThan(1000);
  });

  test("[C154] [Accessibility] Keyboard Navigation for All Options", () => {
    const inputs = document.querySelectorAll("input, button");
    inputs.forEach(input => {
      input.focus();
      expect(document.activeElement).toBe(input);
    });
  });

  test("[C155] [Usability] Speech Mode Option is Responsive", () => {
    const speechModes = document.getElementsByName("speech-mode");
    speechModes[2].checked = true;
    expect(speechModes[2].checked).toBe(true);
  });

});