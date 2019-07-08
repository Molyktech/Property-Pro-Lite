"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propertyDb = _interopRequireDefault(require("../models/db/propertyDb"));

var _multer = require("../middleware/multer");

var _helpers = require("../middleware/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Property =
/*#__PURE__*/
function () {
  function Property() {
    _classCallCheck(this, Property);
  }

  _createClass(Property, [{
    key: "getAllProperty",
    value: function getAllProperty(req, res) {
      if (req.query.type) {
        var filteredProperty = _propertyDb["default"].filter(function (property) {
          return property.type.includes("".concat(req.query.type));
        });

        return res.status(200).json({
          status: 'success',
          data: filteredProperty
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: _propertyDb["default"]
      });
    }
  }, {
    key: "getOneProperty",
    value: function getOneProperty(req, res) {
      var id = parseInt(req.params.id, 10);

      var foundProperty = _propertyDb["default"].find(function (property) {
        return property.id === id;
      });

      if (foundProperty) {
        return res.status(200).json({
          status: 'Success',
          data: foundProperty
        });
      }

      return res.status(404).json({
        status: 'Error',
        error: 'Property does not exist'
      });
    }
  }, {
    key: "createProperty",
    value: function () {
      var _createProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var imageUrl, fileUrl, newProperty, filterdb;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.file) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return (0, _multer.imageUpload)(req);

              case 3:
                fileUrl = _context.sent;

                if (fileUrl) {
                  imageUrl = fileUrl;
                } else {
                  imageUrl = 'https://via.placeholder.com/250/92c952';
                }

              case 5:
                newProperty = {
                  id: _propertyDb["default"].length + 1,
                  owner: req.user.id,
                  status: req.body.status || 'available',
                  state: req.body.state,
                  price: req.body.price,
                  city: req.body.city,
                  address: req.body.address,
                  type: req.body.type,
                  created_on: (0, _helpers.newDate)(),
                  reason: req.body.reason,
                  description: req.body.description,
                  image_url: imageUrl,
                  owner_email: req.user.email,
                  owner_phone_number: req.user.phone_number
                };
                filterdb = _propertyDb["default"].find(function (property) {
                  return property.address === req.body.address;
                });

                if (filterdb) {
                  _context.next = 10;
                  break;
                }

                _propertyDb["default"].push(newProperty);

                return _context.abrupt("return", res.status(201).json({
                  status: 'Success',
                  data: newProperty
                }));

              case 10:
                res.status(409).json({
                  status: 'Error',
                  error: 'a property advert has already been created with this address'
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createProperty(_x, _x2) {
        return _createProperty.apply(this, arguments);
      }

      return createProperty;
    }()
  }, {
    key: "updateProperty",
    value: function () {
      var _updateProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var imageUrl, fileUrl, id, foundProperty, propertyIndex, updatedProperty;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.file) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return (0, _multer.imageUpload)(req);

              case 3:
                fileUrl = _context2.sent;

                if (fileUrl) {
                  imageUrl = fileUrl;
                } else {
                  imageUrl = 'https://via.placeholder.com/250/92c952';
                }

              case 5:
                id = parseInt(req.params.id, 10);

                _propertyDb["default"].map(function (property, index) {
                  if (property.id === id) {
                    foundProperty = property;
                    propertyIndex = index;
                  }
                });

                if (foundProperty) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 'Error',
                  error: 'Property not found'
                }));

              case 9:
                updatedProperty = {
                  id: foundProperty.id,
                  owner: req.user.id || foundProperty.owner,
                  status: req.body.status || foundProperty.status,
                  state: req.body.state || foundProperty.state,
                  price: req.body.price || foundProperty.price,
                  city: req.body.city || foundProperty.city,
                  address: req.body.address || foundProperty.address,
                  type: req.body.type || foundProperty.type,
                  created_on: req.body.created_on || foundProperty.created_on,
                  reason: req.body.reason || foundProperty.reason,
                  description: req.body.description || foundProperty.description,
                  image_url: imageUrl || foundProperty.image_url,
                  owner_email: req.user.email || foundProperty.owner_email,
                  owner_phone_number: req.user.phone_number || foundProperty.owner_phone_number
                };

                _propertyDb["default"].splice(propertyIndex, 1, updatedProperty);

                return _context2.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: updatedProperty
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateProperty(_x3, _x4) {
        return _updateProperty.apply(this, arguments);
      }

      return updateProperty;
    }()
  }, {
    key: "soldProperty",
    value: function soldProperty(req, res) {
      var id = parseInt(req.params.id, 10);
      var foundProperty;
      var propertyIndex;

      _propertyDb["default"].map(function (property, index) {
        if (property.id === id) {
          foundProperty = property;
          propertyIndex = index;
        }
      });

      if (!foundProperty) {
        return res.status(404).json({
          status: 'error',
          data: {
            message: 'property not found'
          }
        });
      }

      var updatedProperty = {
        id: foundProperty.id,
        owner: foundProperty.owner,
        status: 'sold',
        state: foundProperty.state,
        price: foundProperty.price,
        city: foundProperty.city,
        address: foundProperty.address,
        type: foundProperty.type,
        created_on: foundProperty.created_on,
        reason: foundProperty.reason,
        description: foundProperty.description,
        owner_email: foundProperty.owner_email,
        owner_phone_number: foundProperty.owner_phone_number,
        image_url: foundProperty.image_url
      };

      _propertyDb["default"].splice(propertyIndex, 1, updatedProperty);

      return res.status(201).json({
        status: 'success',
        data: updatedProperty
      });
    }
  }, {
    key: "deleteProperty",
    value: function deleteProperty(req, res) {
      var id = parseInt(req.params.id, 10);

      _propertyDb["default"].map(function (property, index) {
        if (property.id === id) {
          _propertyDb["default"].splice(index, 1);

          return res.status(200).json({
            status: 'Success',
            data: {
              message: 'Property deleted'
            }
          });
        }
      });

      return res.status(404).json({
        status: 'Error',
        error: 'Property not found'
      });
    }
  }]);

  return Property;
}();

var propertyController = new Property();
var _default = propertyController;
exports["default"] = _default;