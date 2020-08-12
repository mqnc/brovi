
Brovi = function(broviRoot = "./brovi"){

	var me = this

	me.root = broviRoot
	me.scene = new THREE.Scene()
	me.scene.name = "scene"
	me.renderer = new THREE.WebGLRenderer({antialias: true})
	me.renderer.setSize(window.innerWidth, window.innerHeight)
	me.resolution = new THREE.Vector2(640, 480) // updates with window size
	me.activeCamera = undefined
	me.updatables = []

	document.body = document.createElement("body");
	document.body.style.margin = 0
	document.body.style.overflow = "hidden"
	document.body.appendChild(me.renderer.domElement);

	var animate = function(){

		requestAnimationFrame(animate);
		for(var i=0; i<me.updatables.length; i++){
			me.updatables[i].update()
		}

		if(me.activeCamera != undefined){
			var cam = me.activeCamera
			if(cam.isPerspectiveCamera){
				cam.aspect = me.resolution.x/me.resolution.y;
			}
			else if(cam.isOrthographicCamera){
				cam.right = cam.top / me.resolution.y*me.resolution.x
				cam.left = -cam.right
			}
			cam.updateProjectionMatrix();
			me.renderer.render(me.scene, me.activeCamera);
		}
	}
	animate();

	var onResize = function(){
		var w = window.innerWidth
		var h = window.innerHeight
		me.renderer.setSize(w, h);
		me.resolution.x = w
		me.resolution.y = h
	}
	window.addEventListener('resize', onResize, false)
	onResize()

	me.get = function(obj){ // so we can access objects by name or by reference
		if(typeof(obj) === "string"){
			var elem = document.getElementById(obj)
			if(elem != null){
				return elem
			}
			else{
				return me.scene.getObjectByName(obj)
			}
		}
		else{
			return obj
		}
	}

	// delete an object from the scene
	me.remove = function(obj){
		var o = me.get(obj)
		o.parent.remove(o)
	}

	// hide an object
	me.hide = function(obj){
		me.get(obj).visible = false
	}

	// stop hiding an object
	me.show = function(obj){
		me.get(obj).visible = true
	}

	// set the transformation of an object
	me.settf = function(obj, tf){
		var o = me.get(obj)
		tf.decompose(o.position, o.quaternion, o.scale)
	}

	// post-multiply a transformation to an object's transformation (move it in it's local system)
	me.localtf = function(obj, tf){
		var o = me.get(obj)
		var T = o.matrix.clone()
		T.multiply(tf)
		me.settf(o, T)
	}

	// pre-multiply a transformation to an object's transformation (move it in the world system)
	me.globaltf = function(obj, tf){
		var o = me.get(obj)
		var T = o.matrix.clone()
		T.premultiply(tf)
		me.settf(o, T)
	}

	function parseColor(color, css = false){
		if(Array.isArray(color) && color.length == 3){
			if(css){
				return "RGB(" + color[0]*255 + ", " + color[1]*255 + ", " + color[2]*255 + ")"
			}
			else{
				return new THREE.Color(color[0], color[1], color[2])
			}
		}
		else{
			if(css){
				return color
			}
			else{
				return new THREE.Color(color)
			}
		}
	}

	me.background = function(color){
		me.scene.background = parseColor(color)
	}
	me.background("lightgray")

	me.setcolor = function(obj, color){
		var o = me.get(obj)
		if(o.tagName != undefined){
			o.style.backgroundColor = parseColor(color, true)
		}
		else{
			o.material.color = parseColor(color)
		}
	}

	var cameraCounter = 0
	me.camera = function(options){
		var params = Object.assign({
			name: "camera" + cameraCounter++,
			parent: me.scene,
			pose: me.homo({type:"translate", z:1}),
			type: "perspective",
			fy: 2, // vertical focal length, screen-size of an object at distance 1 in front of the camera where 1 fills half the screen and corresponds to 90deg field of view
			near: 0.01,
			far: 100
		}, options)

		var cam
		if(params.type === "perspective"){
			cam = new THREE.PerspectiveCamera(Math.atan(1.0/params.fy)/Math.PI*180*2, 1, params.near, params.far);
		}
		else if(params.type === "orthographic"){
			cam = new THREE.OrthographicCamera(-1.0/params.fy, 1.0/params.fy, 1.0/params.fy, -1.0/params.fy, params.near, params.far);
		}
		cam.name = params.name
		me.settf(cam, params.pose)
		me.get(params.parent).add(cam)
		me.activeCamera = cam

		return cam
	}

	me.setcam = function(cam){
		me.activeCamera = me.get(cam)
	}

	me.orbit = function(options){
		var params = Object.assign({
			camera: me.activeCamera,
			up: [0,0,1],
			target: [0,0,0]
		}, options)

		var cam = me.get(params.camera)
		cam.up.fromArray(params.up)
		var controls = new THREE.OrbitControls(cam, me.renderer.domElement)
		controls.target.fromArray(params.target)
		controls.screenSpacePanning = true

		return controls
	}

	var nodeCounter = 0
	me.node = function(options){
		var params = Object.assign({
			name: "node" + nodeCounter++,
			parent: me.scene,
			pose:me.homo()
		}, options)

		var object = new THREE.Object3D()
		object.name = params.name
		me.settf(object, params.pose)
		me.get(params.parent).add(object);

		return object
	}

	var lightCounter = 0
	me.light = function(options){
		var params = Object.assign({
			name: "light" + lightCounter++,
			parent: me.scene,
			type: "point",
			color: "white",
			pose:me.homo()
		}, options)

		var light

		if(params.type === "ambient"){
			light = new THREE.AmbientLight(parseColor(params.color));
		}

		if(params.type === "point"){
			light = new THREE.PointLight(parseColor(params.color));
		}

		if(params.type === "directional"){
			light = new THREE.DirectionalLight(parseColor(params.color));
			light.position.set(0,0,0)
			var target = new THREE.Object3D()
			target.position.set(0,0,-1)
			light.add(target)
			light.target = target
		}

		if(params.type === "spot"){
			light = new THREE.SpotLight(parseColor(params.color));
			if("angle" in params){
				light.angle = params.angle
			}
			light.position.set(0,0,0)
			light.penumbra = 0.5
			var target = new THREE.Object3D()
			target.position.set(0,0,-1)
			light.add(target)
			light.target = target
		}

		light.name = params.name
		me.settf(light, params.pose)

		me.get(params.parent).add(light)

		return light
	}

	var meshCounter = 0
	me.mesh = function(options){
		var params = Object.assign({
			name: "mesh" + meshCounter++,
			parent: me.scene,
			vertices: [],
			normals: [],
			faces: [],
			color: "white",
			pose: me.homo()
		}, options)

		var geometry = new THREE.Geometry();

		for(var i in params.vertices){
			geometry.vertices.push(new THREE.Vector3().fromArray(params.vertices[i]))
		}

		if(params.faces.length == 0){ // faces not defined, make one face per three vertices
			for(var i=0; i<params.vertices.length; i+=3){
				if(params.normals.length == 0){
					geometry.faces.push(new THREE.Face3(i, i+1, i+2))
				}
				else{
					geometry.faces.push(new THREE.Face3(i, i+1, i+2, [
						new THREE.Vector3().fromArray(normals[i]),
						new THREE.Vector3().fromArray(normals[i+1]),
						new THREE.Vector3().fromArray(normals[i+2])
					]))
				}
			}
		}
		else{
			for(var i in params.faces){
				if(params.normals.length == 0){
					geometry.faces.push(new THREE.Face3(
						params.faces[i][0],
						params.faces[i][1],
						params.faces[i][2]
					))
				}
				else{
					geometry.faces.push(new THREE.Face3(
						params.faces[i][0],
						params.faces[i][1],
						params.faces[i][2], [
							new THREE.Vector3().fromArray(normals[params.faces[i][0]]),
							new THREE.Vector3().fromArray(normals[params.faces[i][1]]),
							new THREE.Vector3().fromArray(normals[params.faces[i][2]])
						]
					))
				}
			}
		}

		geometry.computeFaceNormals();

		if(params.normals.length == 0){
			geometry.computeVertexNormals();
		}

		var object = new THREE.Mesh(
			geometry, new THREE.MeshPhongMaterial({
				color:parseColor(params.color),
				side: THREE.DoubleSide
			})
		);
		object.name = params.name
		me.settf(object, params.pose)

		me.get(params.parent).add(object);

		return object
	}

	var pictureCounter = 0
	me.picture = function(options){

		var params = Object.assign({
			name: "picture" + pictureCounter++,
			parent: me.scene,
			pose: me.homo(),
			source: ""
		}, options)

		console.log(options.source)
		var pic = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(params.source), transparent:true})
		)
		pic.name = params.name
		me.settf(pic, params.pose)

		params.parent.add(pic)

		return pic
	}

	var lineCounter = 0
	me.line = function(options){
		// todo: orthographic camera, units

		var params = Object.assign({
			name: "line" + lineCounter++,
			parent: me.scene,
			pose: me.homo(),
			vertices: [[0, 0, 0], [1, 0, 0]],
			width: 3,
			unit: "px",
			color: "black"
		}, options)

		var material = new THREE.MeshBasicMaterial({color:parseColor(params.color), side: THREE.DoubleSide})
		var geometry = new THREE.Geometry()

		var line = new THREE.Mesh(geometry, material);
		line.name = params.name
		var controlPoints = []
		var controlPointsCam = []
		var directions = []

		for(var icp=0; icp<params.vertices.length; icp++){
			controlPoints.push(new THREE.Vector3().fromArray(params.vertices[icp]))
			controlPointsCam.push(new THREE.Vector3()) // updated per frame
		}

		for(var iseg=0; iseg<params.vertices.length-1; iseg++){
			directions.push(controlPoints[iseg+1].clone().sub(controlPoints[iseg]).normalize())
			for(var i=0; i<5; i++){
				geometry.vertices.push(new THREE.Vector3())
			}
			geometry.vertices[iseg*5].copy(controlPoints[iseg])
			if(iseg < params.vertices.length){
				geometry.faces.push(new THREE.Face3(iseg*5+1, iseg*5+4, iseg*5+2))
				geometry.faces.push(new THREE.Face3(iseg*5+1, iseg*5+3, iseg*5+4))
				if(iseg >= 1){
					geometry.faces.push(new THREE.Face3(iseg*5+0, iseg*5+2, (iseg-1)*5+4))
					geometry.faces.push(new THREE.Face3(iseg*5+0, iseg*5+1, (iseg-1)*5+3))
					geometry.faces.push(new THREE.Face3(iseg*5+0, iseg*5+1, (iseg-1)*5+4))
					geometry.faces.push(new THREE.Face3(iseg*5+0, iseg*5+2, (iseg-1)*5+3))
				}
			}
		}

		var camxObj = new THREE.Vector3()
		var camyObj = new THREE.Vector3()
		var camz = new THREE.Vector3()
		var cpWorld = new THREE.Vector3()
		var p1 = new THREE.Vector3()
		var p2 = new THREE.Vector3()
		var p1Obj = new THREE.Vector3()
		var p2Obj = new THREE.Vector3()
		var dir = new THREE.Vector3()
		var fx, fy, dx1, dy1, dx2, dy2
		var scale = new THREE.Vector3()

		line.userData.update = function(){

			if(me.activeCamera == undefined){return}
			me.activeCamera.matrixWorld.extractBasis(camxObj, camyObj, camz)
			objInvNml = new THREE.Matrix3().setFromMatrix4(line.matrixWorld).transpose()
			camxObj.applyMatrix3(objInvNml)
			camyObj.applyMatrix3(objInvNml)

			for(var icp=0; icp<params.vertices.length; icp++){
				cpWorld.copy(controlPoints[icp]).applyMatrix4(line.matrixWorld)
				controlPointsCam[icp].copy(cpWorld).project(me.activeCamera)
				controlPointsCam[icp].z = cpWorld.sub(me.activeCamera.position).dot(camz) // don't use cpWorld after me, it's altered
			}

			for(var iseg=0; iseg<(params.vertices.length-1); iseg++){
				p1.copy(controlPointsCam[iseg])
				p2.copy(controlPointsCam[iseg+1])
				p1Obj.copy(controlPoints[iseg])
				p2Obj.copy(controlPoints[iseg+1])

				var clip = -me.activeCamera.near
				if(p1.z > clip && p2.z <= clip){
					var q = (clip-p1.z)/(p2.z-p1.z)
					p1.lerp(p2, q)
					p1Obj.lerp(p2Obj, q)
				}
				if(p2.z > clip && p1.z <= clip){
					var q = (clip-p2.z)/(p1.z-p2.z)
					p2.lerp(p1, q)
					p2Obj.lerp(p1Obj, q)
				}

				scale.set(me.resolution.x/2, me.resolution.y/2,	0)

				fx = me.activeCamera.projectionMatrix.elements[0]
				fy = me.activeCamera.projectionMatrix.elements[5]

				// dir is now line direction in screen coordinates
				dir.copy(p2).sub(p1).multiply(scale).normalize()

				var w = params.width/2
				if(params.unit === "%"){
					w *= me.resolution.y/100.0
				}

				if(params.unit === "px" || params.unit === "%"){
					dx1 =  dir.y / fx / scale.x * w
					dy1 = -dir.x / fy / scale.y * w
					dx2 =  dir.y / fx / scale.x * w
					dy2 = -dir.x / fy / scale.y * w
					if(me.activeCamera.isPerspectiveCamera){
						dx1 *= p1.z
						dy1 *= p1.z
						dx2 *= p2.z
						dy2 *= p2.z
					}
				}
				else if(params.unit === "world"){
					dx1 = dir.y * w
					dy1 = -dir.x * w
					dx2 = dir.y * w
					dy2 = -dir.x * w
				}

				geometry.vertices[iseg*5+1].copy(p1Obj).addScaledVector(camxObj, -dx1).addScaledVector(camyObj, -dy1)
				geometry.vertices[iseg*5+2].copy(p1Obj).addScaledVector(camxObj,  dx1).addScaledVector(camyObj,  dy1)

				geometry.vertices[iseg*5+3].copy(p2Obj).addScaledVector(camxObj, -dx2).addScaledVector(camyObj, -dy2)
				geometry.vertices[iseg*5+4].copy(p2Obj).addScaledVector(camxObj,  dx2).addScaledVector(camyObj,  dy2)
			}

			geometry.verticesNeedUpdate = true
			line.verticesNeedUpdate = true
		}

		//me.settf(line, params.pose)

		line.userData.update()
		me.updatables.push(line.userData)

		me.get(params.parent).add(line);

		return line
	}

	var dotCounter = 0
	me.dot = function(options){
		var params = Object.assign({
			name: "dot" + dotCounter++,
		}, options)

		var vertices = []
		var faces = []

		for(var i=-1; i<=1; i++){
			for(var j=-1; j<=1; j++){
				for(var k=-1; k<=1; k++){
					if(i!=0 || j!=0 || k!=0){
						r = Math.sqrt(i*i+j*j+k*k)
						vertices.push([i/r,j/r,k/r])
					}
				}
			}
		}

		faces.push(
			[0,1,4], [0,4,3], [1,2,4], [2,5,4], [3,4,6], [4,7,6], [4,5,8], [4,8,7],
			[6,7,15], [6,15,14], [7,8,15], [8,16,15], [15,16,25], [15,25,24], [14,15,23], [15,24,23],
			[2,11,13], [2,13,5], [11,19,13], [19,22,13], [13,22,25], [13,25,16], [5,13,8], [13,16,8],
			[0,10,1], [0,9,10], [1,10,2], [2,10,11], [11,10,19], [18,19,10], [9,17,10], [10,17,18],
			[0,3,12], [0,12,9], [9,12,17], [12,20,17], [12,23,20], [12,14,23], [3,6,12], [6,14,12],
			[17,20,21], [17,21,18], [18,21,19], [19,21,22], [21,24,25], [21,25,22], [20,23,21], [21,23,24]
		)

		Object.assign(params, {vertices:vertices, faces:faces})
		return me.mesh(params)
	}

	var textCounter = 0
	me.text = function(options){
		var params = Object.assign({
			name: "text" + textCounter++,
			parent: me.scene,
			type:"mesh",
			text:"Text",
			height:1,
			extrude:0.01,
			font:"sans",
			color:"black",
			pose:me.homo(),
			resolution:128
		}, options)

		if(params.type === "raster"){
			var height = params.resolution

			var textCanvas = document.createElement('canvas');
			//me.textCanvas.style.border = "solid 1px red"
			//document.body.appendChild(me.textCanvas);

			textCanvas.height = height;
			var ctx = textCanvas.getContext("2d");
			ctx.font = height + "px Arial"
			var width = Math.ceil(ctx.measureText(params.text).width)
			textCanvas.width = width
			ctx.font = height + "px Arial"
			ctx.fillStyle = params.color
			ctx.textBaseline = "top"
			ctx.globalAlpha = 1.0
			ctx.fillText(params.text, 0, 0)

			var texture = new THREE.Texture(textCanvas)
			var material = new THREE.MeshBasicMaterial({ map: texture, transparent:true, side:THREE.DoubleSide })
			geometry = new THREE.PlaneGeometry(width/height, 1)
			object = new THREE.Mesh(geometry, material)
			object.name = params.name
			texture.needsUpdate = true;
			texture.minFilter = THREE.NearestFilter
			texture.magFilter = THREE.NearestFilter

			me.get(params.parent).add(object)
			me.settf(object, params.pose)
			return object
		}
		else if(params.type === "mesh"){
			var loader = new THREE.FontLoader();

			var fonts = {
				"sans":      me.root + "/fonts/DejaVu_Sans_Book.json",
				"sansbold":  me.root + "/fonts/DejaVu_Sans_Book.json",
				"serif":     me.root + "/fonts/DejaVu_Serif_Book.json",
				"serifbold": me.root + "/fonts/DejaVu_Serif_Book.json",
				"mono":      me.root + "/fonts/DejaVu_Sans_Mono_Book.json",
				"monobold":  me.root + "/fonts/DejaVu_Sans_Mono_Bold.json"
			}

			loader.load(fonts[params.font], function(font){

				var geometry = new THREE.TextGeometry(params.text,{
					font: font,
					size: params.height,
					height: params.extrude,
					curveSegments: 12,
					bevelEnabled: false
				});
				var material = new THREE.MeshPhongMaterial({color:parseColor(params.color), side: THREE.DoubleSide})
				var object = new THREE.Mesh( geometry, material );

				me.get(params.parent).add(object)
				me.settf(object, params.pose)

			});
			return // async function, no return value
		}
	}

	var csysCounter = 0
	me.csys = function(options){
		var params = Object.assign({
			name: "csys" + csysCounter++,
			parent: me.scene,
			pose:me.homo(),
			length:1
		}, options)

		var pn = params.name

		var object = me.node({name:pn, parent:me.get(params.parent), pose:params.pose})
		me.line(Object.assign(params, {name: pn+"x", parent: pn, pose:me.homo(), vertices:[[0,0,0], [params.length,0,0]], color:"red"}))
		me.line(Object.assign(params, {name: pn+"y", parent: pn, pose:me.homo(), vertices:[[0,0,0], [0,params.length,0]], color:"limegreen"}))
		me.line(Object.assign(params, {name: pn+"z", parent: pn, pose:me.homo(), vertices:[[0,0,0], [0,0,params.length]], color:"dodgerblue"}))

		return object
	}

	var modelCounter = 0
	me.model = function(options){
		var params = Object.assign({
			name: "model" + modelCounter++,
			parent: me.scene,
			type: "",
			source: "",
			pose:me.homo(),
			color:null
		}, options)

		var loader

		if(params.type == "obj"){
			loader = new THREE.OBJLoader()
			loader.load(
				params.source,
				function(object){
					me.settf(object, params.pose)
					object.name = params.name
					if(params.color != null){
						for(var i=0; i<object.children.length; i++){
							object.children[i].material.color = parseColor(params.color)
						}
					}
					me.get(params.parent).add(object)
				}
			)
		}
		else if(params.type == "dae"){
			loader = new THREE.ColladaLoader()
			loader.load(
				params.source,
				function(object){
					me.settf(object.scene, params.pose)
					object.scene.name = params.name
					if(params.color != null){
						for(var i=0; i<object.scene.children.length; i++){
							object.scene.children[i].material.color = parseColor(params.color)
						}
					}
					me.get(params.parent).add(object.scene)
				}
			)
		}
		else{
			return
		}

		// async function, no return
	}

	var buttonCounter = 0
	me.button = function(options){
		var params = Object.assign({
			x: 0.9,
			y: 0.01 + buttonCounter*0.1,
			w: 0.09,
			h: 0.08,
			name: "button" + buttonCounter++,
			text: "Button " + buttonCounter
		}, options)
		var butt = document.createElement("button")
		butt.style.position = "absolute"
		butt.style.left = (100*params.x) + "%"
		butt.style.top = (100*params.y) + "%"
		butt.style.width = (100*params.w) + "%"
		butt.style.height = (100*params.h) + "%"
		butt.innerHTML = params.text
		butt.id = params.name
		if("color" in params){
			butt.style.backgroundColor = parseColor(params.color, true)
		}
		document.body.appendChild(butt)
		return butt
	}
}


Brovi.prototype.homo = function(options){
	var params = Object.assign({
		type:"eye"
	}, options)

	if(params.type === "eye"){
		return new THREE.Matrix4()
	}
	else if(params.type === "4x4rowmaj" || params.type === "4x4colmaj"){
		var vals
		if(params.values.length == 4){ // also accept [[....],[....],[....],[....]] notation
			vals = params.values[0].concat(params.values[1], params.values[2], params.values[3])
		}
		else{ // [.... .... .... ....] notation
			vals = params.values
		}
		if(params.type === "4x4rowmaj"){
			return new THREE.Matrix4().fromArray(vals).transpose()
		}
		else{
			return new THREE.Matrix4().fromArray(vals)
		}
	}
	else if(params.type === "3x3rowmaj" || params.type === "3x3colmaj"){
		var line1, line2, line3
		if(params.values.length == 3){
			line1 = new THREE.Vector3().fromArray(params.values[0])
			line2 = new THREE.Vector3().fromArray(params.values[1])
			line3 = new THREE.Vector3().fromArray(params.values[2])
		}
		else{
			line1 = new THREE.Vector3(params.values[0], params.values[3], params.values[6])
			line2 = new THREE.Vector3(params.values[1], params.values[4], params.values[7])
			line3 = new THREE.Vector3(params.values[2], params.values[5], params.values[8])
		}
		if(params.type === "4x4rowmaj"){
			return new THREE.Matrix4().makeBasis(line1, line2, line3)
		}
		else{
			return new THREE.Matrix4().makeBasis(line1, line2, line3).transpose()
		}
	}
	else if(params.type === "quat"){
		var w=1, x=0, y=0, z=0
		if("wxyz" in params){
			w = params.wxyz[0]; x = params.wxyz[1]; y = params.wxyz[2]; z = params.wxyz[3]
		}
		else if("xyzw" in params){
			x = params.xyzw[0]; y = params.xyzw[1]; z = params.xyzw[2]; w = params.xyzw[3]
		}
		else{
			w = params.w; x = params.x; y = params.y; z = params.z
		}
		return new THREE.Matrix4().makeRotationFromQuaternion(
			new THREE.Quaternion(x, y, z ,w)
		)
	}
	else if(params.type === "translate"){
		var x=0, y=0, z=0
		if("xyz" in params){
			x = params.xyz[0]; y = params.xyz[1]; z = params.xyz[2]
		}
		if("x" in params){x = params.x}
		if("y" in params){y = params.y}
		if("z" in params){z = params.z}

		return new THREE.Matrix4().makeTranslation(x, y, z)
	}
	else if(params.type === "rotate"){
		if(params.axis === "x"){
			return new THREE.Matrix4().makeRotationX(params.angle)
		}
		else if(params.axis === "y"){
			return new THREE.Matrix4().makeRotationY(params.angle)
		}
		else if(params.axis === "z"){
			return new THREE.Matrix4().makeRotationZ(params.angle)
		}
		else{
			return new THREE.Matrix4().makeRotationAxis(new THREE.Vector3().fromArray(params.axis), params.angle)
		}
	}
	else if(params.type === "scale"){
		var x=1, y=1, z=1
		if("xyz" in params){
			if(Array.isArray(params.xyz) && params.xyz.length==3){
				x = params.xyz[0];  y = params.xyz[1];  z = params.xyz[2]
			}
			else{
				x = params.xyz;  y = params.xyz;  z = params.xyz
			}
		}
		if("x" in params){x = params.x}
		if("y" in params){y = params.y}
		if("z" in params){z = params.z}

		return new THREE.Matrix4().makeScale(x, y, z)
	}
}

// me function wants an array of matrices
// chain([ homo({type:"translate", x:5}), homo({type:"scale", xyz:2}) ])
Brovi.prototype.chain = function(matrices){
	var result = new THREE.Matrix4() // identity
	for(var i in matrices){
		result.multiply(matrices[i])
	}
	return result
}

// convenience function so you don't end up in a parentheses hell
// me function wants matrix construction parametersets as individual arguments
// homoChain( {type:"translate", x:5}, {type:"scale", xyz:2} )
Brovi.prototype.homoChain = function(){
	// (pun not intended)

	var result = new THREE.Matrix4() // identity
	for(var i in arguments){
		result.multiply(Brovi.prototype.homo(arguments[i]))
	}
	return result
}

Brovi.prototype.title = function(txt){document.title = txt}
