const router = require('express').Router();

const logger = require('../../loaders/logger')();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = function (app) {

    app.use('/users', router);

    router.get('/auth', authController.isAuth);

    router.post('/signup', authController.signUp);

    router.post('/signin', authController.signIn);

    router.post('/logout', authController.isAuth, authController.logOut);

    router
        .route('/')
        .get(
            authController.isAuth,
            authController.isPermitted('admin', 'educator'),
            userController.getAllUsers
        );

    router
        .route('/:id')
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser);

    return app;
};