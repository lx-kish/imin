const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const config = require('../../config');
const areaModel = require('../../db/models/areaModel');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');

const name = config.db_name;

const connection = services.get('connections')[name];
const areas = areaModel(connection);

module.exports = {

  createArea: factory.createOne(areas),

  getAllAreas: factory.getAll(areas),

  getArea: factory.getOne(areas),

  updateArea: factory.updateOne(areas),

  deleteArea: factory.deleteOne(areas),

  // getRole: (req, res, next) => {
  //     factory.getOne(connection.model(req.params.role))(req, res, next);
  // },

  // updateRole: (req, res, next) => {
  //     factory.updateOne(connection.model(req.params.role))(req, res, next);
  // },

  // deleteRole: (req, res, next) => {
  //     factory.deleteOne(connection.model(req.params.role))(req, res, next);
  // }
};