
function mockVoiceCommand(command) {
  return command === "hello" ? "Hi, how can I help you?" : "Sorry, repeat please.";
}

test('responds to known command', () => {
  expect(mockVoiceCommand("hello")).toBe("Hi, how can I help you?");
});