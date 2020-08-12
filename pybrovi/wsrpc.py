
# websocket remote procedure call bridge

import json
import time

from . import plainws

class remote_call:
	def __init__(self, name, args):
		self.name = name
		self.args = args

class remote_variable:
	def __init__(self, name):
		self.name = name
	def set(self, expression):
		data = wrapJson(expression)
		msg = json.dumps({"type":"asgn", "var":self.name, "data":data})
		server.send(msg)
	def get(self, timeout = None):
		return call_sync(self, timeout)

def remote_function(name):
	return lambda *args:remote_call(name, args)

event_callbacks = {}
def local_callback(fn, alias = None):
	if alias is not None:
		event_callbacks[alias] = fn
	else:
		event_callbacks[fn.__name__] = fn

def wrapJson(obj):
	if type(obj) == list:
		return [wrapJson(e) for e in obj]
	elif type(obj) == dict:
		return { 'type':'obj', 'value':{k:wrapJson(v) for k, v in obj.items()} }
	elif type(obj) == remote_variable:
		return { 'type':'var', 'name':obj.name }
	elif type(obj) == remote_call:
		return { 'type':'call', 'name':obj.name, 'args':[wrapJson(a) for a in obj.args] }
	else:
		return obj

def wrapEval(obj):
	if type(obj) == list:
		return "[" + ",".join([wrapEval(e) for e in obj]) + "]"
	elif type(obj) == dict:
		return "{" + ",".join([k + ":" + wrapEval(v) for k, v in obj.items()]) + "}"
	elif type(obj) == remote_variable:
		return obj.name
	elif type(obj) == remote_call:
		return obj.name + "(" + ",".join([wrapEval(a) for a in obj.args]) + ")"
	else:
		if isinstance(obj, str):
			return '`' + str(obj) + '`'
		else:
			return str(obj)

def on_receive(message, address):
	obj = json.loads(message)
	if obj["type"] == "ans":
		id = obj["id"]
		if id in call_states:
			if type(call_states[id]) == sync_pending:
				if "data" in obj:
					call_states[id] = obj["data"]
				else:
					call_states[id] = None
			if type(call_states[id]) == async_callback:
				call_states[id].callback(obj["data"])
	elif obj["type"] == "evt":
		if obj["evt"] in event_callbacks:
			event_callbacks[obj["evt"]](obj["data"])

server = None
def start(port = 8000, onconnect = None, ondisconnect = None):
	global server
	server = plainws.Server(port, 1)
	server.onReceive = on_receive
	server.onConnect = onconnect
	server.onDisconnect = ondisconnect
	return server

idCounter = -1
def next_id():
	global idCounter
	idCounter += 1
	return idCounter

class sync_pending:
	pass

class async_callback:
	def __init__(self, callback):
		self.callback = callback

call_states = {}

def call_sync(expression, timeout = None):
	data = wrapJson(expression)
	id = next_id()
	call_states[id] = sync_pending()
	msg = json.dumps({"id":id, "type":"rpc", "data":data})
	server.send(msg)

	t0 = time.time()
	while type(call_states[id]) == sync_pending:
		time.sleep(0.0001)
		if timeout != None and time.time() > t0 + timeout:
			del call_states[id]
			return None

	result = call_states[id]
	del call_states[id]
	return result

def call_async(expression, callback = None):
	data = wrapJson(expression)

	if callback != None:
		id = next_id()
		call_states[id] = async_callback(callback)
		msg = json.dumps({"id":id, "type":"rpc", "data":data})
		server.send(msg)
	else:
		msg = json.dumps({"type":"cmd", "data":data})
		server.send(msg)

def call_eval(expression):
	msg = "eval:" + wrapEval(expression)
	server.send(msg)

def direct_eval(expression):
	msg = "eval:" + expression
	server.send(msg)

if __name__ == "__main__":

	start()

	log = remote_function('log')
	add = remote_function('add')
	newVar = remote_variable('newVar')
	info = remote_variable('info')

	while True:

		call_sync(log(info), timeout = 0.1)

		newVar.set(123)
		print(newVar.get(timeout = 0.1))

		print(info.get(1))

		call_async(log(newVar))

		call_async(add(3, 5), callback = lambda x:print(x))

		time.sleep(1)

	"""
	<!DOCTYPE html>
	<script src="WsRpcBridge.js"></script>
	<script>
	namespace = {
		add:function(a, b){return a + b},
		log:function(txt){console.log(txt)},
		info:"json ftw"
	}
	rpc = new WsRpcBridge("ws://localhost:8000", namespace, true)
	</script>
	"""
