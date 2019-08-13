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
        const currentDate = new Date();
        let tempData = item.map(ev => {
            let tmpTime = new Date(new Date(ev.date).setMinutes(40));
            let minutesLost = Math.ceil(Math.abs(tmpTime.getTime() - currentDate.getTime())) / 60000;
            if(minutesLost < 10) {
                return  ev;
            }
        });
        if(tempData) {
            res.send({
                title: 'Phone verified',
                body: 'A representative ' + tempData.email + ' will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code: ' + tempData.code
            })
        } else {
            res.send({
                title: 'Phone verified',
                body: 'false'
            })
        }

    });
});

router.post('/save', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    userData.save('phone_verification',req.body).then(item => {
        res.send(item);
    });
});

router.post('/phone', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let data = {
        '_id' : req.query.id,
        '_class' :  'net.denstreet.models.User',
        'email' : req.query.email,
        'token' : req.query.token
    };

    userData.save('user', data).then(item => {
        res.send(data);
    });
});
module.exports = {
    router: router
};
