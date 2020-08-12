
That's mostly all you need to create your own interactive 3d Browser Visualization.
The rest is basically wrapping more three.js features and making them available through the
websocket bridge. Here is a list of things that BroVi implements:

Camera control for the mouse using OrbitControls
https://threejs.org/docs/#examples/en/controls/OrbitControls
https://threejs.org/examples/#misc_controls_orbit

Loading models
https://threejs.org/docs/#examples/en/loaders/OBJLoader
https://threejs.org/examples/#webgl_loader_obj
Models can also be fed into the GUI from the server as base64 string.

Light
https://threejs.org/docs/#api/en/lights/Light

Text
https://threejs.org/docs/#manual/en/introduction/Creating-text

Keyboard input
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

Mouse input
https://www.w3schools.com/jsref/obj_mouseevent.asp

Lines
https://threejs.org/docs/#manual/en/introduction/Drawing-lines
https://threejs.org/examples/webgl_lines_fat.html

And some further concepts:

Keyword Arguments
-----------------
BroVi is designed in a way so that all functions just accept one JSON object as argument. It expects
certain fields in that object and fills all non-existent fields with default values. Thus, the calls
become very readable:
camera({
	"type": "perspective",
	"pose": homo({
		"type": "translate",
		"z": 1
	}),
	"fy":1
})

Named Objects
-------------
All objects get a name so they can later be refered to in order to change (move, recolor, ...) them.

Transformation Conventions
--------------------------
Many formats for orientation and pose description are accepted so that you can feed in whatever
format is used in your program.

Browser Management
------------------
We don't want that the user has to start the server and then open an html document. In PyBrovi, the
main program is a websocket server but also an http server that automatically opens a browser on
startup and sends the html document to it. When one of the sides is closed, the other one will
constantly attempt to reconnect. This is mainly a convenience feature and not necessary. It is also
a bit buggy.

Reflection and RPC-Wrapping
---------------------------
On startup, the websocket client sends a big message containing all the functions that it offers.
These functions are then wrapped in python and put into the global namespaces, so the programmer
can easily use them. A call to
setObjectColor("green")
would then convert itself into the string (by returning it)
{"fn":"setObjectColor", "args":["green"]}
which can be sent to the browser.
