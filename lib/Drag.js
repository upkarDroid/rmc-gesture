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

var Drag = function (_React$Component) {
  _inherits(Drag, _React$Component);

  function Drag(props) {
    _classCallCheck(this, Drag);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleTouchCancel = _this.handleTouchCancel.bind(_this);
    return _this;
  }

  Drag.prototype.handleTouchStart = function handleTouchStart(event) {
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

  Drag.prototype.handleTouchMove = function handleTouchMove(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var gesture = gestures[touch.identifier];

      if (!gesture) {
        return;
      }

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
      var distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));

      if (gesture.status === 'tapping' && distance > 10) {
        gesture.status = 'panning';
        gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));

        if (self.props.onDragStart) {
          self.props.onDragStart({
            touch: touch,
            touchEvent: event,
            isVertical: gesture.isVertical
          });
        }
      }

      if (gesture.status === 'panning') {
        gesture.panTime = Date.now();

        if (self.props.onDrag) {
          self.props.onDrag({
            displacementX: displacementX,
            displacementY: displacementY,
            touch: touch,
            touchEvent: event,
            isVertical: gesture.isVertical
          });
        }
      }
    }

    event.preventDefault();
  };

  Drag.prototype.handleTouchEnd = function handleTouchEnd(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var id = touch.identifier;
      var gesture = gestures[id];

      if (!gesture) continue;

      if (gesture.status === 'panning') {
        var now = Date.now();
        var duration = now - gesture.startTime;
        var displacementX = touch.clientX - gesture.startTouch.clientX;
        var displacementY = touch.clientY - gesture.startTouch.clientY;

        var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
        var isflick = velocity > 0.5 && now - gesture.lastTime < 100;

        if (self.props.onDragEnd) {
          self.props.onDragEnd({
            duration: duration,
            isflick: isflick,
            touch: touch,
            displacementX: displacementX,
            displacementY: displacementY,
            velocityX: gesture.velocityX,
            velocityY: gesture.velocityY,
            touchEvent: event,
            isVertical: gesture.isVertical
          });
        }
      }
      delete gestures[id];
    }
  };

  Drag.prototype.handleTouchCancel = function handleTouchCancel(event) {
    var self = this;

    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var id = touch.identifier;
      var gesture = gestures[id];

      if (!gesture) continue;

      if (gesture.status === 'panning') {
        if (self.props.onDragEnd) {
          self.props.onDragEnd({
            touch: touch,
            touchEvent: event
          });
        }
      }

      delete gestures[id];
    }
  };

  Drag.prototype.render = function render() {
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

  return Drag;
}(_react2["default"].Component);

Drag.propTypes = {
  className: _propTypes2.string,
  prefixCls: _propTypes2.string
};

Drag.defaultProps = {
  prefixCls: 'rmc-gesture',
  className: ''
};

exports["default"] = Drag;
module.exports = exports['default'];