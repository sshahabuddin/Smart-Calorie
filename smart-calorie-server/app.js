const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// ****** allow cross-origin requests code START ****** //

const allowedOrigins = process.env.allowedOrigins.split(',');

//app.use(cors()); //uncomment this to enable all CORS and delete cors(corsOptions) in below code

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobil apps or curl requests) 
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified origin'; 
            return callback(new Error(msg), false); 
        }
        return callback(null, true);
    }
}));

// app Routes
// create application/json parser 
const jsonParser = bodyParser.json();
// create application/x-wwww-form-urlencoded parser 
//const urlencodedParser = bodyParser.urlencoded({ extended: false})
app.post('/signUpService', jsonParser,function (req, res) {
    // do something
    //if (valFunctions.checkInputDataNULL(req,res)) return false;
    //if (valFunctions.checkInputDataQuality(req,res)) return false;
    //if (valFunctions.checkJWTToken(req,res)) return false;
    //if (valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    console.log("Hello 1.0");
    dbFunctions.signUpService(req,res);
});

app.post('/updateService', jsonParser,function (req, res) {
    // do something
    //if (valFunctions.checkInputDataNULL(req,res)) return false;
    //if (valFunctions.checkInputDataQuality(req,res)) return false;
    //if (valFunctions.checkJWTToken(req,res)) return false;
    //if (valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    console.log("Hello update");
    dbFunctions.updateService(req,res);
});

app.post('/displayService', jsonParser,function (req, res) {
    // do something
    //if (valFunctions.checkInputDataNULL(req,res)) return false;
    //if (valFunctions.checkInputDataQuality(req,res)) return false;
    //if (valFunctions.checkJWTToken(req,res)) return false;
    //if (valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    console.log("Hello display");
    dbFunctions.displayService(req,res);
});

app.use('/', (req,res) => res.send("Welocme GPS Mobile Tracker App"));
app.listen(process.env.PORT, () => console.log('PLS Server is ready on localhost:' + process.env.PORT));