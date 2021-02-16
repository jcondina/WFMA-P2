exports.handler = async (event) => {
    try {
		console.log('Received event: ', event);
		
		return {
			statusCode: 200,
			body: "Message successfully received",
			headers: { 'x-wfma-version': 0.1 },
		};
	} catch (e) {
		console.error(e, 'Error while logging received event');
		
		return {
			statusCode: 500,
			body: JSON.stringify(e),
			headers: { 'x-wfma-version': 0.1 },
		};
	}
};
