const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const verify  = require('./routes/services/verify-mail.service');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mailsRouter = require('./routes/mails');
const loginRouter = require('./routes/login');
const verifiedRouter = require('./routes/verified_email');
const unverifiedRouter = require('./routes/unverified');
const userData = require('./routes/userData').router;
const sidService = require('./routes/services/sid.service');
const phoneVerification = require('./routes/phoneVerification').router;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/get_users', usersRouter);
app.use('/login', loginRouter);
app.use('/get_mails', mailsRouter);
app.use('/send_verified', verifiedRouter);
app.use('/send_unverified', unverifiedRouter);
app.use('/user_data', userData);
app.use('/sid', sidService);
app.use('/phoneVerification', phoneVerification);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// fs.watch('../../../../mailsDir/new', (eventType, filename) => {
fs.watch('../../../home/verify/Maildir/new', (eventType, filename) => {

    // if(fs.existsSync('../../../../mailsDir/new/' + filename)) {
    if(fs.existsSync('../../../home/verify/Maildir/new' + filename)) {
        verify.readMail(filename);
    }

});
module.exports = app;
