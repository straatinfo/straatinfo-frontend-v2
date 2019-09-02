const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cron = require('node-cron');

const cronJobs = require('./cronJobs');
const config = require('./config');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

// run cron jobs
const taskExpire = cron.schedule(config.cron.expireReports, () => {
  console.log('REGISTERING EXPIRE REPORTS JOB');
  cronJobs.expireReports();
});

const taskPrune = cron.schedule(config.cron.pruneReports, () => {
  console.log('REGISTERING PRUNE REPORTS JOB');
  cronJobs.pruneReports();
});

let cronIsRunning = false;

server.listen(port, () => {
  if (!cronIsRunning && config.cron.enabled) {
    console.log('CRON JOB INITIALIZATION');
    cronIsRunning = true;
    taskExpire.start();
    taskPrune.start();
  }
  console.log(`Running on localhost:${port}`)
});

// server.close(() => {
//   taskExpire.destroy()
//   taskPrune.destroy();
// });
