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

It is mostly finished and usable, see ToDo section for issues.

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

## ToDo

* Line thickness is buggy
* Text labels are buggy
* Automatic browser launch from application in pybrovi is buggy
* Code refactory (quick and dirty spaghetti code protottype engineering &rarr; coherent piece of software architecture)
* Demo for use from C++
* Support for much more powerful gltf model format [(link)](https://threejs.org/examples/#webgl_loader_gltf)
* Nicer text rendering [(link)](https://medium.com/@evanwallace/easy-scalable-text-rendering-on-the-gpu-c3f4d782c5ac)
* 2d / 3d plots
* Multiple visualization windows on a single page

## Partners

This project is used at [KARL STORZ SE & Co. KG](https://www.karlstorz.com/)