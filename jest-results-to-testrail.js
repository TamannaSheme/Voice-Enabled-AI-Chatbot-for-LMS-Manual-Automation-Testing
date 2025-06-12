const fs = require("fs");

module.exports = (results) => {
  const testRailPayload = {
    results: []
  };

  results.testResults.forEach((suite) => {
    suite.testResults.forEach((test) => {
      // Extract case ID from test name, e.g., "[C94] should load page"
      const match = test.title.match(/\[C(\d+)\]/);
      if (!match) return;

      const caseId = parseInt(match[1]);
      const statusId = test.status === "passed" ? 1 : 5;
      const comment = test.status === "passed" ? "Passed successfully" : `Failed: ${test.failureMessages.join(" ")}`;

      testRailPayload.results.push({
        case_id: caseId,
        status_id: statusId,
        comment
      });
    });
  });

  fs.writeFileSync("test_payload.json", JSON.stringify(testRailPayload, null, 2));
  return results;
};
