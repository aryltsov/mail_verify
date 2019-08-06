const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://127.0.0.1:27017/";
const DB_NAME = 'verify_mail';

router.get('/',function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
     MongoClient.connect(URL,  function (err, db) {
         console.log(err);
         console.log(db);

         if (err) throw err;
         let dbo = db.db(DB_NAME);

         dbo.collection("mailData").find({}).toArray(async function (err, data) {
             if (err) throw err;
             res.send(data);
             db.close();
             console.log('base close');
         });


     });
    // const server = tunnel(config, function (error, server) {
    //     if(error){
    //         console.log(error);
    //     }
    //    // console.log(error, server)
    //
    //     mongoose.connect('mongodb://localhost:27000/verify_mail');
    //     var db = mongoose.connection;
    //     db.once('open', function() {
    //
    //         console.log("database connection established");
    //
    //         var users = db.collection('mailData');
    //         users.find({}).toArray(function(err,data){
    //             res.send(data);
    //             db.close();
    //         })
    //     });
    //
    // });



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
