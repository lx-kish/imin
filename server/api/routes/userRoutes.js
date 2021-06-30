const router = require('express').Router();

const uploadImage = require('../../utils/uploadImage');

const logger = require('../../loaders/logger')();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = function (app) {

    app.use('/users', router);

    // router
    //     .route('/auth')
    //     .get(
    //         authController.isAuth,
    //         userController.getMe,
    //         userController.getUser
    //     );

    router.post('/signup', authController.signUp);

    router.post('/signin', authController.signIn);

    // Protects all routes below this middleware
    router.use(authController.isAuth);

    
    router
        .route('/auth')
        .get(
            userController.getMe,
            userController.getUser
        );

    router.post('/logout', authController.logOut);

    router
        .route('/')
        .get(
            authController.isPermitted('admin', 'educator'),
            userController.getAllUsers
        );

    router
        .route('/:id')
        .get(userController.getUser)
        .patch(uploadImage('userpic'), userController.updateUser)
        // .patch(userController.updateUser)
        .delete(userController.deleteUser);

    router
        .route('/:role/:id')
        .get(userController.getRole)
        .patch(userController.updateRole)
        .delete(userController.deleteRole);

    // router.post('/logout', authController.isAuth, authController.logOut);

    // router
    //     .route('/')
    //     .get(
    //         authController.isAuth,
    //         authController.isPermitted('admin', 'educator'),
    //         userController.getAllUsers
    //     );

    // router
    //     .route('/:id')
    //     .get(authController.isAuth, userController.getUser)
    //     .patch(authController.isAuth, userController.updateUser)
    //     .delete(authController.isAuth, userController.deleteUser);

    // router
    //     .route('/:role/:id')
    //     .get(authController.isAuth, userController.getRole)
    //     .patch(authController.isAuth, userController.updateRole)
    //     .delete(authController.isAuth, userController.deleteRole);

    return app;
};