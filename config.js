module.exports = {
  server: {
    url: process.env.SERVER_URL || 'http://localhost:5000'
  },
  cron: {
    pruneReports: process.env.CRON_PRUNE_REPORTS_SCHEDULE || '* * 0,12 * * *',
    expireReports: process.env.CRON_EXPIRE_REPORTS_SCHEDULE || '* * 0,12 * * *'
  }
};
