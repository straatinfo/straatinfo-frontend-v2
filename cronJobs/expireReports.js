const request = require('request-promise');
const config = require('../config');
const Promise = require('bluebird');

module.exports = function () {
  const urls = config.server.url.split(':|:');

  return Promise.mapSeries(urls, (url) => {
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
        onsole.log('ERROR in expiring reports', err);
      });
  });
};
