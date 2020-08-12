
# demo at the end of this file

import asyncio
import websockets
import threading
import traceback

class Connection:
	def __init__(self, client):
		self.client = client
		self.sendQueue = []

class Server:
	def __init__(self, port = 8000, maxConnections = 1):
		self.loop = None
		self.server = None
		self.port = port
		self.maxConnections = maxConnections
		self.connections = set()
		self.onConnect = None
		self.onReceive = None
		self.onDisconnect = None
		threading.Thread(target = self.serverThread, daemon = True).start()
		
	def serverThread(self):
		self.loop = asyncio.new_event_loop()
		asyncio.set_event_loop(self.loop)
		self.server = websockets.serve(self.connection, "localhost", self.port)
		self.loop.run_until_complete(self.server)
		self.loop.run_forever()
	
	async def sender(self, conn):
		try:
			while True:
				if len(conn.sendQueue) > 0:
					await conn.client.send(conn.sendQueue.pop(0))
				await asyncio.sleep(0.001)
		except:
			pass
			
	async def listener(self, conn):
		try:
			while True:
				message = await conn.client.recv()
				if not self.onReceive == None:
					try:
						self.onReceive(message, conn.client.remote_address)
					except:
						traceback.print_exc()
				await asyncio.sleep(0.001)
		except:
			pass
		finally:	
			if not self.onDisconnect == None:
				try:
					self.onDisconnect(conn.client.remote_address)
				except:
					traceback.print_exc()
			self.connections.remove(conn)
			
	async def connection(self, client, path):
		if len(self.connections) >= self.maxConnections:
			await client.close()
		else:
			conn = Connection(client)
			self.connections.add(conn)

			if not self.onConnect == None:
				try:
					self.onConnect(client.remote_address)
				except:
					traceback.print_exc()
			
			asyncio.create_task(self.listener(conn))
			await self.sender(conn)

	def send(self, message, address = None):
		for conn in self.connections:
			if address == None or address == conn.client.remote_address:
				conn.sendQueue.append(message)

# demo

if __name__ == "__main__":

	import time

	ws = Server(port = 8000, maxConnections = 2)
	
	def onCon(adr):
		print(adr, "connected")
		ws.send("Hi", adr)
	ws.onConnect = onCon

	def onCls(adr):
		print(adr, "disconnected")
	ws.onDisconnect = onCls

	def onRcv(msg, adr):
		print(msg, "from", adr)
	ws.onReceive = onRcv

	while True:
		time.sleep(1)
		ws.send("ping")

	"""
	<!DOCTYPE html>
	<script>
	var ws = new WebSocket("ws://localhost:8000");
	ws.onopen = function(){console.log("connected")}
	ws.onmessage = function (evt){console.log(evt.data)}
	ws.onclose = function(){console.log("disconnected")}
	</script>
	"""