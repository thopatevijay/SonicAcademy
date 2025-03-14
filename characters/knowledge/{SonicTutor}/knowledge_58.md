Consequently, this spreads all information through the network.

The process is asynchronous as the event blocks shared between validators are not required to be sequential.

Unlike most blockchains, this DAG-based approach does not force validators to work on the current block that is being produced, which places restrictions on transaction speed and  nality.

Validators are free to create their own event blocks that contain transactions and share these with other validators on the network asynchronously, creating a nonlinear record of transactions.

As an event block is sent and propagated across validators, it becomes a root event block once the majority of validators have received and agreed upon it.

This root event block will eventually be ordered and included in the main chain, which is a blockchain that contains the  nal consensus among all event blocks that have become root event blocks.

Every validator stores and updates a copy of the main chain, which provides quick access to previous transaction history to process new event blocks more e ciently.

As such, Sonic's consensus mechanism combines a DAG-based approach that allows validators to con rm transactions asynchronously, which greatly increases speed, with a  nal blockchain that orders and stores all  nal transactions immutably and inde nitely.

Currently, the process of submitting a transaction and having it added to the Sonic main chain through the consensus mechanism takes approximately 1-2 seconds.

A validator node batches the transaction into a new event block