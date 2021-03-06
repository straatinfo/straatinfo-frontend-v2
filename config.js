module.exports = {
  server: {
    url: process.env.SERVER_URL || 'https://straatinfo-backend-v2.herokuapp.com' // 'http://localhost:5000'
  },
  cron: {
    enabled: process.env.PRUNE_ENABLED == 'true',
    pruneReports: process.env.CRON_PRUNE_REPORTS_SCHEDULE || '10 * * * * *',
    expireReports: process.env.CRON_EXPIRE_REPORTS_SCHEDULE || '10 * * * * *'
  }
};
