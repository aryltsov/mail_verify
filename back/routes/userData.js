var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
let Promise = require('rsvp').Promise;

const url = "mongodb://localhost:27017/";

router.post('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    getUsersByEmail(req.body.userEmail).then((items) => {
       res.send(items);
    }, (err) => {
        console.error('The promise was rejected', err, err.stack);
    });
});

getUsersByEmail = (email) => {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    resolve(db.db('verify_mail'));
                }
            })
        }).then(function(db) {
            return new Promise(function(resolve, reject) {
                var collection = db.collection('user');
                const opt = {'email': email};
                collection.find(opt).toArray(function(err, items) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
        });
};
module.exports = {
    router: router,
    getUserData: getUsersByEmail
};