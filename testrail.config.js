require('dotenv').config();

module.exports = {
  host: "https://chatbotv1.testrail.io",
  username: "ssheme@students.federation.edu.au",
  password: process.env.TESTRAIL_TOKEN,
  projectId: 1,
  suiteId: 1,
  runName: "Jest Secure Run - .env Protected"
};
