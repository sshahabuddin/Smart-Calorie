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
    //New User Sign Up
    signUpService: function (req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 

            //bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
            //password(req.body.inputPassword).hash(function (error, hash) {
                var sql = 'INSERT INTO Users SET ?';
                var values = { 'name': req.body.fullName, 'email': req.body.email, 'phone': req.body.phone, 'target': req.body.target };
                
                //use connection
                connection.query(sql, values, 
                    function (error, results, field) {
                        if (error) {
                            resultNotFound["errorMessage"] = "email ID already esists.";
                            resultNotFound["errorCode"] = 5; 
                            return res.send(resultNotFound); 
                        } else 
                            return res.send(resultFound);
                    }
                ); 
           // });

            // when done with connection, release it. 
            //connection.release(); 
           // if (error) throw error; 
        });
    },  

    //UPDATE
    updateService: function (req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 

            //bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
            //password(req.body.inputPassword).hash(function (error, hash) {
            var sql = 'SELECT idUsers FROM Users WHERE email="' + req.body.email + '"';
            
            //use connection
            connection.query(sql, 
                function (error, result1, field) {
                    if (error) {
                        resultNotFound["errorMessage"] = "email ID already esists.";
                        resultNotFound["errorCode"] = 5;
                        console.log("Error Update");
                        return res.send(resultNotFound); 
                    } 
                    else 
                    {
                        var sql2 = 'INSERT INTO FoodItem SET ?';
                        var values2 = { 'foodName': req.body.foodName, 'calorie': req.body.calCount, "Users_idUsers": result1[0].idUsers };
                        
                        //use connection
                        connection.query(sql2, values2, 
                            function (error, result2, field) {
                                if (error) {
                                    resultNotFound["errorMessage"] = "email ID already esists.";
                                    resultNotFound["errorCode"] = 5;
                                    console.log("Error Food Item Update"); 
                                    return res.send(resultNotFound); 
                                } 
                                else
                                {
                                    console.log("Success Food Item Update");
                                    return res.send(resultFound);
                                }
                            }
                            );
                    }
                }
                );
        }
        );

        pool.getConnection(function(err, connection) {
            if (err) throw err; 

            
          // });

            // when done with connection, release it. 
            //connection.release(); 
           // if (error) throw error; 
        });
    },

    displayService: function (req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 

            //bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
            //password(req.body.inputPassword).hash(function (error, hash) {
            var sql = 'SELECT idUsers FROM Users WHERE email="' + req.body.email + '"';
            
            //use connection
            connection.query(sql, 
                function (error, result1, field) {
                    if (error) {
                        resultNotFound["errorMessage"] = "email ID already esists.";
                        resultNotFound["errorCode"] = 5;
                        console.log("Error Update");
                        return res.send(resultNotFound); 
                    } 
                   
                    else
                    {
                        var sql2 = 'SELECT * FROM FoodItem WHERE Users_idUsers=' + result1[0].idUsers;

                        connection.query(sql2, 
                            function (error, result2, field) {
                                if (error) {
                                    resultNotFound["errorMessage"] = "email ID already esists.";
                                    resultNotFound["errorCode"] = 5;
                                    console.log("Error Food Item Update"); 
                                    return res.send(resultNotFound); 
                                } 
                                else 
                                {
                                    resultFound.data = result2;
                                    return res.send(resultFound);
                                }
                            }
                            );
            

                    }
                }
                );
            }
            );
    }
}
       
    


