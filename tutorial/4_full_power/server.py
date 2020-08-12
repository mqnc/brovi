
JSCODE = """

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.HemisphereLight("white", "grey", 1);
scene.add( light );

var geometry = new THREE.DodecahedronGeometry();
var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
var myObject = new THREE.Mesh( geometry, material );
scene.add( myObject );

camera.position.z = 3;

var animate = function () {
	requestAnimationFrame( animate );

	myObject.rotation.x += 0.01;
	myObject.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();

// we need to define the function in global scope so other eval-calls can access it
window.randomizeObjectColor = function(){
	myObject.material.color.setRGB(Math.random(), Math.random(), Math.random())
	console.log("Randomized the color!")
}
"""

import asyncio
import websockets

PORT = 8765

print("The WebSocket server is now listening on port " + str(PORT) + "!")
print("(kill this server using Ctrl+C)")

async def myServerFunction(websocket, path):
	print("Client connected!")
	await websocket.send(JSCODE) # send the whole program to the client
	while True:
		await websocket.send("randomizeObjectColor()") # call the function
		await asyncio.sleep(1)

asyncio.get_event_loop().run_until_complete(
	websockets.serve(myServerFunction, 'localhost', PORT))
asyncio.get_event_loop().run_forever()

