const  fs = require('fs/promises');
const  path = require('path');

const dbPath = path.join(process.cwd(), 'db.json');

const reader = async () => {
    const json = await fs.readFile(dbPath, {encoding: 'utf-8'});
    const users = JSON.parse(json);
    return users
};

const writer = async (users) => {
    const json = await fs.writeFile(dbPath, JSON.stringify(users));
};

module.exports = {
    reader,
    writer
}