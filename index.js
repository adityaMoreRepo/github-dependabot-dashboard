const express = require('express');
const { Octokit } = require('octokit');

const app = express();
const port = 3001;

const octokit = new Octokit({
  auth: 'GithubAuthToken', // Replace with your GitHub access token
});

app.get('/api/issues', async (req, res) => {
  try {
    const issues = await octokit.rest.issues.listForRepo({
      owner: 'adityaMoreRepo',
      repo: 'spring-docker-mysql',
      labels: 'dependencies',
      state: 'open',
    });

    res.json(issues.data);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
