
WsRpcBridge = function(server = "ws://localhost:8000", namespace = undefined, allowEval = false, logging = false){

	this.deaf = false
	this.logging = logging
	this.allowEval = allowEval

	var ws
	var ns = namespace
	var self = this

	if(ns === undefined){
		ns = this
	}

	this.event = function(evt, data){
		send({id:-1, type:"evt", evt:evt, data:data})
	}

	function ws_onmessage(evt){
		if(self.logging){console.log("incoming: " + evt.data)}

		if(self.deaf){return}

		if(evt.data.substr(0,5) == "eval:"){
			if(allowEval){
				eval(evt.data.substr(5))
			}
		}
		else{
			var obj = JSON.parse(evt.data)

			if(obj.type === "rpc"){
				send({id:obj.id, type:"ans", data:unwrap(obj.data)})
			}

			if(obj.type === "cmd"){
				data:unwrap(obj.data)
			}

			if(obj.type === "asgn"){
				ns[obj.var] = unwrap(obj.data)
				if(self.logging){console.log(obj.var + " = " + ns[obj.var])}
			}
		}
	}

	function connect(){
		ws = new WebSocket(server)

		// 800ms timeout for opening
		setTimeout(function(){
			if(ws.readyState != ws.OPEN && ws.readyState != ws.CONNECTING){
				ws.close()
			}
		}, 800)

		ws.onopen = function(){
			console.log(server + " connected")
		}

		ws.onclose = function(){
			console.log("websocket closed, attempting reconnect...")
			setTimeout(connect, 100)
		}
		ws.onmessage = ws_onmessage
	}
	connect()

	function send(obj){
		msg = JSON.stringify(obj)
		if(self.logging){console.log("sending: " + msg)}
		ws.send(msg)
	}

	function unwrap(obj){
		if(Array.isArray(obj)){ // [...]
			for(var i=0; i<obj.length; i++){
				obj[i] = unwrap(obj[i])
			}
			return obj
		}
		else if(typeof obj === "object"){ // object, function call or js variable
			if(obj.type === "obj"){
				for(var field in obj.value) {
					if(obj.value.hasOwnProperty(field)){
						obj.value[field] = unwrap(obj.value[field])
					}
				}
				return obj.value
			}
			else if(obj.type === "call"){
				return ns[obj.name].apply(ns, unwrap(obj.args))
			}
			else if(obj.type === "var"){
				return ns[obj.name]
			}
		}
		else{ // string or number
			return obj
		}
	}
}
