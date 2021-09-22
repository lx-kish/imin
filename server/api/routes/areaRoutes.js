const router = require('express').Router();

const authController = require('../controllers/authController');
const areaController = require('../controllers/areaController');

// const route = Router();

module.exports = async (app) => {

    app.use('/areas', router);

    router.use(authController.isAuth);

    router
        .route('/')
        .get(areaController.getAllAreas)
        .post(
            authController.isPermitted('admin'),
            areaController.createArea
        );

    router
        .route('/:id')
        .get(areaController.getArea)
        .patch(
            authController.isPermitted('admin'),
            areaController.updateArea
        )
        .delete(
            authController.isPermitted('admin'),
            areaController.deleteArea
        );

    return app;
};