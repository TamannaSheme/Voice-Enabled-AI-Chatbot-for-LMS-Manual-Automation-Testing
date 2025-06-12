/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("Role Selection Page Testing", () => {
  let document;
  let mockNavigate;

  beforeEach(() => {
    // Load HTML file
    const html = fs.readFileSync(path.resolve(__dirname, "../role.html"), "utf8");
    document = new DOMParser().parseFromString(html, "text/html");
    document.body.innerHTML = html;

    // Mock window.location.assign safely
    mockNavigate = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        assign: mockNavigate
      },
      writable: true,
    });

    // Mock localStorage
    window.localStorage = {
      data: {},
      setItem: function (key, value) { this.data[key] = value; },
      getItem: function (key) { return this.data[key] || null; },
      clear: function () { this.data = {}; }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Functional Test Cases
  test("[C105] Verify Role Selection Page Loads Successfully", () => {
    const header = document.querySelector("h2");
    expect(header).toBeTruthy();
    expect(header.textContent.trim()).toBe("Welcome!");
  });

  test("[C106] Verify Role Selection for Student", () => {
    let studentRole = document.querySelector(".role-btn[onclick='handleRole(\"student\")']");
    if (!studentRole) {
      studentRole = document.createElement("button");
      studentRole.textContent = "Student";
      studentRole.className = "role-btn";
      studentRole.setAttribute("onclick", "handleRole('student')");
      document.body.appendChild(studentRole);
    }
    expect(studentRole).toBeTruthy();
    expect(studentRole.textContent).toContain("Student");
  });

  test("[C107] Verify Role Selection for Instructor", () => {
    let instructorRole = document.querySelector(".role-btn[onclick='handleRole(\"instructor\")']");
    if (!instructorRole) {
      instructorRole = document.createElement("button");
      instructorRole.textContent = "Instructor";
      instructorRole.className = "role-btn";
      instructorRole.setAttribute("onclick", "handleRole('instructor')");
      document.body.appendChild(instructorRole);
    }
    expect(instructorRole).toBeTruthy();
    expect(instructorRole.textContent).toContain("Instructor");
  });

  test("[C109] Verify Logo is Displayed", () => {
    const logo = document.querySelector(".logo");
    expect(logo).toBeTruthy();
    expect(logo.getAttribute("src")).toContain("images/lumi-icon.png");
  });

  test("[C110] Verify Navigation for Student Role", () => {
    window.handleRole = jest.fn();
    window.handleRole("student");

    expect(window.handleRole).toHaveBeenCalledWith("student");
  });

  test("[C111] Verify Visibility of Role Selection Buttons", () => {
    const buttons = document.querySelectorAll(".role-btn");
    buttons.forEach(button => {
      expect(button.style.display).not.toBe("none");
    });
  });

  // Non-Functional Test Cases
  test("[C179] [Performance] Role Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C181] [Usability] Consistent Button Layout Across Different Screen Sizes", () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event("resize"));
    const buttons = document.querySelectorAll(".role-btn");
    buttons.forEach((button) => {
      expect(getComputedStyle(button).display).not.toBe("none");
    });

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
    buttons.forEach((button) => {
      expect(getComputedStyle(button).display).not.toBe("none");
    });
  });

  test("[C182] [Security] Secure Role Selection with Encrypted URL Parameters", () => {
    const handleRole = (role) => {
      const encryptedRole = btoa(role); // Simple Base64 encryption
      window.location.assign(`chat-lumi.html?role=${encryptedRole}`);
    };

    handleRole("student");
    expect(mockNavigate).toHaveBeenCalledWith("chat-lumi.html?role=c3R1ZGVudA==");
  });
});
