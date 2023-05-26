"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _tasklist = _interopRequireDefault(require("./tasklist/tasklist"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
console.log(_tasklist.default);
var IDobj = {
  actualnum: 0,
  getfunc: function getfunc() {
    this.actualnum += 1;
    console.log(this.actualnum);
    return this.actualnum;
  }
};
var createItem = function createItem(descr) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var objlist = {
    className: '',
    description: descr,
    done: done,
    visible: true,
    ID: IDobj.getfunc(),
    creationDate: new Date()
  };
  return objlist;
};
var Finalcode = /*#__PURE__*/function (_React$Component) {
  _inherits(Finalcode, _React$Component);
  var _super = _createSuper(Finalcode);
  function Finalcode() {
    var _this;
    _classCallCheck(this, Finalcode);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "selectDone", function (e) {
      e.preventDefault();
      _this.setState(function (_ref) {
        var listOfItems = _ref.listOfItems;
        var fuck = listOfItems.map(function (item) {
          if (!item.done) {
            item.visible = false;
          } else {
            item.visible = true;
          }
          return item;
        });
        return {
          listOfItems: fuck
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "deleteDone", function (e) {
      _this.setState(function (_ref2) {
        var listOfItems = _ref2.listOfItems;
        var fuck = listOfItems.filter(function (item) {
          return !item.done;
        });
        console.log(fuck);
        return {
          listOfItems: fuck
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "selectActive", function (e) {
      _this.setState(function (_ref3) {
        var listOfItems = _ref3.listOfItems;
        var fuck = listOfItems.map(function (item) {
          if (item.done) {
            item.visible = false;
          } else {
            item.visible = true;
          }
          return item;
        });
        return {
          listOfItems: fuck
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "selectAll", function (e) {
      _this.setState(function (_ref4) {
        var listOfItems = _ref4.listOfItems;
        var fuck = listOfItems.map(function (item) {
          item.visible = true;
          return item;
        });
        return {
          listOfItems: fuck
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "submitCreateItem", function (e) {
      _this.setState(function (_ref5) {
        var textInput = _ref5.textInput,
          listOfItems = _ref5.listOfItems;
        e.preventDefault();
        var needArr = [].concat(_toConsumableArray(listOfItems.slice(0)), [createItem(textInput)]);
        // console.log(needArr)
        return {
          listOfItems: needArr
        };
      });
      _this.setState(function () {
        return {
          textInput: ''
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "changeItem", function (e) {
      _this.setState(function (state) {
        var newVal = e.target.value;
        return {
          textInput: newVal
        };
      });
    });
    _this.state = {
      listOfItems: [createItem('task1'), createItem('task2'), createItem('task3')],
      textInput: ''
    };
    return _this;
  }
  _createClass(Finalcode, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      // (e)=>{this.setState(({listOfItems})=>{e.preventDefault()
      // const newList=[...(listOfItems.slice(0)),createItem('fdsfsd')]
      // return {listOfItems:newList}})}
      var state = this.state;
      var listOfItems = state.listOfItems;
      return /*#__PURE__*/_react.default.createElement("section", {
        className: "todoapp"
      }, /*#__PURE__*/_react.default.createElement("header", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("h1", null, "todos"), /*#__PURE__*/_react.default.createElement("form", {
        onSubmit: this.submitCreateItem
      }, /*#__PURE__*/_react.default.createElement("input", {
        onChange: this.changeItem,
        value: state.textInput,
        className: "new-todo",
        placeholder: "What needs to be done?"
        // autoFocus
      }))), /*#__PURE__*/_react.default.createElement("section", {
        className: "main"
      }, /*#__PURE__*/_react.default.createElement(_tasklist.default, {
        edit: function edit(i) {
          console.log(listOfItems[i], 'работает ');
          return _this2.setState(function (_ref6) {
            var listOfItems = _ref6.listOfItems;
            return listOfItems[i].className = 'editing';
          });
        },
        destroy: function destroy(i) {
          _this2.setState(function (_ref7) {
            var listOfItems = _ref7.listOfItems;
            var newList = [].concat(_toConsumableArray(listOfItems.slice(0, i)), _toConsumableArray(listOfItems.slice(i + 1)));
            return {
              listOfItems: newList
            };
          });
        },
        toggleDone: function toggleDone(i) {
          _this2.setState(function (_ref8) {
            var listOfItems = _ref8.listOfItems;
            return listOfItems[i].done = !listOfItems[i].done;
          });
        },
        propers: listOfItems,
        setName: function setName(e, i) {
          _this2.setState(function (_ref9) {
            var listOfItems = _ref9.listOfItems;
            console.log('Хуй');
            return listOfItems[i].description = e.target.value;
          });
        },
        submitChange: function submitChange(i) {
          _this2.setState(function (_ref10) {
            var listOfItems = _ref10.listOfItems;
            console.log('Хуй2');
            return listOfItems[i].className = '';
          });
        }
      }), /*#__PURE__*/_react.default.createElement("footer", {
        className: "footer"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "todo-count"
      }, listOfItems.filter(function (it) {
        return !it.done;
      }).length, " items left"), /*#__PURE__*/_react.default.createElement("ul", {
        className: "filters"
      }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.selectAll
      }, "All")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.selectDone
      }, "Active")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.selectActive
      }, "Completed"))), /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "clear-completed",
        onClick: this.deleteDone
      }, "Clear completed"))));
    }
  }]);
  return Finalcode;
}(_react.default.Component); // let root=ReactDOM.createRoot(document.getElementById('root'))
// root.render(<Finalcode/>)
var _default = Finalcode;
exports.default = _default;