const router = require('express').Router();

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
        // // userController.resizeUserPic,
        // userController.uploadUserPic,
        // userController.uploadUserPicLocallyFullSize,
        // userController.uploadUserPicLocallyResize,
        userController.uploadUserPicS3Resize,
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
            // userController.uploadUserPicLocallyFullSize,
            userController.uploadUserPicLocallyResize,
            userController.updateUser
        )
        // .patch(userController.updateUser)
        .delete(userController.deleteUser);

    router
        .route('/:role/:id')
        .get(userController.getRole)
        .patch(userController.updateRole)
        .delete(userController.deleteRole);

    return app;
};