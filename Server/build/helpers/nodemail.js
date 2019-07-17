"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var transporter = _nodemailer["default"].createTransport({
  host: process.env.service,
  port: 587,
  auth: {
    user: process.env.user,
    pass: process.env.password
  },
  tls: {
    secureProtocol: "TLSv1_method"
  }
});

var emailBody = function emailBody(firstName, newPassword) {
  return "\n  <html>\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n      <title>New Password</title>\n      <style type=\"text/css\">\n      body {\n        padding: 0;\n        margin: 0\n      }\n      .container {\n        margin-top: 0;\n        padding: 32px;\n        color: #001a1a;\n       \n      }\n      .message {\n        padding: 32px\n      }\n      </style>\n    </head>\n    <body>\n      <div class=\"container\">\n        <div>\n          <p>Hi there ".concat(firstName, "!,</p><br>\n          <div class=\"message\">\n            <p>Your new password is <strong><em>").concat(newPassword, "</em></strong></p>\n            <p>\n             Please ensure to change your password immediately after login\n            </p>\n            <br>\n          </div>\n          Thank you.\n        </div>\n    </div>\n  </body>\n  </html>\n  ");
};

var sendMail =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(res, firstName, newPassword, email) {
    var mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mailOptions = {
              from: 'noreply@property-prolite.com',
              to: email,
              subject: 'Password Reset - Property Pro Lite',
              html: emailBody(firstName, newPassword)
            };
            _context.next = 3;
            return transporter.sendMail(mailOptions, function (error, body) {
              if (error) {
                _Utils["default"].setError('409', 'something went wrong, pls try again later');

                return _Utils["default"].send(res);
              }

              if (body && !body.rejected.length) {
                _Utils["default"].setSuccess(201, 'A new password has been sent to your email. Check your email and update your password');

                return _Utils["default"].send(res);
              }
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendMail(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendMail;
exports["default"] = _default;