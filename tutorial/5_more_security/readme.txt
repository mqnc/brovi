
But maybe we don't want the server to have full control over the website because we only created
the website as a render output with predefined functions and we only want the server (which might
be created by someone else) to be able to access these functions.

We can do this by not sending naked js functions through the network but wrapping them as remote
procedure calls (RPC), for instance using the JSON format. The client then has to interpret them.

A call could look like this:

{"fn":"setObjectColor", "args":["blue"]}

but feel free to create your own message format. Many programming languages implement some sort of
JSON library and it is a very flexible and convenient format.

There is even an official JSON-RPC format:
https://de.wikipedia.org/wiki/JSON-RPC
