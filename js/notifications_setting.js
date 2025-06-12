document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('save-btn');

  saveButton.addEventListener('click', () => {
      const push = document.querySelector('input[name="push"]:checked');
      const email = document.querySelector('input[name="email"]:checked');
      const sound = document.querySelector('input[name="sound"]:checked');

      if (push && email && sound) {
          alert('Preferences saved successfully!');
      } else {
          alert('Please select options for all settings.');
      }
  });
});
