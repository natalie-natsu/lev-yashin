import moment from 'moment';

export const user = {
    bonuses: ['bonusID1', 'bonusID2', 'bonusID3', 'bonusID4', 'bonusID5', ],
    email: 'levyashin@adomain.com',
    firstName: 'Lev',
    games: ['gameID1'],
    id: 'userID1',
    inventory: 'inventoryID1',
    isCertified: true,
    isSuspended: false,
    lastName: 'Yashin',
    lastSignIn: moment('15-06-2018 20:42:55', 'DD-MM-YYYY h:m:s').toISOString(),
    password: 'eeea3b895311bdf8d2778114655d4329',
    phoneNumber: '+33642424242',
    registeredAt: moment('12-06-2018', 'DD-MM-YYYY').toISOString(),
    userName: 'levYashin'
};

const user2 = {
    bonuses: ['bonusID6', 'bonusID7', 'bonusID8', 'bonusID9', 'bonusID10', ],
    email: 'samylaumonier@gmail.com',
    firstName: 'Samy',
    games: ['gameID1', 'gameID2'],
    id: 'userID2',
    inventory: 'inventoryID2',
    isCertified: true,
    isSuspended: false,
    lastName: 'Laumonier',
    lastSignIn: moment('16-06-2018 20:42:55', 'DD-MM-YYYY h:m:s').toISOString(),
    password: 'eeea3b895311bdf8d2778114655d4329',
    phoneNumber: '+33642424242',
    registeredAt: moment('05-05-2018', 'DD-MM-YYYY').toISOString(),
    userName: 'samybob1'
};

export const users = [user, user2];
