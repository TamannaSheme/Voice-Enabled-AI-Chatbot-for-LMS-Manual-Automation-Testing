// settings.js
function navigate(page) {
  switch (page) {
    case 'voice':
      window.location.href = "voice_setting.html";
      break;
    case 'preferences':
      window.location.href = "preferences_setting.html";
      break;
    case 'notifications':
      window.location.href = "notifications_setting.html";
      break;
    case 'account':
      window.location.href = "account_setting.html";
      break;
    default:
      console.error("Invalid page specified");
  }
}

// Make sure navigate is exported for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { navigate };
}
