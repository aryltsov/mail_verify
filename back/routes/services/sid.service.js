const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/generate', function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    const str = req.body.to + req.body.title + req.body.time.setHours(0,0,0,0);

    res.send(generateSID(str));
});
router.post('/verify', function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    const str = req.body.to + req.body.title + req.body.time.setHours(0,0,0,0);

    const SID = generateSID(str);

    if(SID === req.body.sid) {
        res.send('SID is verified');
    } else {
        res.send('SID in unverified');
    }

});

function generateSID(str) {
    return  crypto.createHash('sha256').update(str).digest('hex');
}

module.exports = router;
