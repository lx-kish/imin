const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb://localhost:27017/AuthApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
const { authenticate } = require('./middleware/authenticate');

//MODEL
const { User } = require('./models/user');

//ROUTES
app.post('/api/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, doc) => {
        if (err) res.status(400).send(err);
        res.status(200).send(doc);
    })
});

app.post('/api/signin', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {

        if (!user) return res.json({ message: `Email ${req.body.email} hasn't registered in the database` });

        user.comparePassword(req.body.password,(err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message: 'Wrong password provided!'
            })

            user.generateToken((err, user) => {
                if(err) return res.status(400).json({
                    message: `Error ${err} occured while logging in.`
                });
                res.cookie('auth', user.token).send('ok');
            });
        });
    });
});

app.get('/api/student', authenticate,  (req, res) => {
    res.send(req.user);
});

app.get('/api/logout', authenticate, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err)         return res.status(400).send({
            message: `Error ${err} occured while logging out`
        });
        res.status(200).send('ok');
    });
});

const port = process.env.PORT || 3010
app.listen(port, () => {
    console.log(`Started at port ${port}`);
})