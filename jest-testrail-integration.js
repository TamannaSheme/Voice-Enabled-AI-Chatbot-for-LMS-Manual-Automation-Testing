const axios = require("axios");

const TESTRAIL_HOST = 'https://chatbotv1.testrail.io/';
const API_KEY = 'ATATT3xFfGF0A6qyHjqX8WUWwmiYV_1dn86OuryCjUJ6qaKLYwkhljiW2JeEUvOyA8xd39NM0SGsqEP7ar03ZuCcXLMwVV43JrwNRSBqAAcWpNn20vNMTyO9S8N-V_02lKXmngUszQRsZkbMD9MApROMOYQrc5C_yCmdSvNOnr2Rc9BG7i-Udyc=92B0EA29';
const USER_EMAIL = 'syedatamannasheme@gmail.com';

// Corrected API request with Basic Auth using Base64 encoding
axios.post(
  `${TESTRAIL_HOST}index.php?/api/v2/add_run/1`,
  {
    suite_id: 1,
    name: "Automated Test Run",
    include_all: false
  },
  {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${USER_EMAIL}:${API_KEY}`).toString('base64'),
      'Content-Type': 'application/json'
    }
  }
)
  .then((response) => {
    console.log("✅ TestRail Run Created:", response.data);
  })
  .catch((error) => {
    console.error("❌ Error creating TestRail Run:", error.response ? error.response.data : error.message);
  });
