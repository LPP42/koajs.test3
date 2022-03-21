const dbConnPool = require('./db');

let users = {};

users.add = async() => {
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT * FROM `users`;");
    console.log(rows)
    dbConn.end();
}

module.exports = users;