/**
 * @jest-environment jsdom
 */

describe("Student Page Unit Testing", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
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

  const handleStudentNavigation = (action) => {
    switch (action) {
      case "enrolled-courses":
        window.location.assign("enrolled-courses.html");
        break;
      case "upcoming-deadlines":
        window.location.assign("upcoming-deadlines.html");
        break;
      case "submit-assignment":
        window.location.assign("submit-assignment.html");
        break;
      case "notifications":
        window.location.assign("notifications.html");
        break;
      case "view-grades":
        window.location.assign("view-grades.html");
        break;
      case "ask-lumi":
        window.location.assign("ask-lumi.html");
        break;
      default:
        throw new Error("Invalid student action");
    }
  };

  test("[U81] Navigate to Enrolled Courses page", () => {
    handleStudentNavigation("enrolled-courses");
    expect(mockNavigate).toHaveBeenCalledWith("enrolled-courses.html");
  });

  test("[U82] Navigate to Upcoming Deadlines page", () => {
    handleStudentNavigation("upcoming-deadlines");
    expect(mockNavigate).toHaveBeenCalledWith("upcoming-deadlines.html");
  });

  test("[U83] Navigate to Submit Assignment page", () => {
    handleStudentNavigation("submit-assignment");
    expect(mockNavigate).toHaveBeenCalledWith("submit-assignment.html");
  });

  test("[U84] Navigate to Notifications page", () => {
    handleStudentNavigation("notifications");
    expect(mockNavigate).toHaveBeenCalledWith("notifications.html");
  });

  test("[U85] Navigate to View Grades page", () => {
    handleStudentNavigation("view-grades");
    expect(mockNavigate).toHaveBeenCalledWith("view-grades.html");
  });

  test("[U86] Navigate to Ask Lumi page", () => {
    handleStudentNavigation("ask-lumi");
    expect(mockNavigate).toHaveBeenCalledWith("ask-lumi.html");
  });

  test("[U87] Throw error for invalid student action", () => {
    expect(() => handleStudentNavigation("invalid-action")).toThrow("Invalid student action");
  });
});
