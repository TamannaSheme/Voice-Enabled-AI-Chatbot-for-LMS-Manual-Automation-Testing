const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const html = fs.readFileSync(path.resolve(__dirname, "../ask-lumi.html"), "utf8");

let dom, container;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: "dangerously" });
  container = dom.window.document.body;
  global.document = dom.window.document;
  global.window = dom.window;
});

test("[C101] should have a title", () => {
  const title = container.querySelector("h1");
  expect(title).not.toBeNull();
  expect(title.textContent).toMatch(/Ask Lumi/i);
});

test("[C102] should have some buttons", () => {
  const buttons = container.querySelectorAll("button");
  expect(buttons.length).toBeGreaterThan(0);
});
