var express = require('express');
var router = express.Router();

// Requires official Node.js MongoDB Driver 3.0.0+
var mongodb = require("mongodb");

var client = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    client.connect(url, function (err, client) {

        var db = client.db("verify_mail");
        var collection = db.collection("user");

        var query = {
            "_id": req.body.id
        };

        var cursor = collection.find(query);

        cursor.forEach(
            function(doc) {
                res.send(doc);
                console.log(doc);
            },
            function(err) {
                client.close();
            }
        );

    });
});

module.exports = router;