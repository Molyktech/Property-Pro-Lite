"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageUpload = exports.multerUploads = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _datauri = _interopRequireDefault(require("datauri"));

var _path = _interopRequireDefault(require("path"));

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var storage = _multer["default"].memoryStorage();

var multerUploads = (0, _multer["default"])({
  storage: storage
}).single('image');
exports.multerUploads = multerUploads;
var dUri = new _datauri["default"](); // converts the buffer to data url

var dataUri = function dataUri(req) {
  return dUri.format(_path["default"].extname(req.file.originalname).toString(), req.file.buffer);
};

var imageUpload = function imageUpload(req) {
  var file = dataUri(req).content;
  return _cloudinaryConfig.uploader.upload(file).then(function (result) {
    return result.url;
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.imageUpload = imageUpload;