const request = require('request-promise');
const config = require('../config');

module.exports = function () {
  const url = config.server.url;
  const requestUrl = url + '/v3/api/cronJobs/reports';
  const options = {
    method: 'PUT',
    uri: requestUrl,
    headers: {
        /* 'content-type': 'multipart/form-data' */ // Is set automatically
    }
};
  return request(options)
    .then(() => {
      console.log('Successfully expired reports')
    })
    .catch((err) => {
      console.log('ERROR in expiring reports', err);
    });
};
