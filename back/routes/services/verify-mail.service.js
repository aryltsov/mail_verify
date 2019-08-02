const fs = require('fs');
const express = require('express');
module.exports = {
    readMail: (filename) => {
       fs.readFile('../../../../mailsDir/new/' + filename, 'utf8', (err, data) => {
            if (err) throw err;
           // this.verify(data.toLocaleString());
        });
    },
    verify: (file) => {
        // console.log(file);
    }
};