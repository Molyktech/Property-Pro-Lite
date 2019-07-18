"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multer = require("../middleware/multer");

var _index = _interopRequireDefault(require("../models/index"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

/* eslint-disable class-methods-use-this */
_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

var Property =
/*#__PURE__*/
function () {
  function Property() {
    (0, _classCallCheck2["default"])(this, Property);
  }

  (0, _createClass2["default"])(Property, [{
    key: "createProperty",
    value: function () {
      var _createProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var imageUrl, fileUrl, _req$body, price, state, city, address, type, createQuery, values, _ref, rows, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                imageUrl = "https://via.placeholder.com/250/92c952";

                if (!req.file) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return (0, _multer.imageUpload)(req);

              case 5:
                fileUrl = _context.sent;

                if (fileUrl) {
                  imageUrl = fileUrl;
                } else {
                  imageUrl = "https://via.placeholder.com/250/92c952";
                }

              case 7:
                _req$body = req.body, price = _req$body.price, state = _req$body.state, city = _req$body.city, address = _req$body.address, type = _req$body.type;
                createQuery = "INSERT INTO Properties( price, state, city, address, type, image_url, owner)\n    VALUES( $1, $2, $3, $4, $5, $6, $7)  returning *";
                values = [price, state, city, address, type, imageUrl, req.user.id];
                _context.next = 12;
                return _index["default"].query(createQuery, values);

              case 12:
                _ref = _context.sent;
                rows = _ref.rows;

                if (!rows) {
                  _context.next = 18;
                  break;
                }

                data = (0, _objectSpread2["default"])({}, rows[0]);

                _Utils["default"].setSuccess(201, "Property created succesfully", data);

                return _context.abrupt("return", _Utils["default"].send(res));

              case 18:
                _Utils["default"].setError(400, "failed");

                return _context.abrupt("return", _Utils["default"].send(res));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);

                _Utils["default"].setError(500, _context.t0.message);

                return _context.abrupt("return", _Utils["default"].send(res));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function createProperty(_x, _x2) {
        return _createProperty.apply(this, arguments);
      }

      return createProperty;
    }()
  }, {
    key: "getAllProperty",
    value: function () {
      var _getAllProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var type, query, _ref2, _rows, data, adminQuery, _ref3, rows, rowCount;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                type = req.query.type;
                _context2.prev = 1;

                if (!req.query.type) {
                  _context2.next = 17;
                  break;
                }

                query = "SELECT p.id, p.status, p.type, p.state, p.city, p.address, p.owner, p.price, p.created_on, p.image_url, u.email AS owner_email, u.phone_number AS owner_phone_number FROM Properties AS p\n    JOIN Users AS u ON u.id=p.owner WHERE type = $1";
                _context2.next = 6;
                return _index["default"].query(query, [type]);

              case 6:
                _ref2 = _context2.sent;
                _rows = _ref2.rows;
                data = (0, _objectSpread2["default"])({}, _rows);
                console.log(data);

                if (!_rows.length) {
                  _context2.next = 15;
                  break;
                }

                _Utils["default"].setSuccess(200, 'success', data);

                return _context2.abrupt("return", _Utils["default"].send(res));

              case 15:
                _Utils["default"].setError(404, 'No property available');

                return _context2.abrupt("return", _Utils["default"].send(res));

              case 17:
                adminQuery = "SELECT p.id, p.status, p.type, p.state, p.city, p.address, p.owner, p.price, p.created_on, p.image_url, u.email AS owner_email, u.phone_number AS owner_phone_number FROM Properties AS p\n        JOIN Users AS u ON u.id=p.owner";
                _context2.next = 20;
                return _index["default"].query(adminQuery);

              case 20:
                _ref3 = _context2.sent;
                rows = _ref3.rows;
                rowCount = _ref3.rowCount;

                if (!(rowCount < 1)) {
                  _context2.next = 26;
                  break;
                }

                _Utils["default"].setError(404, 'No property available');

                return _context2.abrupt("return", _Utils["default"].send(res));

              case 26:
                _Utils["default"].setSuccess(200, 'success', rows);

                return _context2.abrupt("return", _Utils["default"].send(res));

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2["catch"](1);

                _Utils["default"].setError(500, _context2.t0.message);

                return _context2.abrupt("return", _Utils["default"].send(res));

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 30]]);
      }));

      function getAllProperty(_x3, _x4) {
        return _getAllProperty.apply(this, arguments);
      }

      return getAllProperty;
    }()
  }, {
    key: "getOneProperty",
    value: function () {
      var _getOneProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var id, userQuery, userResult, propertyQuery, propertyResult, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                userQuery = "SELECT email as ownerEmail, phone_number as ownerPhoneNumber FROM Users where id = $1";
                _context3.next = 5;
                return _index["default"].query(userQuery, [req.user.id]);

              case 5:
                userResult = _context3.sent;
                propertyQuery = "SELECT * FROM Properties where id = $1";
                _context3.next = 9;
                return _index["default"].query(propertyQuery, [id]);

              case 9:
                propertyResult = _context3.sent;

                if (!(propertyResult.rowCount < 1)) {
                  _context3.next = 13;
                  break;
                }

                _Utils["default"].setError(404, 'Property not found');

                return _context3.abrupt("return", _Utils["default"].send(res));

              case 13:
                data = (0, _objectSpread2["default"])({}, propertyResult.rows[0], userResult.rows[0]);

                _Utils["default"].setSuccess(200, "Found Property with an id of ".concat(req.params.id), data);

                return _context3.abrupt("return", _Utils["default"].send(res));

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](0);

                _Utils["default"].setError(500, _context3.t0.message);

                return _context3.abrupt("return", _Utils["default"].send(res));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 18]]);
      }));

      function getOneProperty(_x5, _x6) {
        return _getOneProperty.apply(this, arguments);
      }

      return getOneProperty;
    }()
  }, {
    key: "updateProperty",
    value: function () {
      var _updateProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var _req$body2, state, city, address, type, price, id, imageUrl, fileUrl, findOneQuery, updateOneQuery, _ref4, rows, values, response;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, state = _req$body2.state, city = _req$body2.city, address = _req$body2.address, type = _req$body2.type, price = _req$body2.price;
                id = parseInt(req.params.id);

                if (!req.file) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 5;
                return (0, _multer.imageUpload)(req);

              case 5:
                fileUrl = _context4.sent;

                if (fileUrl) {
                  imageUrl = fileUrl;
                } else {
                  imageUrl = "https://via.placeholder.com/250/92c952";
                }

              case 7:
                findOneQuery = "SELECT * FROM Properties WHERE id = $1 AND owner = $2";
                updateOneQuery = "UPDATE Properties SET state = $1, price = $2, address = $3, city = $4, type = $5, image_url = $6 WHERE id = $7 AND owner = $8 returning *";
                _context4.prev = 9;
                _context4.next = 12;
                return _index["default"].query(findOneQuery, [parseInt(req.params.id), req.user.id]);

              case 12:
                _ref4 = _context4.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context4.next = 17;
                  break;
                }

                _Utils["default"].setError(404, "Property not found, input a correct id and try again");

                return _context4.abrupt("return", _Utils["default"].send(res));

              case 17:
                values = [state || rows[0].state, price || rows[0].price, address || rows[0].address, city || rows[0].city, type || rows[0].type, imageUrl || rows[0].image_url, id, req.user.id];
                _context4.next = 20;
                return _index["default"].query(updateOneQuery, values);

              case 20:
                response = _context4.sent;

                _Utils["default"].setSuccess(200, "Update Successful", response.rows[0]);

                return _context4.abrupt("return", _Utils["default"].send(res));

              case 25:
                _context4.prev = 25;
                _context4.t0 = _context4["catch"](9);

                _Utils["default"].setError(500, _context4.t0.message);

                return _context4.abrupt("return", _Utils["default"].send(res));

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[9, 25]]);
      }));

      function updateProperty(_x7, _x8) {
        return _updateProperty.apply(this, arguments);
      }

      return updateProperty;
    }()
  }, {
    key: "soldProperty",
    value: function () {
      var _soldProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var id, findOneQuery, updateOneQuery, _ref5, rows, values, response;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = parseInt(req.params.id);
                findOneQuery = "SELECT * FROM Properties WHERE id = $1 AND owner = $2";
                updateOneQuery = "UPDATE Properties SET status = $1 WHERE id = $2 AND owner = $3 returning *";
                _context5.prev = 3;
                _context5.next = 6;
                return _index["default"].query(findOneQuery, [id, req.user.id]);

              case 6:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 11;
                  break;
                }

                _Utils["default"].setError(404, "Property not found, input a correct id and try again");

                return _context5.abrupt("return", _Utils["default"].send(res));

              case 11:
                values = ["sold", id, req.user.id];
                _context5.next = 14;
                return _index["default"].query(updateOneQuery, values);

              case 14:
                response = _context5.sent;

                _Utils["default"].setSuccess(200, "Status update Successful", response.rows[0]);

                return _context5.abrupt("return", _Utils["default"].send(res));

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5["catch"](3);

                _Utils["default"].setError(500, _context5.t0.message);

                return _context5.abrupt("return", _Utils["default"].send(res));

              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 19]]);
      }));

      function soldProperty(_x9, _x10) {
        return _soldProperty.apply(this, arguments);
      }

      return soldProperty;
    }()
  }, {
    key: "deleteProperty",
    value: function () {
      var _deleteProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var id, deleteQuery, _ref6, rows;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = parseInt(req.params.id);
                deleteQuery = "DELETE FROM Properties WHERE id = $1 AND owner = $2 returning *";
                _context6.prev = 2;
                _context6.next = 5;
                return _index["default"].query(deleteQuery, [id, req.user.id]);

              case 5:
                _ref6 = _context6.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context6.next = 10;
                  break;
                }

                _Utils["default"].setError(404, "Property not found");

                return _context6.abrupt("return", _Utils["default"].send(res));

              case 10:
                _Utils["default"].setSuccess(200, "Property DELETED");

                return _context6.abrupt("return", _Utils["default"].send(res));

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](2);

                _Utils["default"].setError(500, _context6.t0.message);

                return _context6.abrupt("return", _Utils["default"].send(res));

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 14]]);
      }));

      function deleteProperty(_x11, _x12) {
        return _deleteProperty.apply(this, arguments);
      }

      return deleteProperty;
    }()
  }]);
  return Property;
}();

var propertyController = new Property();
var _default = propertyController;
exports["default"] = _default;