import moment from 'moment';

const adStop = { active: true, expireAt: moment('1-08-2018', 'DD-MM-YYYY').toISOString() };
export const inventory = {
    adStop,
    cards: [{}], // Need to be improved ?
    id: 'inventoryID1',
    lootBox: [{}], // Same as cards ?
    user: 'userID1'
};

const inventory2 = {
    adStop,
    cards: [{}],
    id: 'inventoryID2',
    lootBox: [{}],
    user: 'userID2'
};

export const inventories = [inventory, inventory2];
