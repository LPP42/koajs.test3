//test push
const dbConnPool = require('./db');

let Stuff = {};

Stuff.add = async(name) => {
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("INSERT INTO `stuff` (`name`) VALUES (?);", [name]);
    dbConn.end();
}

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

Stuff.delete = async(stuffId) => {
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("DELETE FROM `koajs`.`stuff` WHERE  `stuffId`=?;",[stuffId]);
    dbConn.end();
}
module.exports = Stuff;