Validators use only LiveDB, while archive nodes have both LiveDB and ArchiveDB to handle historical data requests through the RPC interface.

Sonic's database storage uses e cient tree-like or hierarchical structures, which simpli es data retrieval.

Importantly, it still provides cryptographic signatures for a world state and archive capabilities using an incremental version of a pre x algorithm.

Additionally, it utilizes a native disk format instead of storing the world state indirectly through key-value stores like LevelDB or PebbleDB.

The Sonic chain is secured using a proof-of-stake mechanism.

In PoS on Sonic, validators must lock their S ; if they act maliciously in the network, they lose their tokens.

Validators are incentivized to act in the network's best interest as their own funds are at stake.

Since validators do not need to perform computations, this approach is a much more energy-e cient alternative to proof-of-work for achieving resistance to Sybil attacks.

A Sybil attack is an attack where a malicious actor runs a large number of validators to allow them an unsafe amount of in uence over the network.

PoS makes it costly to set up these validators and allows the network to punish validators for malicious behavior, increasing the costs of attacks.