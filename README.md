# rmc-gesture
---

React Mobile Component Gesture


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rmc-gesture)](https://saucelabs.com/u/rmc-gesture)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rmc-gesture.svg)](https://saucelabs.com/u/rmc-gesture)

[npm-image]: http://img.shields.io/npm/v/rmc-gesture.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rmc-gesture
[travis-image]: https://img.shields.io/travis/react-component/rmc-gesture.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/rmc-gesture
[coveralls-image]: https://img.shields.io/coveralls/react-component/rmc-gesture.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/rmc-gesture?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/rmc-gesture.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/rmc-gesture
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rmc-gesture.svg?style=flat-square
[download-url]: https://npmjs.org/package/rmc-gesture

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/rmc-gesture/


## install


[![rmc-gesture](https://nodei.co/npm/rmc-gesture.png)](https://npmjs.org/package/rmc-gesture)


## Usage

`rmc-gesture` is a react gesture component for mobile. You can use it as a container, and then it will have some gesture event which you can use.

```js
var MGesture = require('rmc-gesture');
var React = require('react');

function longTap() {
  console.log('longTap');
}

function doubleTap() {
  console.log('doubleTap');
}


React.render(
  <MGesture
    className="container"
    onLongTap={longTap}
    onDoubleTap={doubleTap}
  />,
  container
);
```

If you just want to use some gesture, not all. You can use the `Drag` `MultipleTap` `Pinch` or `Swipe` instand of using `rmc-gesutre`.

```js
import MGesture,
  {MultipleTap, Drag, Swipe, Pinch} from 'rmc-gesture';
var React = require('react');

function longTap() {
  console.log('longTap');
}

function doubleTap() {
  console.log('doubleTap');
}

// only use MultipleTap event
React.render(
  <MultipleTap
    className="container"
    onLongTap={longTap}
    onDoubleTap={doubleTap}
  />,
  container
);

// only use Swipe event
React.render(
  <Swipe
    className="container"
    onSwipe={() => console.log('swipe')}
  />,
  container
);
```

## API

### props


| 属性        | 说明                   | 类型   | 默认值     |
|-------------|------------------------|--------|------------|
| className       | set class name     | String | '' |
| onLongTap       | long tap      | Function | `function() {}` |
| onDoubleTap       | double tap      | Function | `function() {}` |
| onPinchStart       | start pinch      | Function | `function() {}` |
| onPinch       | pinching      | Function | `function() {}` |
| onPinchIn       | pinch in      | Function | `function() {}` |
| onPinchOut       | pinch out      | Function | `function() {}` |
| onPinchEnd       | pinch end      | Function | `function() {}` |
| onSwipe       | swipe      | Function | `function() {}` |
| onSwipeDown       | swipe down      | Function | `function() {}` |
| onSwipeUp       | swipe up      | Function | `function() {}` |
| onSwipeRight       | swipe right      | Function | `function() {}` |
| onSwipeLeft       | swipe left      | Function | `function() {}` |
| onDragStart       | start drag      | Function | `function() {}` |
| onDragEnd       | drag end      | Function | `function() {}` |
| onDrag       | dragging      | Function | `function() {}` |


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rmc-gesture is released under the MIT license.
