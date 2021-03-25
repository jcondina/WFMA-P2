const mappings = require('./mappings');
const validations = require('./validations');
const responses = require('./responses');
const kinesis = require('./kinesis');

const clientType = process.env.CLIENT_TYPE;
// const outputType = process.env.OUTPUT_TYPE;
const kinesisActivated = process.env.KINESIS_ACTIVATED === 'true';

exports.handler = async (event) => {
    try {
		// Log the received event on CloudWatch
		console.log('Received event: ', event);
		const payload = JSON.parse(event.body);
		
		// Validate received payload using client schema
		if(Object.keys(validations).includes(clientType))
			validations[clientType](payload);
		else
			throw new Error(`Client type ${clientType} is either invalid or not handled by this Lambda`);
		
		// Transform data to match the payload Aspect expects
		let outputPayload = {};
		if(Object.keys(mappings).includes(clientType))
			outputPayload = mappings[clientType](payload);
		else
			throw new Error(`Payload transformation ${clientType} is either invalid or not handled by this Lambda`);
        
		// Validate transformed data (just for testing purposes)
		// if(Object.keys(validations).includes(outputType))
		// 	validations[outputType](outputPayload);
		// else
		// 	throw new Error(`Payload transformation output ${outputType} is either invalid or not handled by this Lambda`);

		if(kinesisActivated){
			kinesis.save(outputPayload);
		}
		
		return responses.success("Message successfully received");
	} catch (e) {
		console.log('Error while processing received event: ', e);
		const response = responses.error(e.message);
		console.log(response);
		return response;
	}
};
