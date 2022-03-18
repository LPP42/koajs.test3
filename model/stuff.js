//test push
const dbConnPool = require('./db');

let Stuff = {};

Stuff.add = async(name) => {
        let dbConn = await dbConnPool.getConnection();
        const rows = await dbConn.query("INSERT INTO `stuff` (`name`) VALUES (?);", [name]);
        dbConn.end();
    }
    //this is testing merging
Stuff.get = async() => {
    let result = [];

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT stuffId, `name` FROM stuff");
    dbConn.end();

    if (rows.length > 0) {
        result = rows;
    }

    return result;
}

module.exports = Stuff;