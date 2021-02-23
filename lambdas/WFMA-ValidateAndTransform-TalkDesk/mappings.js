// const { v4: uuidv4 } = require('uuid');
const { baseOutputPayload, talkDesk } = require('./constants');

const mappings = {
    talkDesk: TalkDeskMapping
};

function TalkDeskMapping(inputPayload) {
    let outputPayload = baseOutputPayload;
    
    outputPayload.CurrentAgentSnapshot.AgentStatus.Name = isLoginOrLogout ? useCustomMappingValue('agentStatus', inputPayload) : talkDesk.agentStatus[inputPayload.data.current_status];
    outputPayload.CurrentAgentSnapshot.AgentStatus.StartTimestamp = isLoginOrLogout ? useCustomMappingValue('timestamp', inputPayload) : inputPayload.data["time.changed_at.iso8601"].replace(/\s+/g, '') + "Z";
    outputPayload.EventTimestamp = isLoginOrLogout ? useCustomMappingValue('timestamp', inputPayload) : inputPayload.data["time.changed_at.iso8601"].replace(/\s+/g, '') + "Z";
    
    outputPayload.EventType = talkDesk.eventType[inputPayload.data.event];
    outputPayload.AgentARN = inputPayload.data["agent.email"];
    outputPayload.CurrentAgentSnapshot.Configuration.FirstName = inputPayload.data["agent.name"];
    outputPayload.CurrentAgentSnapshot.Configuration.Username = inputPayload.data.agent_id;
    outputPayload.EventId = 'test-event-id'; //uuidv4();

    return outputPayload;
}

function useCustomMappingValue(property, inputPayload) {
    if (property === 'agentStatus') {
        return inputPayload.data.event === 'agent_login' ? talkDesk.agentStatus.available : talkDesk.agentStatus.offline;
    }

    if (property === 'timestamp') {
        const eventTimeStamp = inputPayload.data["time.now"];
        const time = eventTimeStamp.substring(0, eventTimeStamp.lastIndexOf('-')) + "-00";

        return new Date(time).toISOString();
    }
}

function isLoginOrLogout(eventType) {
    return eventType === 'agent_login' || eventType === 'agent_logout';
}

module.exports = mappings;