const { redirect } = require('koa/lib/response');
const dbConnPool = require('./db');

let users = {};

users.getUser = async(user) => {

    console.log("User: ",user)

    let result = [];

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT * FROM users WHERE userName = (?)", [user]);

    dbConn.end();
    if (rows.length > 0) {
        result = rows;
    }
    return result;
}

users.createUser = async(firstName,lastName,username,password) =>{
    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("INSERT INTO `users` (`firstName`, `LastName`, `userName`, `userPassword`) VALUES (?,?,?,?);",[firstName,lastName,username,password]);
    dbConn.end();
}
module.exports = users;
