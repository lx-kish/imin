const router = require('express').Router();

const logger = require('../../loaders/logger')();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
/**
 * authController:
 * sign up
 * sign in
 * log out
 * forgot password
 * reset password
 * 
 * userController:
 * 
 */
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
    router.get('/logout', authController.logOut);

    // Protects all routes below this middleware
    router.use(authController.isAuth);

    /**
     * The route is used for checking if the user is authenticated,
     * and provides the client with authenticated user's data
     */
    router.get(
        '/auth',
        userController.getMe,
        userController.getUser
    );

    router.patch(
        '/updateMe',
        userController.processUserPic,
        // userController.resizeUserPic,
        userController.uploadUserPic,
        userController.updateMe
    );

    router
        .route('/')
        .get(
            authController.isPermitted('admin', 'educator'),
            userController.getAllUsers
        );

    router
        .route('/:id')
        .get(userController.getUser)
        .patch(
            userController.processUserPic,
            // userController.resizeUserPic,
            userController.uploadUserPic,
            userController.updateUser
        )
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