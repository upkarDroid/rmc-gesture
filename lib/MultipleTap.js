'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var gestures = {};
var lastTap = {};

var MultipleTap = function (_React$Component) {
  _inherits(MultipleTap, _React$Component);

  function MultipleTap(props) {
    _classCallCheck(this, MultipleTap);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleTouchCancel = _this.handleTouchCancel.bind(_this);
    return _this;
  }

  MultipleTap.prototype.handleTouchStart = function handleTouchStart(event) {
    var self = this;

    var _loop = function _loop(i) {
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
        element: event.target,
        // TODO: Don't make functions within a loop
        pressingHandler: setTimeout(function () {
          return function () {
            if (gesture.status === 'tapping') {
              gesture.status = 'pressing';
              if (self.props.onLongTap) {
                self.props.onLongTap({
                  touchEvent: event
                });
              }
            }

            clearTimeout(gesture.pressingHandler);
            gesture.pressingHandler = null;
          };
        }(), 500)
      };
      gestures[touch.identifier] = gesture;
    };

    for (var i = 0; i < event.changedTouches.length; i++) {
      _loop(i);
    }
  };

  MultipleTap.prototype.handleTouchMove = function handleTouchMove(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var _touch = event.changedTouches[i];
      var _gesture = gestures[_touch.identifier];

      if (!_gesture) {
        return;
      }

      if (!_gesture.lastTouch) {
        _gesture.lastTouch = _gesture.startTouch;
      }
      if (!_gesture.lastTime) {
        _gesture.lastTime = _gesture.startTime;
      }
      if (!_gesture.velocityX) {
        _gesture.velocityX = 0;
      }
      if (!_gesture.velocityY) {
        _gesture.velocityY = 0;
      }
      if (!_gesture.duration) {
        _gesture.duration = 0;
      }

      var time = Date.now() - _gesture.lastTime;
      var vx = (_touch.clientX - _gesture.lastTouch.clientX) / time;
      var vy = (_touch.clientY - _gesture.lastTouch.clientY) / time;

      var RECORD_DURATION = 70;
      if (time > RECORD_DURATION) {
        time = RECORD_DURATION;
      }
      if (_gesture.duration + time > RECORD_DURATION) {
        _gesture.duration = RECORD_DURATION - time;
      }

      _gesture.velocityX = (_gesture.velocityX * _gesture.duration + vx * time) / (_gesture.duration + time);
      _gesture.velocityY = (_gesture.velocityY * _gesture.duration + vy * time) / (_gesture.duration + time);
      _gesture.duration += time;

      _gesture.lastTouch = {};

      for (var p in _touch) {
        if (_touch.hasOwnProperty(p)) {
          _gesture.lastTouch[p] = _touch[p];
        }
      }
      _gesture.lastTime = Date.now();

      var displacementX = _touch.clientX - _gesture.startTouch.clientX;
      var displacementY = _touch.clientY - _gesture.startTouch.clientY;
      var distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));

      if (distance > 10 && _gesture.pressingHandler) {
        clearTimeout(_gesture.pressingHandler);
        _gesture.pressingHandler = null;

        if (_gesture.status === 'tapping' || _gesture.status === 'pressing') {
          _gesture.status = 'panning';
        }
      }
    }
  };

  MultipleTap.prototype.handleTouchEnd = function handleTouchEnd(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var _touch2 = event.changedTouches[i];
      var id = _touch2.identifier;
      var _gesture2 = gestures[id];

      if (!_gesture2) continue;

      if (_gesture2.pressingHandler) {
        clearTimeout(_gesture2.pressingHandler);
        _gesture2.pressingHandler = null;
      }

      if (_gesture2.status === 'tapping') {
        _gesture2.timestamp = Date.now();

        if (lastTap && _gesture2.timestamp - lastTap.timestamp < 300) {
          if (self.props.onDoubleTap) {
            self.props.onDoubleTap({
              touch: _touch2,
              touchEvent: event
            });
          }
        }

        lastTap = _gesture2;
      }

      delete gestures[id];
    }
  };

  MultipleTap.prototype.handleTouchCancel = function handleTouchCancel(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var _touch3 = event.changedTouches[i];
      var id = _touch3.identifier;
      var _gesture3 = gestures[id];

      if (!_gesture3) continue;

      if (_gesture3.pressingHandler) {
        clearTimeout(_gesture3.pressingHandler);
        _gesture3.pressingHandler = null;
      }

      delete gestures[id];
    }
  };

  MultipleTap.prototype.render = function render() {
    var self = this;
    var props = this.props;

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

  return MultipleTap;
}(_react2["default"].Component);

MultipleTap.propTypes = {
  className: _propTypes2.string,
  prefixCls: _propTypes2.string
};

MultipleTap.defaultProps = {
  prefixCls: 'rmc-gesture',
  className: ''
};

exports["default"] = MultipleTap;
module.exports = exports['default'];