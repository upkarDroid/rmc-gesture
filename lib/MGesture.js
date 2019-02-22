'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MultipleTap = require('./MultipleTap');

var _MultipleTap2 = _interopRequireDefault(_MultipleTap);

var _Drag = require('./Drag');

var _Drag2 = _interopRequireDefault(_Drag);

var _Swipe = require('./Swipe');

var _Swipe2 = _interopRequireDefault(_Swipe);

var _Pinch = require('./Pinch');

var _Pinch2 = _interopRequireDefault(_Pinch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  className: _propTypes2.string,
  onLongTap: _propTypes2.func,
  onDoubleTap: _propTypes2.func,
  onPinchStart: _propTypes2.func,
  onPinch: _propTypes2.func,
  onPinchIn: _propTypes2.func,
  onPinchOut: _propTypes2.func,
  onPinchEnd: _propTypes2.func,
  onSwipe: _propTypes2.func,
  onSwipeDown: _propTypes2.func,
  onSwipeUp: _propTypes2.func,
  onSwipeRight: _propTypes2.func,
  onSwipeLeft: _propTypes2.func,
  onDragStart: _propTypes2.func,
  onDragEnd: _propTypes2.func,
  onDrag: _propTypes2.func
};

var defaultProps = {
  className: '',
  onLongTap: function onLongTap() {},
  onDoubleTap: function onDoubleTap() {},
  onPinchStart: function onPinchStart() {},
  onPinch: function onPinch() {},
  onPinchIn: function onPinchIn() {},
  onPinchOut: function onPinchOut() {},
  onPinchEnd: function onPinchEnd() {},
  onSwipe: function onSwipe() {},
  onSwipeDown: function onSwipeDown() {},
  onSwipeUp: function onSwipeUp() {},
  onSwipeRight: function onSwipeRight() {},
  onSwipeLeft: function onSwipeLeft() {},
  onDragStart: function onDragStart() {},
  onDragEnd: function onDragEnd() {},
  onDrag: function onDrag() {}
};

var defaultStyle = {
  width: '100%',
  height: '100%'
};

var RmcGesture = function (_React$Component) {
  _inherits(RmcGesture, _React$Component);

  function RmcGesture(props) {
    _classCallCheck(this, RmcGesture);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  RmcGesture.prototype.render = function render() {
    var self = this;
    var props = self.props;
    var className = 'gesture-container ' + props.className;

    return _react2["default"].createElement(
      'div',
      { className: className },
      _react2["default"].createElement(
        _MultipleTap2["default"],
        {
          style: defaultStyle,
          className: 'rmc-gesture',
          onLongTap: props.onLongTap,
          onDoubleTap: props.onDoubleTap
        },
        _react2["default"].createElement(
          _Pinch2["default"],
          {
            style: defaultStyle,
            className: 'rmc-gesture',
            onPinchStart: props.onPinchStart,
            onPinch: props.onPinch,
            onPinchIn: props.onPinchIn,
            onPinchOut: props.onPinchOut,
            onPinchEnd: props.onPinchEnd
          },
          _react2["default"].createElement(
            _Swipe2["default"],
            {
              style: defaultStyle,
              className: 'rmc-gesture',
              onSwipe: props.onSwipe,
              onSwipeDown: props.onSwipeDown,
              onSwipeUp: props.onSwipeUp,
              onSwipeRight: props.onSwipeRight,
              onSwipeLeft: props.onSwipeLeft
            },
            _react2["default"].createElement(
              _Drag2["default"],
              {
                style: defaultStyle,
                className: 'rmc-gesture',
                onDragStart: props.onDragStart,
                onDragEnd: props.onDragEnd,
                onDrag: props.onDrag
              },
              props.children
            )
          )
        )
      )
    );
  };

  return RmcGesture;
}(_react2["default"].Component);

RmcGesture.propTypes = propTypes;
RmcGesture.defaultProps = defaultProps;

RmcGesture.MultipleTap = _MultipleTap2["default"];
RmcGesture.Drag = _Drag2["default"];
RmcGesture.Swipe = _Swipe2["default"];
RmcGesture.Pinch = _Pinch2["default"];

exports["default"] = RmcGesture;
module.exports = exports['default'];