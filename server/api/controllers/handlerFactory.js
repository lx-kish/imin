const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
// const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError(`No document found with id ${req.params.id}`, 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    console.log(
        '%c handlerFactory.updateOne, req.file, req.body ===> ',
        'color: yellowgreen; font-weight: bold;',
        req.params.id,
        req.body,
        req.fields,
        req.file,
        req.userpic
    );
    // console.log(req.file);
    // console.log(__dirname);
    // console.log(__filename);
    // console.log(process.cwd());
    // console.log(process.argv[1]);
    // console.log(req.params);
    // console.log(req.body);
    // console.log(req.user);

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError(`No document found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        return next(new AppError(`No document found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: doc
        // data: {
        //     data: doc
        // }
    })
});

exports.getAll = Model => catchAsync(async (req, res, next) => {

    // To allow for nested GET reviews on tour
    // let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    // const features = new APIFeatures(Model.find(filter), req.query)
    //     .filter()
    //     .sort()
    //     .limit()
    //     .paginate();

    // const doc = await features.query.explain();
    // const doc = await features.query;

    const doc = await Model.find();

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});