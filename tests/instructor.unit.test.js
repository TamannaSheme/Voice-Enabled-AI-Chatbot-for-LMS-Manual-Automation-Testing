/**
 * @jest-environment jsdom
 */

describe("Instructor Page Unit Testing", () => {
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

  const handleInstructorNavigation = (action) => {
    switch (action) {
      case "manage-courses":
        window.location.assign("manage-courses.html");
        break;
      case "upload-materials":
        window.location.assign("upload-materials.html");
        break;
      case "grade-submissions":
        window.location.assign("grade-submissions.html");
        break;
      case "set-deadlines":
        window.location.assign("set-deadlines.html");
        break;
      case "announcements":
        window.location.assign("announcements.html");
        break;
      case "ask-lumi":
        window.location.assign("ask-lumi.html");
        break;
      default:
        throw new Error("Invalid instructor action");
    }
  };

  test("[U11] Navigate to Manage Courses page", () => {
    handleInstructorNavigation("manage-courses");
    expect(mockNavigate).toHaveBeenCalledWith("manage-courses.html");
  });

  test("[U12] Navigate to Upload Materials page", () => {
    handleInstructorNavigation("upload-materials");
    expect(mockNavigate).toHaveBeenCalledWith("upload-materials.html");
  });

  test("[U13] Navigate to Grade Submissions page", () => {
    handleInstructorNavigation("grade-submissions");
    expect(mockNavigate).toHaveBeenCalledWith("grade-submissions.html");
  });

  test("[U14] Navigate to Set Deadlines page", () => {
    handleInstructorNavigation("set-deadlines");
    expect(mockNavigate).toHaveBeenCalledWith("set-deadlines.html");
  });

  test("[U15] Navigate to Announcements page", () => {
    handleInstructorNavigation("announcements");
    expect(mockNavigate).toHaveBeenCalledWith("announcements.html");
  });

  test("[U16] Navigate to Ask Lumi page", () => {
    handleInstructorNavigation("ask-lumi");
    expect(mockNavigate).toHaveBeenCalledWith("ask-lumi.html");
  });

  test("[U17] Throw error for invalid instructor action", () => {
    expect(() => handleInstructorNavigation("invalid-action")).toThrow("Invalid instructor action");
  });
});
