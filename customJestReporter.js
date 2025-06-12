const fs = require('fs');
const axios = require('axios');

// TestRail Configuration
const TESTRAIL_URL = 'https://chatbotv1.testrail.io';
const PROJECT_ID = 1;
const TESTRAIL_USERNAME = 'syedatamannasheme@gmail.com';
const TESTRAIL_API_KEY = 'WCGRsVWZ8kRyKAI2DtUR-F88143oX3Eo64Qmq/m5h';

// Jira Configuration
const JIRA_URL = 'https://students-team-vvj1dqxd.atlassian.net';
const JIRA_USERNAME = 'ssheme@students.federation.edu';
const JIRA_API_TOKEN = 's8uieErRFzECY3mcyUuc-4vwUmKqJcw1Lx07zS7OF';

class CustomJestReporter {
  async onRunComplete(_, results) {
    fs.writeFileSync('testrail_results.json', JSON.stringify(results, null, 2));
    console.log("✅ TestRail results written to testrail_results.json");

    const testRailResults = this.formatResults(results);
    if (testRailResults.length > 0) {
      const runId = await this.createTestRailRun();
      if (runId) await this.sendResultsToTestRail(runId, testRailResults);
      await this.postResultsToJira(results);
    }
  }

  formatResults(results) {
    const testRailResults = [];

    results.testResults.forEach((testResult) => {
      testResult.testResults.forEach((result) => {
        const testId = this.extractTestId(result.fullName);
        if (testId) {
          testRailResults.push({
            case_id: testId,
            status_id: result.status === "passed" ? 1 : 5,
            comment: result.status === "passed" ? "Test passed" : `Test failed: ${result.failureMessages}`,
          });
        }
      });
    });

    return testRailResults;
  }

  extractTestId(testName) {
    const match = testName.match(/\[C(\d+)\]/);
    return match ? parseInt(match[1], 10) : null;
  }

  async createTestRailRun() {
    try {
      const response = await axios.post(`${TESTRAIL_URL}/index.php?/api/v2/add_run/${PROJECT_ID}`, {
        name: `Automated Test Run - ${new Date().toISOString()}`,
        include_all: true
      }, {
        auth: { username: TESTRAIL_USERNAME, password: TESTRAIL_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ TestRail Run created:', response.data.id);
      return response.data.id;
    } catch (error) {
      console.error('❌ Error creating TestRail run:', error.message);
      return null;
    }
  }

  async sendResultsToTestRail(runId, results) {
    try {
      const response = await axios.post(`${TESTRAIL_URL}/index.php?/api/v2/add_results_for_cases/${runId}`, { results }, {
        auth: { username: TESTRAIL_USERNAME, password: TESTRAIL_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('✅ TestRail results submitted successfully:', response.data);
    } catch (error) {
      console.error('❌ Error sending results to TestRail:', error.response?.data || error.message);
    }
  }

  async postResultsToJira(results) {
    for (const testResult of results.testResults) {
      for (const result of testResult.testResults) {
        const jiraKey = this.extractJiraKey(result.fullName);
        if (jiraKey) {
          await this.postCommentToJira(jiraKey, `Test result for ${result.fullName}: ${result.status}`);
        }
      }
    }
  }

  extractJiraKey(testName) {
    const match = testName.match(/\[(SCRUM-\d+)\]/);
    return match ? match[1] : null;
  }

  async postCommentToJira(issueKey, message) {
    try {
      await axios.post(`${JIRA_URL}/rest/api/2/issue/${issueKey}/comment`, { body: message }, {
        auth: { username: JIRA_USERNAME, password: JIRA_API_TOKEN },
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ Comment added to Jira:', issueKey);
    } catch (error) {
      console.error('❌ Error adding comment to Jira:', error.response?.data || error.message);
    }
  }
}

module.exports = CustomJestReporter;