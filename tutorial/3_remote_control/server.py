
import asyncio
import websockets

PORT = 8765

print("The WebSocket server is now listening on port " + str(PORT) + "!")
print("(kill this server using Ctrl+C)")

async def myServerFunction(websocket, path):
	print("Client connected!")
	while True:
		await websocket.send("randomizeObjectColor()") # we send this string to the client
		await asyncio.sleep(1)

asyncio.get_event_loop().run_until_complete(
	websockets.serve(myServerFunction, 'localhost', PORT))
asyncio.get_event_loop().run_forever()
