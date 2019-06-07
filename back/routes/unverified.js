var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var send = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/', jsonParser, function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sendTo = req.body.email;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'peerkeytest@gmail.com',
            pass: 'mailpeervarify'
        }
    });

    var mailOptions = {
        from: 'anton@peerkey.com',
        to: sendTo,
        subject: '',
        text: 'That was easy!',
        html:  "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">" +
            "<tr>" +
            "<td>1</td>"+
            "<td>2</td>"+
            "<td>3</td>"+
            "<td>4</td>"+
            "</tr>"+
            "<tr>" +
            "<td>1</td>"+
            "<td>2</td>"+
            "<td>3</td>"+
            "<td>4</td>"+
            "</tr>"+
            "wrwer</table>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});





module.exports = router;
