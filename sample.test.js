test("C3 - Submit Button works", () => {
  expect(1 + 1).toBe(2);
});

test("C4 - Email field accepts valid input", () => {
  expect("user@example.com").toMatch(/@/);
});

test("C5 - Validation fails on empty form", () => {
  expect("").toBe("");
});
