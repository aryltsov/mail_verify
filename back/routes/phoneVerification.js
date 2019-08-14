const express = require('express');
const router = express.Router();
let Promise = require('rsvp').Promise;
const userData = require('./userData');

router.get('/',function(req, res,next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    userData.getUserData('all', 'phone_verification').then(item => res.send(item));

});

router.post('/verified', function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    userData.getUserData(req.body.email, 'phone_verification').then(item => {

        let verifiedCalls = {};
        let notVerifiedCalls = {};

        if(item.length <= 0) {
            res.send({
                title: 'Error',
                body: req.body.email + ' not found'
            });

        } else {
            item.map(ev => {
                let currentDate = new Date();
                let tmpTime = new Date(ev.date);
                let minutesLost = Math.ceil(Math.abs(tmpTime.getTime() - currentDate.getTime())) / 60000;

                if(minutesLost < 10){
                    verifiedCalls = ev;
                } else {
                    notVerifiedCalls = ev;
                }
            });
        }

        if(Object.keys(verifiedCalls).length === 0 && verifiedCalls.constructor === Object) {
            res.send({
                title: 'Phone verified',
                body: req.body.email + ' no calls'
            });
            notVerifiedCalls.verify = false;
            delete notVerifiedCalls._id;
            userData.save('calls', notVerifiedCalls);
        } else {
            res.send({
                title: 'Phone verified',
                body: 'A representative ' + verifiedCalls.email + ' will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code: ' + verifiedCalls.code
            });
            verifiedCalls.verify = true;
            delete verifiedCalls._id;
            userData.save('calls', verifiedCalls);
        }
    });
});

router.post('/save', function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    userData.save('phone_verification', req.body);
    res.send(req.body);
});

router.post('/phone', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let data = {
        '_id' : req.query.android_id,
        '_class' :  'net.denstreet.models.User',
        'email' : req.query.email,
        'token' : req.query.application_token
    };

    userData.save('user', data);
    res.send(data);

});
module.exports = {
    router: router
};

