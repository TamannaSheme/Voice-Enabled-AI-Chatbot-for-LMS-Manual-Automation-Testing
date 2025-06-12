
// navigate.test.js
const { navigate } = require('../js/settings.js');

test('navigate to voice page', () => {
  document.body.innerHTML = `<a href="#" onclick="navigate('voice')">Voice</a>`;
  
  // Mock window.location.href
  delete window.location;
  window.location = { href: "" };

  navigate('voice');
  expect(window.location.href).toBe("voice_setting.html");
});
