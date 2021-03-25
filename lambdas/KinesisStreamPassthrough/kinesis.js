const AWS = require('aws-sdk');
const kinesisConstant = require('./kinesisConstants');
const kinesis = new AWS.Kinesis({
  region: kinesisConstant.REGION
});

exports.save = async (payload) => {
  try {
		if( typeof payload !== kinesisConstant.PAYLOAD_TYPE) {
			payload = JSON.stringify(payload);
		}
		
		let params = {
			Data: payload,
			PartitionKey: kinesisConstant.PARTITION_KEY,
			StreamName: kinesisConstant.STREAM_NAME
		};
		
		console.log("Sending message to kinesis stream, log before kinesis.putRecord");
		
		await kinesis.putRecord(params, function(err, data) {
			if (err) console.log(err, err.stack);
			else {
				console.log('Record added:',data);
				console.log("Message sent to Kinesis stream: ", kinesisConstant.STREAM_NAME);
			}
		});
	}
	catch(e){
		console.log(e);
  }
};