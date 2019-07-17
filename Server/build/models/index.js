"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConnection = _interopRequireDefault(require("../database/dbConnection"));

var _default = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   * method with parameters text - query text and params - values required by text
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      _dbConnection["default"].query(text, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;