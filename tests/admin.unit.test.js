/**
 * @jest-environment jsdom
 */

describe("Admin Page Unit Testing", () => {
  let mockNavigate;

  const setupMocks = () => {
    mockNavigate = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { assign: mockNavigate },
      writable: true,
    });
  };

  const handleAdminNavigation = (action) => {
    const routes = {
      "manage-users": "manage-users.html",
      "role-access": "role-access.html",
      "platform-stats": "platform-stats.html",
      "global-announcements": "global-announcements.html",
      "system-settings": "system-settings.html",
      "ask-lumi": "ask-lumi.html"
    };

    if (!routes[action]) {
      throw new Error("Invalid admin action");
    }

    window.location.assign(routes[action]);
  };

  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("[U21] Navigate to Manage Users", () => {
    handleAdminNavigation("manage-users");
    expect(mockNavigate).toHaveBeenCalledWith("manage-users.html");
  });

  test("[U22] Navigate to Role Access", () => {
    handleAdminNavigation("role-access");
    expect(mockNavigate).toHaveBeenCalledWith("role-access.html");
  });

  test("[U23] Navigate to Platform Stats", () => {
    handleAdminNavigation("platform-stats");
    expect(mockNavigate).toHaveBeenCalledWith("platform-stats.html");
  });

  test("[U24] Navigate to Global Announcements", () => {
    handleAdminNavigation("global-announcements");
    expect(mockNavigate).toHaveBeenCalledWith("global-announcements.html");
  });

  test("[U25] Navigate to System Settings", () => {
    handleAdminNavigation("system-settings");
    expect(mockNavigate).toHaveBeenCalledWith("system-settings.html");
  });

  test("[U26] Navigate to Ask Lumi", () => {
    handleAdminNavigation("ask-lumi");
    expect(mockNavigate).toHaveBeenCalledWith("ask-lumi.html");
  });

  test("[U27] Invalid Action Throws Error", () => {
    expect(() => handleAdminNavigation("invalid")).toThrow("Invalid admin action");
  });
});
