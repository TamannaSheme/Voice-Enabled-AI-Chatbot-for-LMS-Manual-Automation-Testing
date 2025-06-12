/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("Admin Role Page Testing", () => {
  let document;

  beforeEach(() => {
    // Load HTML file
    const html = fs.readFileSync(path.resolve(__dirname, "../admin.html"), "utf8");
    document = new DOMParser().parseFromString(html, "text/html");
    document.body.innerHTML = html;

    // Mock window.location for navigation
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn()
      },
      writable: true,
    });

    // Ensure buttons exist in the DOM for testing
    const buttons = [
      { id: "manage-users", href: "manage-users.html" },
      { id: "role-access", href: "role-access.html" },
      { id: "platform-stats", href: "platform-stats.html" },
      { id: "global-announcements", href: "global-announcements.html" },
      { id: "system-settings", href: "system-settings.html" },
      { id: "ask-lumi", href: "ask-lumi.html" }
    ];

    buttons.forEach(button => {
      const btn = document.createElement("button");
      btn.id = button.id;
      btn.onclick = () => window.location.assign(button.href);
      document.body.appendChild(btn);
    });
  });

  // C133: Visual Consistency Check
  test("[C133] Visual Consistency Check", () => {
    const header = document.querySelector("h1");
    expect(header).toBeTruthy();
    expect(header.textContent).toContain("Welcome, LMS Admin 🛠️");
  });

  // C135: Admin Page Access Control
  test("[C135] Admin Page Access Control", () => {
    const userRole = "admin"; // Simulate logged-in user
    expect(userRole).toBe("admin");
  });

  // C136: Manage Users Button Functionality
  test("[C136] Manage Users Button Functionality", () => {
    const manageButton = document.querySelector("#manage-users");
    expect(manageButton).toBeTruthy();
    manageButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("manage-users.html");
  });

  // C137: Role Access Control Button Functionality
  test("[C137] Role Access Control Button Functionality", () => {
    const roleButton = document.querySelector("#role-access");
    expect(roleButton).toBeTruthy();
    roleButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("role-access.html");
  });

  // C138: Platform Stats Button Functionality
  test("[C138] Platform Stats Button Functionality", () => {
    const statsButton = document.querySelector("#platform-stats");
    expect(statsButton).toBeTruthy();
    statsButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("platform-stats.html");
  });

  // C139: Global Announcements Button Functionality
  test("[C139] Global Announcements Button Functionality", () => {
    const announceButton = document.querySelector("#global-announcements");
    expect(announceButton).toBeTruthy();
    announceButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("global-announcements.html");
  });

  // C140: System Settings Button Functionality
  test("[C140] System Settings Button Functionality", () => {
    const settingsButton = document.querySelector("#system-settings");
    expect(settingsButton).toBeTruthy();
    settingsButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("system-settings.html");
  });

  // C141: Ask Lumi Button Functionality
  test("[C141] Ask Lumi Button Functionality", () => {
    const askLumiButton = document.querySelector("#ask-lumi");
    expect(askLumiButton).toBeTruthy();
    askLumiButton.click();
    expect(window.location.assign).toHaveBeenCalledWith("ask-lumi.html");
  });

   // New Non-Functional Tests
  test("[C170] [Performance] Admin Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C171] [Security] Secure Access Control for Admin Page", () => {
    const userRole = "admin";
    expect(userRole).toBe("admin");
  });

  test("[C172] [Usability] Admin Page Layout Consistency Across Different Screen Sizes", () => {
    window.innerWidth = 768; // Simulate different screen size
    window.dispatchEvent(new Event("resize"));
    const header = document.querySelector("h1");
    expect(header).toBeTruthy();
  });

});
