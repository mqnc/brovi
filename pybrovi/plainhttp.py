
import http.server
import socketserver
import threading

def runHttpServer(host, port, directory):

	class Handler(http.server.SimpleHTTPRequestHandler):
		def __init__(self, *args, **kwargs):
			super().__init__(*args, directory=directory, **kwargs)

	server = socketserver.TCPServer((host, port), Handler)
	threading.Thread(target = server.serve_forever, daemon = True).start()
	return server
	
if __name__ == "__main__":

	import time
	runHttpServer("localhost", 8000, ".")
	while True:
		time.sleep(1)