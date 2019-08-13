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

    getUsersByEmail(req.body.userEmail, 'user').then((items) => {
       res.send(items);
    }, (err) => {
        console.error('The promise was rejected', err, err.stack);
    });
});

getUsersByEmail = (email, collectionName) => {
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
                let collection = db.collection(collectionName);
                let opt = {'email': email};
                if(email === 'all') opt = {};
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
saveToBase = (collectionName, data) =>{

    MongoClient.connect(url, function (err, db) {

        let dbo = db.db('verify_mail');

        dbo.collection(collectionName).insertOne(data, (err, res) => {
            console.log('save');
        });
        db.close();
    });
};
module.exports = {
    router: router,
    getUserData: getUsersByEmail,
    save: saveToBase
};