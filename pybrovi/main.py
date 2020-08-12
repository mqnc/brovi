
from . import plainhttp, wsrpc
import webbrowser
import time
import os
import sys

call_sync = wsrpc.call_sync
call_async = wsrpc.call_async
call_eval = wsrpc.call_eval
direct_eval = wsrpc.direct_eval

connected = False
connectcb = None

def onconnect(address = None):
	global connected, connectcb
	connected = True
	print("connection from", address)
	if connectcb != None:
		connectcb()

def ondisconnect(address = None):
	global connected, connectcb
	connected = False
	print("client", address, "disconnected")

def connect(
	indexPage = "brovi/index.html",
	httpPort = 8000,
	wsPort = 8001,
	namespace = {},
	callbacks = [],
	allowEval = False,
	logging = False
):
	global connected, connectcb

	servePath = os.path.join(os.path.dirname(__file__), "..")

	# start websocket server for remote procedure call bridge
	hws = wsrpc.start(port = wsPort, onconnect = onconnect, ondisconnect = ondisconnect)

	# start http server for directory
	hhttp = plainhttp.runHttpServer(host="localhost", port=httpPort, directory=servePath)

	# wait if there is a browser already running and wants to connect
	time.sleep(1.5)
	if connected:
		# yes there is, refresh
		print("browser already running, refreshing...")
		refresh = wsrpc.remote_function('refresh')
		response = wsrpc.call_async(refresh())
		connected = False
	else:
		# no there isn't, open index.html in browser which connects to the websocket rpc bridge
		print("starting browser...")
		webbrowser.open_new_tab(
			"http://localhost:" + str(httpPort) + "/" + indexPage
			+ "?ws=ws://localhost:" + str(wsPort)
			+ "&eval=" + ("true" if allowEval else "false")
			+ "&log=" + ("true" if logging else "false"))

	print("waiting for browser to connect...")
	while not connected:
		time.sleep(0.1)

	# register local event callbacks
	for cb in callbacks:
		if cb.__name__ != "connected":
			wsrpc.local_callback(cb)
		else:
			connectcb = cb

	# this function is defined in index.html and lists all available functions
	reflect = wsrpc.remote_function('reflect')

	# retrieve a list of remotely defined functions
	response = wsrpc.call_sync(reflect(), timeout=1)

	# register all functions in the provided namespace
	for fn in response["functions"]:
		namespace[fn] = wsrpc.remote_function(fn)

	if connectcb != None:
		connectcb()

	return namespace, hhttp, hws
