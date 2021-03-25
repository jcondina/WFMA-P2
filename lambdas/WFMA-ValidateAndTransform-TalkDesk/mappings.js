const { v4: uuidv4 } = require('uuid');
const { baseOutputPayload, talkDesk } = require('./constants');

const mappings = {
    talkDesk: TalkDeskMapping,
    kronos: KronosMapping
};

function KronosMapping(payload) {
    return payload;
}

function TalkDeskMapping(payload) {
    let outputPayload = baseOutputPayload;
    
    outputPayload.CurrentAgentSnapshot.AgentStatus.Name = isTalkDeskLoginOrLogout(payload.data.event) ? useCustomTalkDeskMappingValue('agentStatus', payload) : talkDesk.agentStatus[payload.data.current_status];
    outputPayload.CurrentAgentSnapshot.AgentStatus.StartTimestamp = isTalkDeskLoginOrLogout ? useCustomTalkDeskMappingValue('timestamp', payload) : payload.data["time.changed_at.iso8601"].replace(/\s+/g, '') + "Z";
    outputPayload.EventTimestamp = isTalkDeskLoginOrLogout ? useCustomTalkDeskMappingValue('timestamp', payload) : payload.data["time.changed_at.iso8601"].replace(/\s+/g, '') + "Z";
    
    outputPayload.EventType = talkDesk.eventType[payload.data.event];
    outputPayload.AgentARN = payload.data["agent.email"];
    outputPayload.CurrentAgentSnapshot.Configuration.FirstName = payload.data["agent.name"];
    outputPayload.CurrentAgentSnapshot.Configuration.Username = payload.data.agent_id;
    outputPayload.EventId = uuidv4();

    console.log('Transformed event: ', outputPayload);

    return outputPayload;
}

function useCustomTalkDeskMappingValue(property, payload) {
    if (property === 'agentStatus') {
        return payload.data.event === 'agent_login' ? talkDesk.agentStatus.available : talkDesk.agentStatus.offline;
    }

    if (property === 'timestamp') {
        const eventTimeStamp = payload.data["time.now"];
        const time = eventTimeStamp.substring(0, eventTimeStamp.lastIndexOf('-')) + "-00";

        return new Date(time).toISOString();
    }
}

function isTalkDeskLoginOrLogout(eventType) {
    return eventType === 'agent_login' || eventType === 'agent_logout';
}

module.exports = mappings;