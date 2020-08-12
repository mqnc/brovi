
import time
import pybrovi
import numpy as np
from urllib.parse import quote

# convenience function to send multiple async calls
def js(*args):
	for arg in args:
		pybrovi.call_async(arg)

# encode a text into a datauri to be used in an html src attribute
def encodeDataURI(txt):
	return quote(txt, safe="-_.!~*()")

# prepare some drawings
pi = np.pi
n = 64
phi = np.linspace(0, 2*pi, n)
circlepoints = np.zeros((n, 3))
for i in range(n):
	circlepoints[i, 0] = np.cos(phi[i])
	circlepoints[i, 1] = np.sin(phi[i])

if True:
	# use file urls (relative to pyindex.html which is in the pybrovi folder)
	starssrc = "../media/stars.svg"
	ufosrc = "../media/ufo.dae"
else:
	# or send stuff as data URI:
	with open("media/stars.svg", 'r') as f:
		starssrc = "data:image/svg+xml," + encodeDataURI(f.read())
	with open("media/ufo.dae", 'r') as f:
		ufosrc = "data:," + encodeDataURI(f.read())


# callback function for button clicks (id will be the given name of the button that was pressed)
def buttonclick(id):
	if id == "change_color":
		js(background(np.random.rand(3).tolist()))

# clalback for a pressed key on the keyboard (repeats the press like holding the key in a text editor (to be fixed))
def keydown(key):
	print("pressed [" + key + "]")

# called when the connection to the browser is established, use this to draw the scene
def connected():

	js(
		# all parameters of the following functions have default values so you can leave them all out

		# browser title
		title("Python Browser Visualization Demo"),

		# background color of the drawing window
		background("black"),

		# define a camera, multiple cameras can be defined and selected using setcam("name")
		camera({
			"name":"mycam", # everything can have a name so you can refer to it
			"pose":homo({"type":"translate", "z":10}),
			"type":"perspective" # or "orthographic"
		}),

		# make a camera controllable using mouse
		orbit({
			"camera":"mycam",
			"target":[0, 0, 0],
			"up":[0, 0, 1]
		}),

		# some ambient light so that objects that are not directly lit by other lights aren't black
		light({
			"color":[0.5, 0.5, 0.5],
			"type":"ambient" # or "point" or "directional" or "spot"
		}),

		# some more directional light to have some nice shading
		light({
			"color":"gray",
			"type":"directional", # by default directional light comes from +z
			"pose":homo({"type":"rotate", "axis":"x", "angle":0.7})
		}),

		# make the sun glow as well
		light({
			"color":"white",
			"type":"point"
		}),

		# draw a coordinate system
		csys({
			"length":10,
			"width":1,
			"unit":"%" # line thickness defined in percent of window height
		}),

		# draw a very cornery sphere mesh as sun
		dot({
			"pose":homo({"type":"scale", "xyz":1.5}),
			"color":"gold"
		}),

		# reference frame without any objects
		node({
			"name":"earthpos"
		}),

		# earth orbit line
		line({
			"vertices":(circlepoints*5).tolist(),
			"color":[0.1, 0.33, 1.0],
			"width":0.2,
			"unit":"world" # line thickness defined in world units
		}),

		# earth
		dot({
			"parent":"earthpos", # coordinates are in relation to the parent object (mind that children also inherit scaling)
			"name":"earth",
			"color":[0.1, 0.33, 1.0]
		}),

		# moon orbit line
		line({
			"parent":"earthpos",
			"vertices":(circlepoints*2).tolist(),
			"color":"silver",
			"width":2,
			"unit":"px" # line thickness defined in pixels
		}),

		# moon
		dot({
			"parent":"earthpos", # coordinates are in relation to that object (mind that children also inherit scaling)
			"name":"moon",
			"color":"silver"
		}),

		# some text
		text({
			"text":"OUR SOLAR SYSTEM", # lower case letters did not work for some reason
			"color":"white",
			"pose":homoChain( # chain multiply homogeneous matrices
				{"type":"translate", "xyz":[-6.5, 2, 3]},
				{"type":"rotate", "axis":"x", "angle":pi/2}
			),
			"extrude":0.1
		}),

		# draw a picture into the scene
		picture({
			"name":"stars",
			"source":starssrc,
			"pose":homo({ "type":"scale", "xyz":[10, 10, 1] })
		}),

		# draw a model into the scene
		model({
			"name":"ufo",
			"source":ufosrc,
			"type":"dae" # also supports obj models
		}),

		# create a clickable button
		button({
			"name":"change_color",
			"color":"orange",
			"x":0.05, # x,y = position of the upper left corner of the button;
			"y":0.1, # (0,0) is the upper left corner, (1,1) is the lower right corner
			"w":0.1, # w = 1 is the full window width
			"h":0.15, # h = 1 is the full window width
			"text":"Change<br>Space<br>Color"
		})
	)

# create the rendering server and connect to the browser
pybrovi.connect(httpPort = 9000, wsPort = 9009, namespace = globals(), callbacks = [connected, keydown, buttonclick])

# dynamic update of objects
while True:
	time.sleep(1/30) # update rate

	t = time.time()/60 # we advance the solar system one year if t advances by 1, so it will need one minute for this
	js(
		settf("earthpos",
			homoChain(
				{"type":"rotate", "axis":"z", "angle":t},
				{"type":"translate", "x":5}
			)
		),

		settf("earth",
			homoChain(
				{"type":"rotate", "axis":"x", "angle":23/180*pi},
				{"type":"rotate", "axis":"z", "angle":364*t},
				{"type":"scale", "xyz":0.6}
			)
		),

		settf("moon",
			homoChain(
				{"type":"rotate", "axis":[0, 0, 1], "angle":28*t},
				{"type":"translate", "x":2},
				{"type":"scale", "xyz":0.2}
			)
		),

		settf("ufo",
			homoChain(
				{"type":"translate", "xyz":[np.sin(40*t)*6, np.sin(47*t)*6, np.sin(56*t)*3]},
				{"type":"rotate", "axis":[0, 0, 1], "angle":100*t},
				{"type":"scale", "xyz":0.3}
			)
		)
	)


"""
further possibilities to define a pose:

homo({ "type":"eye" }) # identity matrix

homo({ "type":"4x4rowmaj", "values":[11, 12, 13, 14,  21, 22, 23, 24,  31, 32, 33, 34,  41, 42, 43, 44] }) # 4x4 matrix in row major format
homo({ "type":"4x4rowmaj", "values":[[11, 12, 13, 14],  [21, 22, 23, 24],  [31, 32, 33, 34],  [41, 42, 43, 44]] }) # 4x4 matrix in row major format
homo({ "type":"4x4rowmaj", "values":np.eye(4).tolist() }) # use this to directly apply matrices from numpy
homo({ "type":"4x4colmaj", ... }) # column major format

homo({ "type":"3x3rowmaj", ... }) # orientation matrix, position is 0, 0, 0
homo({ "type":"3x3colmaj", ... }) # for completness sake

homo({ "type":"quat", "wxyz":[1, 0, 0, 0] }) # quaternion in wxyz order for orientation
homo({ "type":"quat", "xyzw":[0, 0, 0, 1] }) # quaternion in xyzw order for orientation
homo({ "type":"quat", "x":0, "y":0, "z":0, "w":1 }) # if you want to be super explicit

homo({ "type":"translate", "xyz":[1, 2, 3] })
homo({ "type":"translate", "x":1, "y":2 }) # if you omit components, they are set 0

homo({ "type":"rotate", "axis":"x", "angle":3.1416/2 }) # rotate about x (or y or z) axis
homo({ "type":"rotate", "axis":[1, 1, 1], "angle":3.1416/3 }) # rotate about arbitrary axis

# keep in mind that when you use scaling, lengths for children of an object scale as well
homo({ "type":"scale", "xyz":[1, 2, 3] }) # scale (be aware to set axes you don't want to scale to 1, not 0)
homo({ "type":"scale", "y":2 }) # scale individual axis

settf("myobject", homo({...})) # set the pose of an object
globaltf("myobject", homo({...})) # move an object with respect to the global coordinate system
localtf("myobject", homo({...})) # move an object with respect to its local coordinate system
"""
