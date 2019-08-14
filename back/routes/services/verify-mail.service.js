const fs = require('fs');
const express = require('express');
const crypto = require('crypto');
const userService = require('../userData');
const request = require('request-promise');

module.exports = {
    readMail: (filename) => {
       // fs.readFile('../../../../mailsDir/new/' + filename, 'utf8', (err, data) => {
       fs.readFile('../../../home/verify/Maildir/new' + filename, 'utf8', (err, data) => {
            if (err) throw err;
            verifyMail(data, filename);
        });
      setTimeout(()=> {
          // fs.unlinkSync('../../../../mailsDir/new/' + filename, (err) => {
          fs.unlinkSync('../../../home/verify/Maildir/new' + filename, (err) => {
              if(err) console.log(err);
          });
      }, 2000);

    },
};
verifyMail = (file, filename) => {
    let arr = file.split('\n');
    let body = {};
    arr.map(item => {
        if (item.indexOf(':')) {
            let tmp = item.split(':');
            if(tmp.length < 1) {
                body[tmp[0].toLowerCase()] = tmp[0].toLowerCase();
            } else {
                body[tmp[0].toLowerCase()] = tmp[1];
            }

        }
    });

    let time = new Date();
    let tmpSID = [
        crypto.createHash('sha256').update(body.from + '38VqDlrqjMMjPeMOlPfQ' + time.setHours(0,0,0,0)).digest('hex'),
        crypto.createHash('sha256').update(body.from + '38VqDlrqjMMjPeMOlPfQ' + time.setDate(time.getDate() - 1)).digest('hex'),
        crypto.createHash('sha256').update(body.from + '38VqDlrqjMMjPeMOlPfQ' + time.setDate(time.getDate() + 2)).digest('hex'),
    ];

    console.log(tmpSID);

    let ids = [];
    let SID = '';
    let message = '';
    let from = body.from.split('<')[1].split('>')[0];
    console.log(body);
    let data = {
        "_class" : "net.denstreet.models.MailData",
        "sid": body.sid,
        "emailFrom": "",
        "emailTo": from,
        "subject": body.subject,
        "date": time,
        "text": ""

    };
    // if(body.to.toString().replace(/[ ]/g, '') === 'verify@peerkey.com') {
        userService.getUserData(from, 'user').then((items) => {
            items.map(res => ids.push(res.token));
            if(body.hasOwnProperty('sid')) {
                SID = body.sid.toString().replace(/[ ]/g, '');
                if(tmpSID.indexOf(SID) !== -1){
                    message ="Verified, The email with Subject:" + body.subject + " is legitimate.";
                    // message ="Verified, The email with Subject:" + body.subject + " is legitimate. Tap for more info." + ids;
                    if(ids.length > 0) {
                        console.log('ids--------', ids);
                        sendPush(message, ids, 'Verify');
                        data.verify = true;
                        userService.save('mailData', data);

                    }

                } else {
                    message = "Not Verified" +  "The email with Subject:" + body.subject + " is NOT legitimate. Please discard the email.";
                    // message = "Not Verified" +  "The email with Subject:" + body.subject + " is NOT legitimate. Please discard the email. Tap for more info" + ids;
                    if(ids.length > 0) {
                        console.log('ids--------', ids);
                        sendPush(message, ids, 'Not Verify');
                        data.verify = false;
                        data.reasons = "[SID Is Fake]";
                        userService.save('mailData', data);
                    }

                }
            }
        }, (err) => {
            console.error('The promise was rejected', err, err.stack);
        });
    // }

};

sendPush = (message, ids, status) => {
    const URL = 'https://fcm.googleapis.com/fcm/send';
    const API_KEY = 'AIzaSyDjG-ovMTJ06PxgAJ0tAkke0LL0reKUuI4';
    if (!message) message = 'A representative sdf asd will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code';

    const headers = {
        'Content-type' : 'application/json',
        'Authorization': 'key=' + API_KEY
    };

// Configure the request
    const options = {
        url: URL,
        method: "POST",
        headers: headers,
        json:{
            data: {
                title: status,
                body: message,
            },
            registration_ids: ids,
            priority: "high",
        },
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {

        }
    })
};
