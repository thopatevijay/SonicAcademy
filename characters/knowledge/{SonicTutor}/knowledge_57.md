In our consensus algorithm, an event containing transactions is represented by a vertex in a DAG, and edges represent the relationships between the events.

The edges may represent the dependencies between events indicating the order in which they were added to the DAG.

Events can be created and added to the DAG concurrently.

The blocks do not need to be added in a speci c order, which enables the system to achieve faster transaction times.

It is not limited by the requirement to incorporate blocks sequentially, as is the case with many of the biggest blockchains currently available.

Sonic uses a proof-of-stake, DAG-based, ABFT consensus mechanism.

In this mechanism, each validator has its own local block DAG and batches incoming transactions into event blocks, which they add to their DAG as vertices — each event block is a vertex in the validator’s DAG that is full of transactions.

Before creating a new event block, a validator must  rst validate all transactions in its current event block and part of the ones it has received from other nodes; these are the event blocks it has received during the asynchronous exchange of event blocks explained in the section above.

The new event block then is communicated with other nodes through the same asynchronous event communication.

During this communication, nodes share their own event blocks, and the ones they received from other nodes, with other validators that incorporate them in their own local DAGs.