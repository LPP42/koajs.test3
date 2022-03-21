const dbConnPool = require('./db');

let users = {};

users.getUser = async(user) => {
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT * FROM `users` WHERE userName = ?;", [user]);
    users.push(rows);
    console.log(users);
    dbConn.end();
}
module.exports = users;