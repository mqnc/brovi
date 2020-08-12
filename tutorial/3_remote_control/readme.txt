
Same example but now we want to call our function from an external program. For this we need that
program to implement a websocket server. On the html side we implement the websocket client:

https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications

Our websocket creates a connection with the server and then just executes everything the server sends.

The server program in this example is written in python and uses this library:
https://websockets.readthedocs.io/en/stable/intro.html#browser-based-example

But it is just an example. You can create websocket servers in any other language as well:
C++
- https://github.com/zaphoyd/websocketpp
- https://doc.qt.io/qt-5/qtwebsockets-index.html
- https://www.boost.org/doc/libs/1_70_0/libs/beast/doc/html/beast/using_websocket.html
C#
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_server
MATLAB:
- https://github.com/jebej/MatlabWebSocket

First run the server, then run the client.
