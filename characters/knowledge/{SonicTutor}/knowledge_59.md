The event block becomes a root event block once the majority of nodes have received it

The root event block is ordered and  nalized into the main chain as a block When a user explores Sonic through a block explorer, they view the  nal blocks on the Sonic main chain.

Event block generation and exchange in validators' DAGs is an internal process only and is not visible to end users.

To better understand the technical aspects of Sonic's consensus mechanism, review the paper on Fantom Opera's consensus mechanism, as Sonic's design is a continuation of it: Lachesis: Scalable Asynchronous BFT on DAG Streams.

Sonic uses database storage to store its world state, which includes account information, virtual machine bytecode, smart contract storage, etc.

This database has a feature called live pruning, which removes historical data automatically, reducing storage needs for validators as the blockchain grows.

Previously, pruning required validator nodes to go o ine, risking  nancial and operational issues for them.

Now, validators can use live pruning without going o ine, ensuring continuous operation and saving on disk space and costs by discarding historical data in real-time.

Live pruning works by splitting the database into two types: LiveDB and ArchiveDB.

The LiveDB contains the world state of the current block only, whereas the ArchiveDB contains the world states of all historical blocks.