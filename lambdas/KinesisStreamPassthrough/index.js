const kinesis = require('./kinesis');

module.exports.handler = (event, context, callback) => {
  console.log('LOADING handler');
  
  const done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err || res,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  kinesis.save(event);
  done(null, event);
};