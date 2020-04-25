var mysql = require('mysql');
var pool = mysql.createPool(
    {
        connectionLimit : 10,
        host            : process.env.DB_HOST,
        user            : process.env.DB_USERNAME, 
        password        : process.env.DB_PASSWORD, 
        database        : process.env.DB_NAME
    }
);

pool.getConnection(function(err, connection) {
    if (err) {
        //console.error('error connecting: ' + err.stack);
        throw err;
    } 
});

module.exports = pool; 