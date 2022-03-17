const dbConnPool = require('./db');

let Stuff = {};

Stuff.add = async(name)=>{
    // let result = {};
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("INSERT INTO `stuff` (`name`) VALUES (?);",[name]);
    dbConn.end();
    // return result;
}

module.exports = Stuff;