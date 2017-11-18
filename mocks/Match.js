import moment from 'moment-timezone';

export const match = {
    id: 'matchID1',
    isOver: true,
    phaseInfo: null,
    results: {
        details: {},
        penaltyShoutOut: null,
        scoreTeam1: 7,
        scoreTeam2: 1,
    },
    startAt: moment.tz('2018-06-15 18:00', 'Europe/Moscow'),
    step: 'group',
    team1: 'teamID7',
    team2: 'teamID1'
};

const match2 = {
    id: 'matchID2',
    isOver: false,
    phaseInfo: null,
    results: null,
    startAt: moment.tz('2018-06-18 20:00', 'Europe/Moscow'),
    step: 'group',
    team1: 'teamID1',
    team2: 'teamID7'
};

export const matches = [match, match2];
