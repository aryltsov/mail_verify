var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const DB_NAME = 'verify_mail';


router.post('/',function(req, res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let email = req.body.email;
    let password = req.body.password;

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("auth").find({email: email, pass: password}).toArray(async function (err, data) {
            console.log('err, data', err, data);
            if (err) throw err;
            res.send(data);
        });

        db.close();
    });

});

module.exports = router;
