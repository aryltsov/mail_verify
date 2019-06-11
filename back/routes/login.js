var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const DB_NAME = 'verify_mail';


let banController = function (ip, res) {

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("request_ip")
            .find({ip: ip})
            .toArray(async function (err, data) {
                if (data && data.length) {
                    let wrong_pass = parseInt(data[0].wrong_pass) || 0;
                    let banned_to = data[0].banned_to || '';
                    wrong_pass++;

                    if (wrong_pass === 3) {
                        banned_to = new Date().getTime() + 1000 * 60 * 5;
                        banned_to = new Date(banned_to);
                        console.log('new ban');
                    }

                    const update = {'ip': ip, 'banned_to': banned_to, wrong_pass: wrong_pass};
                    dbo.collection("request_ip").update({ip: ip}, update);
                    res.send({wrong_pass: update});
                } else {
                    let wrong_pass = 1;
                    let banned_to = '';

                    const update = {'ip': ip, 'banned_to': banned_to, wrong_pass: wrong_pass};
                    dbo.collection("request_ip").insert(update);
                    res.send({wrong_pass: update});
                }
            });
    });
};

let isBaned = function (ip, res, email, password) {

    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("request_ip")
            .find({ip: ip})
            .toArray(function (err, data) {

                if (data && data.length) {
                    let banned_to = data[0].banned_to;
                    let wrong_pass = parseInt(data[0].wrong_pass) || 0;

                    if (banned_to !== '') {
                        const diffTime = new Date().getTime() - new Date(banned_to).getTime();

                        if (diffTime <= 0) {
                            res.send({wrong_pass: {'banned_to': banned_to, wrong_pass: wrong_pass}});
                            return true;
                        } else {
                            const update = {'ip': ip, 'banned_to': '', wrong_pass: 0};
                            dbo.collection("request_ip").update({ip: ip}, update);

                            login(ip, res, email, password);
                        }

                    } else {
                        login(ip, res, email, password);
                    }
                } else {
                    login(ip, res, email, password);
                }
            });
    });
};

let login = function (ip, res, email, password) {
    MongoClient.connect(URL, function (err, db) {

        if (err) throw err;
        let dbo = db.db(DB_NAME);

        dbo.collection("auth").find({email: email}).toArray(async function (err, data) {
            if (data[0].pass === password) {
                res.send(data);
            } else {
                banController(ip, res);
            }
            if (err) throw err;

        });

        db.close();
    });
};

router.post('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let email = req.body.email;
    let password = req.body.password;


    var ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;

    isBaned(ip, res, email, password);
});

module.exports = router;
