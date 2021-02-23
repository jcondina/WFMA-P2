const talkDeskEnum = {
    eventTypes = {
        login: 'agent_login',
        logout: 'agent_logout',
        statusChanged: 'agent_status_changed'
    },
    agentStatus: {
        available: 'available',
        busy: 'busy',
        away: {
            additionalAcw: 'away_additionalacw',
            afterCallWork: 'after_call_work',
            away: 'away',
            awayDefault: 'away_default',
            backOfficeWork: 'away_backofficework',
            break: 'away_break',
            coaching: 'away_coaching',
            email: 'away_email',
            lunch: 'away_lunch',
            personalBreak: 'away_personalbreak',
            project: 'away_project',
            training: 'away_training',
            technicalIssues: 'away_technicalissues',
        },
        offline: 'offline'
    }
}

export default talkDeskEnum;