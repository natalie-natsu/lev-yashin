import moment from 'moment';

export const game = {
    admin: 'userID1',
    areReady: ['userID1', 'userID2', 'userID3', 'userID4'],
    createdAt:  moment('13-06-2018', 'DD-MM-YYYY').toISOString(),
    id: 'gameID1',
    isInMercato: true,
    isWithBonuses: true,
    prognostics: ['prognosticID1', 'prognosticID2', 'prognosticID3', 'prognosticID4', 'prognosticID5'],
    public: false,
    step: 'group',
    users: ['userID1', 'userID2', 'userID3', 'userID4']
};

export const game2 = {
    admin: 'userID2',
    areReady: ['userID1', 'userID3', 'userID4'],
    createdAt:  moment('14-06-2018', 'DD-MM-YYYY').toISOString(),
    id: 'gameID1',
    isInMercato: false,
    isWithBonuses: true,
    prognostics: ['prognosticID6', 'prognosticID7', 'prognosticID8', 'prognosticID9', 'prognosticID10'],
    public: false,
    step: 'lobby',
    users: ['userID1', 'userID2', 'userID3', 'userID4']
};

export const games = [game, game2];
