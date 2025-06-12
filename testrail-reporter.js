const axios = require("axios");
const fs = require("fs");

const TESTRAIL_HOST = 'https://chatbotv1.testrail.io/';
const PROJECT_ID = 1;
const SUITE_ID = 1;
const RUN_NAME = `Automated Run - ${new Date().toISOString()}`;
const API_KEY = 'ATATT3xFfGF0A6qyHjqX8WUWwmiYV_1dn86OuryCjUJ6qaKLYwkhljiW2JeEUvOyA8xd39NM0SGsqEP7ar03ZuCcXLMwVV43JrwNRSBqAAcWpNn20vNMTyO9S8N-V_02lKXmngUszQRsZkbMD9MApROMOYQrc5C_yCmdSvNOnr2Rc9BG7i-Udyc=92B0EA29';
const USER_EMAIL = 'syedatamannasheme@gmail.com';

async function createRun() {
  const res = await axios.post(
    `${TESTRAIL_HOST}index.php?/api/v2/add_run/${PROJECT_ID}`,
    {
      suite_id: SUITE_ID,
      name: RUN_NAME,
      include_all: false,
      case_ids: [101, 102]  // Example Test Case IDs
    },
    {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${USER_EMAIL}:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    }
  );
  return res.data.id;
}

async function addResult(runId, caseId, statusId, comment = "") {
  await axios.post(
    `${TESTRAIL_HOST}index.php?/api/v2/add_result_for_case/${runId}/${caseId}`,
    {
      status_id: statusId,
      comment
    },
    {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${USER_EMAIL}:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    }
  );
}

(async () => {
  const runId = await createRun();
  const results = JSON.parse(fs.readFileSync('./test-results.json', 'utf8'));

  for (const test of results.testResults[0].assertionResults) {
    const title = test.title;
    const caseId = test.case_id; // Make sure you have case_id in your JSON
    if (!caseId) continue;

    const statusId = test.status === 'passed' ? 1 : 5; // 1: Passed, 5: Failed
    await addResult(runId, caseId, statusId, `Status: ${test.status}`);
  }
})();
