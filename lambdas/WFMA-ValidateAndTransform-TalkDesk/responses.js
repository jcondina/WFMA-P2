const apiVersion = 0.1;

const responses = {
    success: responseOk,
    error: responseInternalServerError
};

function responseOk(body) {
    return {
        statusCode: 200,
        body: body,
        headers: { 'x-wfma-version': apiVersion },
    };
}

function responseInternalServerError(body) {
    return {
        statusCode: 500,
        body: body,
        headers: { 'x-wfma-version': apiVersion },
    };
}

module.exports = responses;