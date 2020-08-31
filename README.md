# BroVi

This is BroVi, a WebSocket-Controlled Browser Visualization for Interactive 3d Scenes

## About

BroVi is a cross-platform library for interactive 3d visualizations through the browser. The core part of this project is a wrapper for [THREE.js](https://threejs.org), encapsulating a powerful and complex library and providing simple functions for basic visualization needs to the outside.

It can be used in stand-alone HTML documents to display 3d scenes which provide no interaction apart from camera motion. It also provides a WebSocket interface for interaction with an application.

Communication through the WebSocket interface is realized via remote procedure call using text messages in JSON format, e.g.:

```javascript
{"call":"csys", "args":{"name":"myCsys", "length":0.1}}
```

which will result in a function call:

```javascript
csys({"name":"myCsys", "length":0.1})
```

which draws a coordinate system with 0.1 units axis length.

## Project Status

Although mostly finished and usable, this is still a prototype. Line thickness, text labels and automatic browser launch are slightly buggy. Many new features are planned:

* Rather than letting everyone implement their own WebSocket server in their favorite language, one HTTP+WebSocket server will be implemented in C++ using [uWebSockets](https://github.com/uNetworking/uWebSockets). It can then be wrapped in other languages using SWIG. People can still implement their own servers though.

* A custom language will be created that can both be used from JavaScript and through the WebSocket interface. If eval should be avoided on js' side, WebSocket messages will have to be parsed anyway.

* Text labels will be implemented using 3d CSS. The disadvantage is that the text will always be above any graphics object. The advantages are that the text is sharp and smooth, does not require elaborate shaders or meshes, can be selected and [KaTeX](https://katex.org/) can easily be used.

## Demo and API

[Our Solar System](https://mqnc.github.io/brovi/brovi_demo)

[API](https://mqnc.github.io/brovi/api_documentation)

## Architecture

![image of architecture](https://mqnc.github.io/brovi/media/architecture.png)

## Features

* Camera control
* Lights
* Transformation control for a hierarchy of objects, providing various formalisms like homogeneous matrices (row major or column major), quaternions (wxyz or xyzw), and Euler angles
* 3d objects in obj and dae format
* Lines
* 3d text labels
* HTML buttons which send events to the application
* Keyboard and mouse events also sent to the application

## Partners

This project is used at [KARL STORZ SE & Co. KG](https://www.karlstorz.com/)
