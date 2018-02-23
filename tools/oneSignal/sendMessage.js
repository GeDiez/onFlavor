const https = require('https');

const sendMessage = messagge => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: 'Basic MWFkYWU1ZjItMmYzMS00NTE4LTlmMzUtMGIwZDcyYThiOTI3',
  };
  const req = https.request(
    {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: headers,
    },
    res => {
      res.on('data', data => {
        console.log('Response: ', JSON.parse(data));
      });
    },
  );
  req.on('error', error => {
    console.error('Ha ocurrido un error: ', error);
  });
  req.write(JSON.stringify(messagge));
  req.end();
};

module.exports = sendMessage;
