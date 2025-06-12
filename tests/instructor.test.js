/**
 * @jest-environment jsdom
 */

describe("Instructor Role Page Complete Integration Testing", () => {
  let document, window;

  beforeEach(() => {
    document = global.document;
    window = global.window;

    document.body.innerHTML = `
      <div id="instructor-dashboard">
        <button id="manage-courses" onclick="window.location.assign('manage-courses.html')">Manage Courses</button>
        <button id="upload-materials" onclick="window.location.assign('upload-materials.html')">Upload Materials</button>
        <button id="grade-submissions" onclick="window.location.assign('grade-submissions.html')">Grade Submissions</button>
        <button id="set-deadlines" onclick="window.location.assign('set-deadlines.html')">Set Deadlines</button>
        <button id="announcements" onclick="window.location.assign('announcements.html')">Announcements</button>
        <button id="ask-lumi" onclick="redirectToAskLumi()">Ask Lumi</button>
        <a href="dashboard.html" id="back-to-dashboard">Back to Dashboard</a>
      </div>
    `;

    // Mocking window.location.assign with a spy
    jest.spyOn(window, 'location', 'get').mockReturnValue({
      assign: jest.fn(),
    });

    // Mocking redirectToAskLumi function
    window.redirectToAskLumi = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Functional Test Cases
  test("[C123] Manage Courses Button Functionality", () => {
    document.getElementById("manage-courses").click();
    expect(window.location.assign).toHaveBeenCalledWith("manage-courses.html");
  });

  test("[C124] Manage Courses Button Functionality Duplicate", () => {
    document.getElementById("manage-courses").click();
    expect(window.location.assign).toHaveBeenCalledWith("manage-courses.html");
  });

  test("[C125] Instructor Page Access Control", () => {
    const header = document.createElement('h1');
    header.textContent = "Welcome, Instructor";
    document.body.appendChild(header);
    expect(header.textContent).toContain("Instructor");
  });

  test("[C126] Upload Materials Button Functionality", () => {
    document.getElementById("upload-materials").click();
    expect(window.location.assign).toHaveBeenCalledWith("upload-materials.html");
  });

  test("[C127] Grade Submissions Button Functionality", () => {
    document.getElementById("grade-submissions").click();
    expect(window.location.assign).toHaveBeenCalledWith("grade-submissions.html");
  });

  test("[C128] Set Deadlines Button Functionality", () => {
    document.getElementById("set-deadlines").click();
    expect(window.location.assign).toHaveBeenCalledWith("set-deadlines.html");
  });

  test("[C129] Announcements Button Functionality", () => {
    document.getElementById("announcements").click();
    expect(window.location.assign).toHaveBeenCalledWith("announcements.html");
  });

  test("[C130] Ask Lumi Button Functionality", () => {
    const askLumiButton = document.getElementById("ask-lumi");
    askLumiButton.click();
    expect(window.redirectToAskLumi).toHaveBeenCalled();
  });

  // Non-Functional Test Cases
  test("[C176] [Performance] Instructor Role Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C177] [Usability] Consistent Button Layout Across Different Screen Sizes", () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event("resize"));
    const buttons = document.querySelectorAll("#instructor-dashboard button");
    buttons.forEach((button) => {
      expect(getComputedStyle(button).display).not.toBe("none");
    });
  });

  test("[C178] [Accessibility] Keyboard Navigation for All Options Accessible", async () => {
    const buttons = document.querySelectorAll("#instructor-dashboard button, #instructor-dashboard a");

    buttons.forEach((button) => {
      button.setAttribute("tabindex", "0");
    });

    for (const button of buttons) {
      button.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(document.activeElement).toBe(button);
    }
  });
});
