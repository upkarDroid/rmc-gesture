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

var Swipe = function (_React$Component) {
  _inherits(Swipe, _React$Component);

  function Swipe(props) {
    _classCallCheck(this, Swipe);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    return _this;
  }

  Swipe.prototype.handleTouchStart = function handleTouchStart(event) {
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
  };

  Swipe.prototype.handleTouchMove = function handleTouchMove(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var gesture = gestures[touch.identifier];

      if (!gesture) {
        return;
      }

      gesture._movestart = !!(gesture._movestart || Math.abs(gesture._disX) < Math.abs(gesture._disY));

      if (!gesture.lastTouch) {
        gesture.lastTouch = gesture.startTouch;
      }
      if (!gesture.lastTime) {
        gesture.lastTime = gesture.startTime;
      }
      if (!gesture.velocityX) {
        gesture.velocityX = 0;
      }
      if (!gesture.velocityY) {
        gesture.velocityY = 0;
      }
      if (!gesture.duration) {
        gesture.duration = 0;
      }

      var time = Date.now() - gesture.lastTime;

      if (time > 0) {
        var vx = (touch.clientX - gesture.lastTouch.clientX) / time;
        var vy = (touch.clientY - gesture.lastTouch.clientY) / time;

        var RECORD_DURATION = 70;
        if (time > RECORD_DURATION) {
          time = RECORD_DURATION;
        }
        if (gesture.duration + time > RECORD_DURATION) {
          gesture.duration = RECORD_DURATION - time;
        }

        gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
        gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
        gesture.duration += time;

        gesture.lastTouch = {};

        for (var p in touch) {
          if (touch.hasOwnProperty(p)) {
            gesture.lastTouch[p] = touch[p];
          }
        }
        gesture.lastTime = Date.now();

        var displacementX = touch.clientX - gesture.startTouch.clientX;
        var displacementY = touch.clientY - gesture.startTouch.clientY;

        gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));
      }
    }
  };

  Swipe.prototype.handleTouchEnd = function handleTouchEnd(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var id = touch.identifier;
      var gesture = gestures[id];

      if (!gesture) continue;

      var now = Date.now();
      var duration = now - gesture.startTime;
      var displacementX = touch.clientX - gesture.startTouch.clientX;
      var displacementY = touch.clientY - gesture.startTouch.clientY;

      var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
      var isflick = velocity > 0.5 && now - gesture.lastTime < 150;
      var extra = {
        duration: duration,
        isflick: isflick,
        displacementX: displacementX,
        displacementY: displacementY,
        touch: touch,
        velocityX: gesture.velocityX,
        velocityY: gesture.velocityY,
        touchEvent: event,
        isVertical: gesture.isVertical
      };

      if (isflick) {
        if (self.props.onSwipe) {
          self.props.onSwipe(extra);
        }
        if (gesture.isVertical) {
          if (displacementY > 0) {
            if (self.props.onSwipeDown) {
              self.props.onSwipeDown(extra);
            }
          } else {
            if (self.props.onSwipeUp) {
              self.props.onSwipeUp(extra);
            }
          }
        } else {
          if (displacementX > 0) {
            if (self.props.onSwipeRight) {
              self.props.onSwipeRight(extra);
            }
          } else {
            if (self.props.onSwipeLeft) {
              self.props.onSwipeLeft(extra);
            }
          }
        }
      }

      delete gestures[id];
    }
  };

  Swipe.prototype.render = function render() {
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

  return Swipe;
}(_react2["default"].Component);

Swipe.propTypes = {
  className: _propTypes2.string
};

Swipe.defaultProps = {
  className: ''
};

exports["default"] = Swipe;
module.exports = exports['default'];