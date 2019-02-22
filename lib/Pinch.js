'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var gestures = {};

function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
  var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1);
  var scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)));
  var translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
  return {
    rotate: rotate,
    scale: scale,
    translate: translate,
    matrix: [[scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]], [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]], [0, 0, 1]]
  };
}

var Pinch = function (_React$Component) {
  _inherits(Pinch, _React$Component);

  function Pinch(props) {
    _classCallCheck(this, Pinch);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleTouchCancel = _this.handleTouchCancel.bind(_this);
    return _this;
  }

  Pinch.prototype.handleTouchStart = function handleTouchStart(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var touchRecord = {};

      for (var p in touch) {
        if (touch.hasOwnProperty(p)) {
          touchRecord[p] = touch[p];
        }
      }

      var gesture = {
        startTouch: touchRecord,
        startTime: Date.now(),
        status: 'tapping',
        element: event.target
      };
      gestures[touch.identifier] = gesture;
    }

    // TODO: 变量声明方式，建议在函数最前面声明
    if (Object.keys(gestures).length === 2) {
      if (self.props.onPinchStart) {
        self.props.onPinchStart({
          touches: Array.prototype.slice.call(event.touches),
          touchEvent: event
        });
      }
    }
  };

  Pinch.prototype.handleTouchMove = function handleTouchMove(event) {
    var self = this;

    if (Object.keys(gestures).length === 2) {
      var position = [];
      var current = [];
      var elements = [];
      var transform = void 0;

      // TODO: 变量声明方式，建议在函数最前面声明
      for (var i = 0; i < event.touches.length; i++) {
        var touch = event.touches[i];
        var gesture = gestures[touch.identifier];
        position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
        current.push([touch.clientX, touch.clientY]);
      }

      // TODO: 变量声明方式，建议在函数最前面声明
      for (var p in gestures) {
        if (gestures.hasOwnProperty(p)) {
          elements.push(gestures[p].element);
        }
      }

      transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);

      if (self.props.onPinch) {
        self.props.onPinch({
          scale: transform.scale,
          touches: event.touches,
          touchEvent: event
        });
      }
      if (transform.scale > 1) {
        if (self.props.onPinchOut) {
          self.props.onPinchOut({
            transform: transform,
            touches: event.touches,
            touchEvent: event
          });
        }
      } else {
        if (self.props.onPinchIn) {
          self.props.onPinchIn({
            transform: transform,
            touches: event.touches,
            touchEvent: event
          });
        }
      }
    }
    event.preventDefault();
  };

  Pinch.prototype.handleTouchEnd = function handleTouchEnd(event) {
    var self = this;

    if (Object.keys(gestures).length === 2) {
      var elements = [];
      for (var p in gestures) {
        if (gestures.hasOwnProperty(p)) {
          elements.push(gestures[p].element);
        }
      }

      if (self.props.onPinchEnd) {
        self.props.onPinchEnd({
          touches: Array.prototype.slice.call(event.touches),
          touchEvent: event
        });
      }
    }

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var id = touch.identifier;
      var gesture = gestures[id];

      if (!gesture) continue;

      delete gestures[id];
    }
  };

  Pinch.prototype.handleTouchCancel = function handleTouchCancel(event) {
    var self = this;

    if (Object.keys(gestures).length === 2) {
      var elements = [];
      for (var p in gestures) {
        if (gestures.hasOwnProperty(p)) {
          elements.push(gestures[p].element);
        }
      }

      if (self.props.onPinchEnd) {
        self.props.onPinchEnd({
          touches: Array.prototype.slice.call(event.touches),
          touchEvent: event
        });
      }
    }

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var id = touch.identifier;
      var gesture = gestures[id];

      if (!gesture) continue;

      delete gestures[id];
    }
  };

  Pinch.prototype.render = function render() {
    var self = this;
    var props = self.props;

    return _react2["default"].createElement(
      'div',
      _extends({}, props, {
        className: props.className,
        onTouchStart: self.handleTouchStart,
        onTouchMove: self.handleTouchMove,
        onTouchEnd: self.handleTouchEnd,
        onTouchCancel: self.handleTouchCancel
      }),
      props.children
    );
  };

  return Pinch;
}(_react2["default"].Component);

Pinch.propTypes = {
  className: _propTypes2.string
};

Pinch.defaultProps = {
  className: ''
};

exports["default"] = Pinch;
module.exports = exports['default'];