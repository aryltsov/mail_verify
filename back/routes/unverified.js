var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var send = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const StringBuilder = require('node-stringbuilder');

const crypto = require('crypto');



router.post('/', jsonParser, function (req, res) {



    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sendFrom = 'anton@peerkey.com';
    var sendTo   = req.body.email;

    var stringBuild = new StringBuilder(sendTo);
    stringBuild.append('Test');
    // stringBuild.append('TestWrong123');
    stringBuild.append(new Date().setHours(0, 0, 0, 0));
    console.log(stringBuild);

    var SID = crypto.createHash('sha256').update(stringBuild.toString()).digest('hex');
    SID = SID.toString().toUpperCase();
    console.log(SID);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'peerkeytest@gmail.com',
            pass: 'mailpeervarify'
        }
    });

    var mailOptions = {
        from: sendFrom,
        to: sendTo,
        subject: 'Test',
        html: "<!doctype html>\n" +
            "<html>\n" +
            "<head>\n" +
            "    <meta name=\"viewport\" content=\"width=device-width\" />\n" +
            "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
            "    <title>Simple Transactional Email</title>\n" +
            "    <style>\n" +
            "        /* -------------------------------------\n" +
            "            GLOBAL RESETS\n" +
            "        ------------------------------------- */\n" +
            "        img {\n" +
            "            border: none;\n" +
            "            -ms-interpolation-mode: bicubic;\n" +
            "            max-width: 100%; }\n" +
            "        body {\n" +
            "            background-color: #f6f6f6;\n" +
            "            font-family: sans-serif;\n" +
            "            -webkit-font-smoothing: antialiased;\n" +
            "            font-size: 14px;\n" +
            "            line-height: 1.4;\n" +
            "            margin: 0;\n" +
            "            padding: 0;\n" +
            "            -ms-text-size-adjust: 100%;\n" +
            "            -webkit-text-size-adjust: 100%; }\n" +
            "        table {\n" +
            "            border-collapse: separate;\n" +
            "            mso-table-lspace: 0pt;\n" +
            "            mso-table-rspace: 0pt;\n" +
            "            width: 100%; }\n" +
            "        table td {\n" +
            "            font-family: sans-serif;\n" +
            "            font-size: 14px;\n" +
            "            vertical-align: top; }\n" +
            "        /* -------------------------------------\n" +
            "            BODY & CONTAINER\n" +
            "        ------------------------------------- */\n" +
            "        .body {\n" +
            "            background-color: #f6f6f6;\n" +
            "            width: 100%; }\n" +
            "        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */\n" +
            "        .container {\n" +
            "            display: block;\n" +
            "            Margin: 0 auto !important;\n" +
            "            /* makes it centered */\n" +
            "            max-width: 580px;\n" +
            "            padding: 10px;\n" +
            "            width: auto !important;\n" +
            "            width: 580px; }\n" +
            "        /* This should also be a block element, so that it will fill 100% of the .container */\n" +
            "        .content {\n" +
            "            box-sizing: border-box;\n" +
            "            display: block;\n" +
            "            Margin: 0 auto;\n" +
            "            max-width: 580px;\n" +
            "            padding: 10px; }\n" +
            "        /* -------------------------------------\n" +
            "            HEADER, FOOTER, MAIN\n" +
            "        ------------------------------------- */\n" +
            "        .main {\n" +
            "            background: #fff;\n" +
            "            border-radius: 3px;\n" +
            "            width: 100%; }\n" +
            "        .wrapper {\n" +
            "            box-sizing: border-box;\n" +
            "            padding: 20px; }\n" +
            "        .footer {\n" +
            "            clear: both;\n" +
            "            padding-top: 10px;\n" +
            "            text-align: center;\n" +
            "            width: 100%; }\n" +
            "        .footer td,\n" +
            "        .footer p,\n" +
            "        .footer span,\n" +
            "        .footer a {\n" +
            "            color: #999999;\n" +
            "            font-size: 12px;\n" +
            "            text-align: center; }\n" +
            "        /* -------------------------------------\n" +
            "            TYPOGRAPHY\n" +
            "        ------------------------------------- */\n" +
            "        h1,\n" +
            "        h2,\n" +
            "        h3,\n" +
            "        h4 {\n" +
            "            color: #000000;\n" +
            "            font-family: sans-serif;\n" +
            "            font-weight: 400;\n" +
            "            line-height: 1.4;\n" +
            "            margin: 0;\n" +
            "            Margin-bottom: 30px; }\n" +
            "        h1 {\n" +
            "            font-size: 35px;\n" +
            "            font-weight: 300;\n" +
            "            text-align: center;\n" +
            "            text-transform: capitalize; }\n" +
            "        p,\n" +
            "        ul,\n" +
            "        ol {\n" +
            "            font-family: sans-serif;\n" +
            "            font-size: 14px;\n" +
            "            font-weight: normal;\n" +
            "            margin: 0;\n" +
            "            Margin-bottom: 15px; }\n" +
            "        p li,\n" +
            "        ul li,\n" +
            "        ol li {\n" +
            "            list-style-position: inside;\n" +
            "            margin-left: 5px; }\n" +
            "        a {\n" +
            "            color: #3498db;\n" +
            "            text-decoration: underline; }\n" +
            "        /* -------------------------------------\n" +
            "            BUTTONS\n" +
            "        ------------------------------------- */\n" +
            "        .btn {\n" +
            "            box-sizing: border-box;\n" +
            "            width: 100%; }\n" +
            "        .btn > tbody > tr > td {\n" +
            "            padding-bottom: 15px; }\n" +
            "        .btn table {\n" +
            "            width: auto; }\n" +
            "        .btn table td {\n" +
            "            background-color: #ffffff;\n" +
            "            border-radius: 5px;\n" +
            "            text-align: center; }\n" +
            "        .btn a {\n" +
            "            background-color: #ffffff;\n" +
            "            border: solid 1px #3498db;\n" +
            "            border-radius: 5px;\n" +
            "            box-sizing: border-box;\n" +
            "            color: #3498db;\n" +
            "            cursor: pointer;\n" +
            "            display: inline-block;\n" +
            "            font-size: 14px;\n" +
            "            font-weight: bold;\n" +
            "            margin: 0;\n" +
            "            padding: 12px 25px;\n" +
            "            text-decoration: none;\n" +
            "            text-transform: capitalize; }\n" +
            "        .btn-primary table td {\n" +
            "            background-color: #3498db; }\n" +
            "        .btn-primary a {\n" +
            "            background-color: #3498db;\n" +
            "            border-color: #3498db;\n" +
            "            color: #ffffff; }\n" +
            "        /* -------------------------------------\n" +
            "            OTHER STYLES THAT MIGHT BE USEFUL\n" +
            "        ------------------------------------- */\n" +
            "        .last {\n" +
            "            margin-bottom: 0; }\n" +
            "        .first {\n" +
            "            margin-top: 0; }\n" +
            "        .align-center {\n" +
            "            text-align: center; }\n" +
            "        .align-right {\n" +
            "            text-align: right; }\n" +
            "        .align-left {\n" +
            "            text-align: left; }\n" +
            "        .clear {\n" +
            "            clear: both; }\n" +
            "        .mt0 {\n" +
            "            margin-top: 0; }\n" +
            "        .mb0 {\n" +
            "            margin-bottom: 0; }\n" +
            "        .preheader {\n" +
            "            color: transparent;\n" +
            "            display: none;\n" +
            "            height: 0;\n" +
            "            max-height: 0;\n" +
            "            max-width: 0;\n" +
            "            opacity: 0;\n" +
            "            overflow: hidden;\n" +
            "            mso-hide: all;\n" +
            "            visibility: hidden;\n" +
            "            width: 0; }\n" +
            "        .powered-by a {\n" +
            "            text-decoration: none; }\n" +
            "        hr {\n" +
            "            border: 0;\n" +
            "            border-bottom: 1px solid #f6f6f6;\n" +
            "            Margin: 20px 0; }\n" +
            "        /* -------------------------------------\n" +
            "            RESPONSIVE AND MOBILE FRIENDLY STYLES\n" +
            "        ------------------------------------- */\n" +
            "        @media only screen and (max-width: 620px) {\n" +
            "            table[class=body] h1 {\n" +
            "                font-size: 28px !important;\n" +
            "                margin-bottom: 10px !important; }\n" +
            "            table[class=body] p,\n" +
            "            table[class=body] ul,\n" +
            "            table[class=body] ol,\n" +
            "            table[class=body] td,\n" +
            "            table[class=body] span,\n" +
            "            table[class=body] a {\n" +
            "                font-size: 16px !important; }\n" +
            "            table[class=body] .wrapper,\n" +
            "            table[class=body] .article {\n" +
            "                padding: 10px !important; }\n" +
            "            table[class=body] .content {\n" +
            "                padding: 0 !important; }\n" +
            "            table[class=body] .container {\n" +
            "                padding: 0 !important;\n" +
            "                width: 100% !important; }\n" +
            "            table[class=body] .main {\n" +
            "                border-left-width: 0 !important;\n" +
            "                border-radius: 0 !important;\n" +
            "                border-right-width: 0 !important; }\n" +
            "            table[class=body] .btn table {\n" +
            "                width: 100% !important; }\n" +
            "            table[class=body] .btn a {\n" +
            "                width: 100% !important; }\n" +
            "            table[class=body] .img-responsive {\n" +
            "                height: auto !important;\n" +
            "                max-width: 100% !important;\n" +
            "                width: auto !important; }}\n" +
            "        /* -------------------------------------\n" +
            "            PRESERVE THESE STYLES IN THE HEAD\n" +
            "        ------------------------------------- */\n" +
            "        @media all {\n" +
            "            .ExternalClass {\n" +
            "                width: 100%; }\n" +
            "            .ExternalClass,\n" +
            "            .ExternalClass p,\n" +
            "            .ExternalClass span,\n" +
            "            .ExternalClass font,\n" +
            "            .ExternalClass td,\n" +
            "            .ExternalClass div {\n" +
            "                line-height: 100%; }\n" +
            "            .apple-link a {\n" +
            "                color: inherit !important;\n" +
            "                font-family: inherit !important;\n" +
            "                font-size: inherit !important;\n" +
            "                font-weight: inherit !important;\n" +
            "                line-height: inherit !important;\n" +
            "                text-decoration: none !important; }\n" +
            "            .btn-primary table td:hover {\n" +
            "                background-color: #34495e !important; }\n" +
            "            .btn-primary a:hover {\n" +
            "                background-color: #34495e !important;\n" +
            "                border-color: #34495e !important; } }\n" +
            "    </style>\n" +
            "</head>\n" +
            "<body class=\"\">\n" +
            "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">\n" +
            "    <tr>\n" +
            "        <td>&nbsp;</td>\n" +
            "        <td class=\"container\">\n" +
            "            <div class=\"content\">\n" +
            "                <img src=\"https://i.imgur.com/JP686Lo.png\">\n" +
            "\n" +
            "                <!-- START CENTERED WHITE CONTAINER -->\n" +
            //"                <span class=\"preheader\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
            "                <table class=\"main\">\n" +
            "\n" +
            "                    <!-- START MAIN CONTENT AREA -->\n" +
            "                    <tr>\n" +
            "                        <td class=\"wrapper\">\n" +
            "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                                <tr>\n" +
            "                                    <td>\n" +
            "                                        <p>Hi Sandra,</p>\n" +
            "                                        <p>We're writing to you regarding your bank account with ABC Bank. As you may be aware our privacy policy has been updated, please see our privacy policy attached. This will come into effect from 1st January 2017.</p>\n" +
            "                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\">\n" +
            "                                            <tbody>\n" +
            "                                            <tr>\n" +
            "                                                <td align=\"left\">\n" +
            "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                                                        <tbody>\n" +
            "                                                        <tr>\n" +
            "                                                            <td> <a href=\"http://google.com\" target=\"_blank\">Click to read Privacy Policy</a> </td>\n" +
            "                                                        </tr>\n" +
            "                                                        </tbody>\n" +
            "                                                    </table>\n" +
            "                                                </td>\n" +
            "                                            </tr>\n" +
            "                                            </tbody>\n" +
            "                                        </table>\n" +
            "                                        <p>If you have any questions please contact us on 1800 ABC BANK</p>\n" +
            "                                        <p>Thank you for banking with ABC Bank</p>\n" +
            "                                    </td>\n" +
            "                                </tr>\n" +
            "                            </table>\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "\n" +
            "                    <!-- END MAIN CONTENT AREA -->\n" +
            "                </table>\n" +
            "\n" +
            "                <!-- START FOOTER -->\n" +
            "                <div class=\"footer\">\n" +
            "                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                        <tr>\n" +
            "                            <td class=\"content-block\">\n" +
            "                                <span class=\"apple-link\">\n" +
            "ABC Bank will NEVER send an email which includes a link that redirects you to logon to Internet Banking or asks you to verify your account details, PIN, passwords or personal information.</span>\n" +
            "                               <br> <p>Copyright &copy; ABC Bank (ABN 11 000 000 000)</p>\n" +
            "\n" +
            "                                <br> <p> SID: " + SID + "</p>\n" +
            "                            </td>\n" +
            "                        </tr>\n" +
            "                        <tr>\n" +
            "                            <td class=\"content-block powered-by\">\n" +
            "                            </td>\n" +
            "                        </tr>\n" +
            "                    </table>\n" +
            "                </div>\n" +
            "\n" +
            "                <!-- END FOOTER -->\n" +
            "\n" +
            "                <!-- END CENTERED WHITE CONTAINER --></div>\n" +
            "        </td>\n" +
            "        <td>&nbsp;</td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "</body>\n" +
            "</html> "
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.messageId);
        }
    });
});




module.exports = router;
