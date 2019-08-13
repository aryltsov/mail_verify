const express = require('express');
const router = express.Router();
const userService = require('./userData');


router.get('/',function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

     userService.getUserData('all', 'mailData').then(items => {
         res.send(items);
     });
});

router.get('/get_sent_mail',function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    const filterOptions = {
        isSent: true
    };

    userService.getUserData('all', 'mailData', filterOptions).then(items => {
        res.send(items);
    })
});


module.exports = router;
