"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Util =
/*#__PURE__*/
function () {
  function Util() {
    (0, _classCallCheck2["default"])(this, Util);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
    this.error = null;
  }

  (0, _createClass2["default"])(Util, null, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'success';
    }
  }, {
    key: "setError",
    value: function setError(statusCode, error) {
      this.statusCode = statusCode;
      this.error = error;
      this.type = 'error';
    }
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        status: this.type,
        message: this.message,
        data: this.data
      };

      if (this.type === 'success') {
        return res.status(this.statusCode).json(result);
      }

      return res.status(this.statusCode).json({
        status: this.type,
        error: this.error
      });
    }
  }]);
  return Util;
}();

exports["default"] = Util;