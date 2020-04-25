const pool = require('./dbconnection.js'); 

const jwt = require('jsonwebtoken');

var resultNotFound = {
    "errorCode": "0",
    "errorMessage": "Operation not successfull.",
    "rowCount": "0",
    "data": ""
};

var resultFound = {
    "errorCode": "0",
    "errorMessage": "Operation sucessfull.",
    "rowCount": "1",
    "data": ""
};

module.exports = {
    signUpService: function (req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 

            //bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
            //password(req.body.inputPassword).hash(function (error, hash) {
                var sql = 'INSERT INTO Users SET ?';
                var values = { 'name': req.body.fullName, 'email': req.body.email, 'phone': req.body.phone, 'target': req.body.target };
                
                //use connection
                connection.query(sql, values, function (error, results, field) {
                    if (error) {
                        resultNotFound["errorMessage"] = "email ID already esists.";
                        resultNotFound["errorCode"] = 5; 
                        return res.send(resultNotFound); 
                    } else return res.send(resultFound);
                }); 
           // });

            // when done with connection, release it. 
            //connection.release(); 
           // if (error) throw error; 
        });
    },
}