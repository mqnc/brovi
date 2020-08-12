
import asyncio
import websockets

PORT = 8765

print("The WebSocket server is now listening on port " + str(PORT) + "!")
print("(kill this server using Ctrl+C)")

async def myServerFunction(websocket, path):
	print("Client connected!")
	while True:
		# now we need to transform 
		await websocket.send('{"fn":"randomizeObjectColor", "args":[]}')
		await asyncio.sleep(1)
		await websocket.send('{"fn":"setObjectColor", "args":["white"]}')
		await asyncio.sleep(1)
		await websocket.send('{"fn":"hackTheBrowser", "args":[1337, "covfefe"]}')
		await asyncio.sleep(1)
		
asyncio.get_event_loop().run_until_complete(
	websockets.serve(myServerFunction, 'localhost', PORT))
asyncio.get_event_loop().run_forever()
