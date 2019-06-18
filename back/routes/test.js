var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const DB_NAME = 'verify_mail';

router.get('/',function(req, res) {

    var ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;
    console.log("client IP is *********************" + ip);

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("request_ip")
            .find({ip: '321'})
            .toArray(async function (err, data) {
                console.log('err----->', err);
                console.log('data---->', data);
            });

        db.close();
    });
    res.send('Connect failed ');
});

module.exports = router;
