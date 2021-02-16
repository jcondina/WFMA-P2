const AWS = require('aws-sdk');
const kinesisConstant = require('./kinesisConstants');
const kinesis = new AWS.Kinesis({
  region: kinesisConstant.REGION
});

const savePayload = (payload) => {

  if( typeof payload !== kinesisConstant.PAYLOAD_TYPE) {
    try {
      payload = JSON.stringify(payload);
    } catch (e) {
      console.log(e);
    }
  }

  let params = {
    Data: payload,
    PartitionKey: kinesisConstant.PARTITION_KEY,
    StreamName: kinesisConstant.STREAM_NAME
  };

  kinesis.putRecord(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log('Record added:',data);
  });
};

exports.save = (payload) => {
  const params = {
    StreamName: kinesisConstant.STREAM_NAME,
  };

  kinesis.describeStream(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      if(data.StreamDescription.StreamStatus === kinesisConstant.STATE.ACTIVE
        || data.StreamDescription.StreamStatus === kinesisConstant.STATE.UPDATING ) {
        savePayload(payload);
      } else {
        console.log(`Kinesis stream ${kinesisConstant.STREAM_NAME} is ${data.StreamDescription.StreamStatus}.`);
        console.log(`Record Lost`, JSON.parse(payload));
      }
    }
  });
};