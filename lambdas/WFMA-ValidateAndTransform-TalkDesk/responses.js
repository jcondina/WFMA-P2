const apiVersion = 0.1;

const responses = {
    success: responseOk,
    error: responseInternalServerError
};

function responseOk(message) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            statusCode: 200,
            message: message,
        }),
        headers: { 'x-wfma-version': apiVersion },
        isBase64Encoded:  false,
    };
}

function responseInternalServerError(body){
    return {
        statusCode: 400,
        body: JSON.stringify({
            errorMessage: body,
            statusCode: 400,
        }),
        headers: { 'x-wfma-version': apiVersion },
        isBase64Encoded: false,
    };
}

module.exports = responses;