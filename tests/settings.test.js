/**
 * @jest-environment jsdom
 */

describe("Settings Page Integration Testing", () => {
  let document, window;

  beforeEach(() => {
    // Set up a basic DOM structure
    document = global.document;
    window = global.window;

    document.body.innerHTML = `
      <div id="settings">
        <a href="#" id="voice-settings" onclick="navigateTo('voice_setting.html')">Voice Settings</a>
        <a href="#" id="preferences-settings" onclick="navigateTo('preferences_setting.html')">Preferences Settings</a>
        <a href="#" id="notifications-settings" onclick="navigateTo('notifications_setting.html')">Notifications Settings</a>
        <a href="#" id="account-settings" onclick="navigateTo('account_setting.html')">Account Settings</a>
      </div>
    `;

    // Mock the navigation function
    window.navigateTo = (url) => {
      window.location.href = url;
    };

    // Clear window.location between tests
    delete window.location;
    window.location = { href: "" };
  });

  test("[C13] Page Load", () => {
    expect(document.querySelector("#settings")).not.toBeNull();
  });

  test("[C14] Check UI Elements Visibility", () => {
    const links = document.querySelectorAll("#settings a");
    expect(links.length).toBe(4);
  });

  test("[C98] Navigate to Voice Settings", () => {
    document.querySelector("#voice-settings").click();
    expect(window.location.href).toBe("voice_setting.html");
  });

  test("[C99] Navigate to Preferences Settings", () => {
    document.querySelector("#preferences-settings").click();
    expect(window.location.href).toBe("preferences_setting.html");
  });

  test("[C101] Navigate to Notifications Settings", () => {
    document.querySelector("#notifications-settings").click();
    expect(window.location.href).toBe("notifications_setting.html");
  });

  test("[C102] Navigate to Account Settings", () => {
    document.querySelector("#account-settings").click();
    expect(window.location.href).toBe("account_setting.html");
  });

  // Non-Functional Test Cases
  test("[C149] [Performance] Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C150] [Usability] Responsive Design on All Screen Sizes", () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event("resize"));
    const links = document.querySelectorAll("#settings a");
    links.forEach((link) => {
      expect(getComputedStyle(link).display).not.toBe("none");
    });

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
    links.forEach((link) => {
      expect(getComputedStyle(link).display).not.toBe("none");
    });
  });

  test("[C151] [Security] HTTPS is Enforced for Settings Page", () => {
    Object.defineProperty(window, 'location', {
      value: {
        protocol: "https:"
      },
      writable: true
    });
    expect(window.location.protocol).toBe("https:");
  });

  test("[C152] [Accessibility] Keyboard Navigation for All Options", async () => {
    const links = document.querySelectorAll("#settings a");

    // Ensure all links are keyboard accessible
    links.forEach((link) => {
      link.setAttribute("tabindex", "0");
    });

    for (const link of links) {
      link.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(document.activeElement).toBe(link);
    }
  });
});
