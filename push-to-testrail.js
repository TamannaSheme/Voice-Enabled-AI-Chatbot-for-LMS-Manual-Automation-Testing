const axios = require('axios');
require('dotenv').config();

const username = process.env.TESTRAIL_USERNAME;
const apiKey = process.env.TESTRAIL_APIKEY;

const auth = Buffer.from(`${username}:${apiKey}`).toString('base64');

axios.post(
  'https://chatbotv1.testrail.io/index.php?/api/v2/add_run/1',
  {
    suite_id: 1,
    name: 'Automated Run from Jest JSON',
    include_all: false,
    case_ids: []
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`
    }
  }
).then(response => {
  console.log('✅ Test run created:', response.data);
}).catch(error => {
  console.error('❌ Error:', error.response?.data || error.message);
});
