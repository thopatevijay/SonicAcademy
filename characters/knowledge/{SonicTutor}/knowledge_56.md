This is opposed to PBFT systems, such as Bitcoin, in which the majority of nodes must agree to a block before it becomes  nal, which they must then sequentially order into their blockchain record.

This slows down the network during high tra c; more on this in the consensus mechanism section further below.

Now that we have a basic understanding of Byzantine fault tolerance, let’s delve into the second part of Sonic’s consensus mechanism, directed acyclic graphs.

A graph is a non-linear data structure used to represent objects, called vertices, and the connections between them, called edges.

A directed graph dictates that all its edges, the connections between objects, only  ow in a certain direction.

An acyclic graph does not contain any cycles, which makes it impossible to follow a sequence of edges and return to the starting point.

As such, a directed acyclic graph only  ows in a certain direction and never repeats or cycles.

The diagram below is an example of a directed acyclic graph.

Each oval is a vertex, and the lines connecting them are edges.

The vertices only connect in one direction, downwards, and never repeat.