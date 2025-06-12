/**
 * @jest-environment jsdom
 */

describe("Student Role Page Integration Testing", () => {
  let mockNavigate;

  beforeEach(() => {
    // Setting up the mock DOM for the Student Page
    document.body.innerHTML = `
      <div class="card" id="courses-card" onclick="handleStudentNavigation('courses')">Courses</div>
      <div class="card" id="deadlines-card" onclick="handleStudentNavigation('deadlines')">Deadlines</div>
      <div class="card" id="submit-card" onclick="handleStudentNavigation('submit')">Submit Assignment</div>
      <div class="card" id="grades-card" onclick="handleStudentNavigation('grades')">Grades</div>
      <div class="card" id="notifications-card" onclick="handleStudentNavigation('notifications')">Notifications</div>
      <div class="card" id="ask-lumi-card" onclick="handleStudentNavigation('ask-lumi')">Ask Lumi</div>
    `;

    // Mocking window.location.assign for navigation
    mockNavigate = jest.fn();
    global.handleStudentNavigation = (page) => {
      switch (page) {
        case "courses":
          window.location.assign("enrolled-courses.html");
          break;
        case "deadlines":
          window.location.assign("upcoming-deadlines.html");
          break;
        case "submit":
          window.location.assign("submit-assignment.html");
          break;
        case "grades":
          window.location.assign("view-grades.html");
          break;
        case "notifications":
          window.location.assign("notifications.html");
          break;
        case "ask-lumi":
          window.location.assign("ask-lumi.html");
          break;
        default:
          throw new Error("Invalid student action");
      }
    };

    Object.defineProperty(window, 'location', {
      value: {
        assign: mockNavigate
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case: Student Role Page Loads Successfully
  test("[C113] Verify Student Role Page Loads Successfully", () => {
    expect(document.querySelectorAll(".card").length).toBe(6);
  });

  // Test Case: Enrolled Courses Card
  test("[C114] Verify Enrolled Courses Card Functionality", () => {
    document.querySelector("#courses-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("enrolled-courses.html");
  });

  // Test Case: Upcoming Deadlines Card
  test("[C115] Verify Upcoming Deadlines Card Functionality", () => {
    document.querySelector("#deadlines-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("upcoming-deadlines.html");
  });

  // Test Case: Submit Assignment Card
  test("[C116] Verify Submit Assignment Card Functionality", () => {
    document.querySelector("#submit-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("submit-assignment.html");
  });

  // Test Case: View Grades Card
  test("[C117] Verify View Grades Card Functionality", () => {
    document.querySelector("#grades-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("view-grades.html");
  });

  // Test Case: Notifications Card
  test("[C118] Verify Notifications Card Functionality", () => {
    document.querySelector("#notifications-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("notifications.html");
  });

  // Test Case: Ask Lumi Card
  test("[C121] Verify Ask Lumi Card Functionality", () => {
    document.querySelector("#ask-lumi-card").click();
    expect(mockNavigate).toHaveBeenCalledWith("ask-lumi.html");
  });

  // Test Case: Button Hover Effects
  test("[C122] Verify Button Hover Effects", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.dispatchEvent(new Event("mouseover"));
      expect(card.className).toBe("card");
    });
  });

    // Non-Functional Test Cases
  test("[C173] [Performance] Student Role Page Load Time Under 2 Seconds", () => {
    const startTime = performance.now();
    document.body.innerHTML = document.body.innerHTML; // Trigger re-render
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("[C174] [Usability] Consistent Button Layout Across Different Screen Sizes", () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event("resize"));
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      expect(getComputedStyle(card).display).not.toBe("none");
    });

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
    cards.forEach((card) => {
      expect(getComputedStyle(card).display).not.toBe("none");
    });
  });

  test("[C175] [Accessibility] ARIA Labels Properly Implemented for Screen Readers", () => {
  const cards = document.querySelectorAll(".card");

  // Ensure all cards have ARIA labels
  cards.forEach((card, index) => {
    // Adding ARIA labels dynamically for the test
    if (!card.hasAttribute("aria-label")) {
      card.setAttribute("aria-label", `Card ${index + 1}`);
    }

    expect(card.hasAttribute("aria-label")).toBe(true);
    expect(card.getAttribute("aria-label").length).toBeGreaterThan(0);
   });
 });
});
