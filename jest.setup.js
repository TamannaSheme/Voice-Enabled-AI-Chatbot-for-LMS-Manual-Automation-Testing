// Polyfill for TextEncoder/TextDecoder if using Node < 18
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

// Add Jest DOM extensions
require('@testing-library/jest-dom');
