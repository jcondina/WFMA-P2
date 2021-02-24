const mappings = require('./mappings');
const validations = require('./validations');
const responses = require('./responses');

exports.handler = async (event) => {
    try {
		// Log the received event on CloudWatch
		console.log('Received event: ', event);
		
		// Validate received payload using client schema
		if(Object.keys(validations).includes(process.env.CLIENT_TYPE))
			validations[process.env.CLIENT_TYPE](event);
		else
			throw new Error(`Client type ${process.env.CLIENT_TYPE} is either invalid or not handled by this Lambda`);
		
		// Transform data to match the payload Aspect expects
		let outputPayload = {};
		if(Object.keys(mappings).includes(process.env.CLIENT_TYPE))
			outputPayload = mappings[process.env.CLIENT_TYPE](event);
		else
			throw new Error(`Payload transformation ${process.env.CLIENT_TYPE} is either invalid or not handled by this Lambda`);
        
		// Validate transformed data (just for testing purposes)
		if(Object.keys(validations).includes(process.env.OUTPUT_TYPE))
			validations[process.env.OUTPUT_TYPE](outputPayload);
		else
			throw new Error(`Payload transformation output ${process.env.OUTPUT_TYPE} is either invalid or not handled by this Lambda`);
		
		return responses.success("Message successfully received");
	} catch (e) {
		console.error(e, 'Error while processing received event');
		return responses.error(JSON.stringify(e));
	}
};
