var express = require('express');
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const DB_NAME = 'verify_mail';


router.get('/',function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("mailData").find({}).toArray(async function (err, data) {
            if (err) throw err;
            res.send(data);
            db.close();
            console.log('base close');
        });


    });
});

router.get('/get_sent_mail',function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("mailData").find({isSent: true}).toArray(async function (err, data) {
            if (err) throw err;
            res.send(data);
        });

        db.close();
    });
});


module.exports = router;
