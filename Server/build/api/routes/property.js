"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../middleware/auth");

var _multer = require("../../middleware/multer");

var _schemas = require("../../middleware/schemas");

var _cloudinaryConfig = require("../../config/cloudinaryConfig");

var _propertyControllers = _interopRequireDefault(require("../../controllers/propertyControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.get('/', _propertyControllers["default"].getAllProperty);
router.get('/:id', _propertyControllers["default"].getOneProperty);
router.post('/', _auth.authLoggedIn, _cloudinaryConfig.cloudinaryConfig, _multer.multerUploads, _schemas.propertyValidator, _propertyControllers["default"].createProperty);
router.patch('/:id', _auth.authLoggedIn, _cloudinaryConfig.cloudinaryConfig, _multer.multerUploads, _schemas.propertyValidator, _propertyControllers["default"].updateProperty);
router.patch('/:id/sold', _auth.authLoggedIn, _propertyControllers["default"].soldProperty);
router["delete"]('/:id', _auth.authLoggedIn, _propertyControllers["default"].deleteProperty);
var _default = router;
exports["default"] = _default;