/**
 * @jest-environment jsdom
 */

// This file focuses on Unit Testing the handleRole function (Logic Only)

describe("handleRole Function Unit Test", () => {
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

  const handleRole = (role) => {
    if (role === "student") {
      window.location.assign("student.html");
    } else if (role === "admin") {
      window.location.assign("admin.html");
    } else if (role === "instructor") {
      window.location.assign("instructor.html");
    } else {
      throw new Error("Invalid role");
    }
  };

  test("[U95] Navigate to Student page", () => {
    handleRole("student");
    expect(mockNavigate).toHaveBeenCalledWith("student.html");
  });

  test("[U96] Navigate to Admin page", () => {
    handleRole("admin");
    expect(mockNavigate).toHaveBeenCalledWith("admin.html");
  });

  test("[U97] Navigate to Instructor page", () => {
    handleRole("instructor");
    expect(mockNavigate).toHaveBeenCalledWith("instructor.html");
  });

  test("[U98] Throw error for invalid role", () => {
    expect(() => handleRole("invalid")).toThrow("Invalid role");
  });
});
