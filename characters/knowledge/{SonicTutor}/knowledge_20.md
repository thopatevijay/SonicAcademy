Transfer the new binaries to the bin folder for system-wide access .

Download the most recent network archive genesis  le for the Sonic mainnet or Blaze testnet.

The genesis  le will be used to prime your local state database and will allow you to join the network and synchronize with it.

Please check the downloaded genesis  le using the provided checksum.

git clone https://github.com/Fantom-foundation/Sonic.git git fetch --tags && git checkout -b v2.0.1 tags/v2.0.1 make all sudo cp build/sonic* /usr/local/bin/ wget https://genesis.soniclabs.com/sonic-mainnet/genesis/sonic.g wget https://genesis.soniclabs.com/sonic-mainnet/genesis/sonic.g.md5 md5sum --check sonic.g.md5

Use the sonictool app to prime a validated archive state database for the Sonic client.

The last step of the genesis processing is the state validation.

Please double-check that the output log contains the following messages with details about the veri ed state: With the Sonic app created and the database primed in the previous step, you are ready to start the node and synchronize its state with the network.

- Use the node database path from the previous step.

Additional starting  ags may need to be added to start Web3 RPC and WebSocket interfaces on the node.