const validate = require('jsonschema').validate;
const talkDeskEventSchema = require('../../schemas/talkDesk_agent_event_schema.json');
const kronosEventSchema = require('../../schemas/kronos_agent_event_schema.json');

const validations = {
    talkDesk: TalkDeskPayloadValidation,
    kronos: KronosPayloadValidation
};

function TalkDeskPayloadValidation(payload) {
    ValidatePayload(payload, talkDeskEventSchema);
}

function KronosPayloadValidation(payload) {
	ValidatePayload(payload, kronosEventSchema);
}

function ValidatePayload(payload, schema){
	const isPayloadValid = validate(payload, schema);
            
    if (isPayloadValid.errors.length !== 0) {
        console.log(isPayloadValid);
        throw new Error("Received Talk Desk payload is invalid");
    }
}

module.exports = validations;