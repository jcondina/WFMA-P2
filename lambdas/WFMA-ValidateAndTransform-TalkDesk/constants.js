const baseOutputPayload = {
    "AWSAccountId": null,
    "AgentARN": null,
    "CurrentAgentSnapshot": {
        "AgentStatus": {
            "ARN": null,
            "Name": null,
            "StartTimestamp": null
        },
        "Configuration": {
            "AgentHierarchyGroups": null,
            "FirstName": null,
            "LastName": null,
            "RoutingProfile": null,
            "Username": null
        },
        "Contacts": null
    },
    "EventId": null,
    "EventTimestamp": null,
    "EventType": null,
    "InstanceARN": null,
    "PreviousAgentSnapshot": null,
    "Version": "2017-10-01"
};

const talkDesk = {
    eventType: {
        agent_status_changed: "STATE_CHANGE",
        agent_login: "LOGIN",
        agent_logout: "LOGOUT"
    },
    agentStatus: {
        after_call_work: 'After Call Work',
        available: 'Available',
        away: 'Default',
        away_additionalacw: 'After Call Work',
        away_backofficework: 'Administration',
        away_break: 'Break',
        away_chat: 'Chat',
        away_coaching: 'Coaching',
        away_default: 'Default',
        away_email: 'Email',
        away_lunch: 'Lunch',
        away_meeting: 'Pre-Shift',
        away_outbound: 'Outbound',
        away_personal: 'Personal',
        away_personalbreak: 'Personal',
        away_project: 'Project',
        away_technicalissues: 'Systems Down',
        away_training: 'Training',
        busy: 'Connected',
        offline: 'Offline',
    }
};

module.exports = { baseOutputPayload, talkDesk };