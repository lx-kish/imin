const { Router } = require('express');
const logger = require('../../loaders/logger')();
const isAuth = require('../middleware/isAuth');
const Logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const model = require('../../db/models/userModel');
const config = require('../../config');

const dbName = config.database_name;
const connection = services.get('connections')[dbName];
const userModel = model(connection);

const route = Router();

module.exports = (app) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        async (req, res, next) => {
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
            try {

                const user = new userModel({
                    email: req.body.email,
                    password: req.body.password
                });

                user.save((err, user) => {
                    if (err) {
                        Logger.error(`${err} occured while saving`);
                        res.status(400).send(err);
                    } else {
                        Logger.info(`User ${user._id} has been successfully saved into the db ${dbName}`);
                        res.status(200).json({ post: true, userId: user._id });
                    }
                });

                // user.save((err, doc) => {
                //     if (err) res.status(400).send(err);
                //     res.status(200).send(doc);
                // })

                // return next();
            } catch (e) {
                Logger.error('🔥 Error attaching user to req: %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/signin',
        async (req, res, next) => {


            //   const logger = Container.get('logger');
            logger.debug('Calling Sign-In endpoint with body: %o', req.body)
            try {
                const { email, password } = req.body;

                userModel.findOne({ email: email }, (err, user) => {
                    
                    if (!user) return res.json({ 
                        message: `Email ${email} hasn't registered in the database` 
                    });

                    user.comparePassword(password, (err, isMatch) => {
                        if (err) throw err;
                        if (!isMatch) return res.status(400).json({
                            message: 'Wrong password provided!'
                        });

                        user.generateToken((err, user) => {
                            if (err) return res.status(400).json({
                                message: `Error ${err} occured while logging in.`
                            });
                            res.cookie('auth', user.token).send('ok');
                        });
                    });
                });
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    route.post('/logout', isAuth, (req, res, next) => {
        // const logger = Container.get('logger');
        logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
        try {
            //@TODO AuthService.Logout(req.user) do some clever stuff
            return res.status(200).end();
        } catch (e) {
            logger.error('🔥 error %o', e);
            return next(e);
        }
    });

    return app;
};
