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
        away_personalbreak : 'Personal',
        away_break : 'Break',
        away_lunch : 'Lunch',
        away_default : 'Default',
        away_project : 'Project',
        after_call_work : 'After Call Work',
        away_technicalissues : 'Systems Down',
        away_coaching : 'Coaching',
        away_email : 'Administration',
        away_training : 'Training',
        away_backofficework : 'Administration',
        away_additionalacw : 'After Call Work',
        busy : 'Busy',
        offline : 'Offline',
        available : 'Available'
    }
};

module.exports = { baseOutputPayload, talkDesk };