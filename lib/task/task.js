"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./task.css");
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Task(dataobj) {
  var props = dataobj.props,
    toggleDone = dataobj.toggleDone,
    edit = dataobj.edit;
  var className = props.className,
    done = props.done,
    ID = props.ID,
    description = props.description,
    creationDate = props.creationDate,
    submitChange = props.submitChange,
    destroy = props.destroy,
    setName = props.setName;
  console.log('залупа-2');
  var completedClassText;
  if (done) {
    completedClassText = "".concat(className, " completed");
  } else {
    completedClassText = className;
  }
  return /*#__PURE__*/_react.default.createElement("li", {
    id: ID,
    className: completedClassText
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "view"
  }, /*#__PURE__*/_react.default.createElement("input", {
    checked: done,
    className: "toggle",
    type: "checkbox",
    onChange: function onChange() {
      dataobj.toggleDone();
    }
  }), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "description"
  }, description), /*#__PURE__*/_react.default.createElement("span", {
    className: "created "
  }, "`created", (0, _dateFns.formatDistanceToNow)(creationDate), " ago`")), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "icon icon-edit",
    onClick: function onClick() {
      dataobj.edit();
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "icon icon-destroy",
    onClick: function onClick() {
      dataobj.destroy();
    }
  })), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      dataobj.submitChange();
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "edit",
    onChange: function onChange(e) {
      return dataobj.setName(e);
    }
  })));
}
var _default = Task;
exports.default = _default;