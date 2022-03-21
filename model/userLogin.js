const dbConnPool = require('./db');

let users = {};

users.getUser = async(user) => {
    let result = [];

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT * FROM users WHERE userName = (?)",["admin"]);
    // users.push(rows);
    // console.log(users);
    dbConn.end();
    if (rows.length > 0) {
        result = rows;
    }
   return result;
}
module.exports = users;
