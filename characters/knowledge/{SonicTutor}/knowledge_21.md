Add the following  ags to enable the Web3 HTTP interface.

Adjust your listening IP address, port, CORS, and list of enabled APIs for your speci c needs.

GOMEMLIMIT=50GiB sonictool --datadir <datadir> --cache 12000 genesis <gene Sonic Mainnet StateDB imported successfully, stateRoot matches module=gossip-store i Blaze Testnet StateDB imported successfully, stateRoot matches module=gossip-store i

Add the following  ags to enable the WebSockets interface.

Adjust your listening IP address, port, origin, and list of enabled APIs for your speci c needs.

Please obtain and explicitly specify the external IP address of your node as a starting  ag to help with the inter-node peer-to-peer connectivity.

--http --http.addr=0.0.0.0 --http.port=18545 --http.corsdomain=* --http.vhosts=* --http.api=eth,web3,net,ftm,txpool,abft,dag,trace,debug --ws --ws.addr=0.0.0.0 --ws.port=18546 --ws.origins=* --ws.api=eth,web3,net,ftm,txpool,abft,dag,trace,debug GOMEMLIMIT=50GiB sonicd --datadir <datadir> --cache 12000 --nat extip:<pub

Validator nodes are critical to the Sonic chain, responsible for validating transactions and creating new blocks in accordance with the consensus protocol.

These nodes ensure the integrity and security of the network by verifying data, participating in block creation, and maintaining the chain’s state.

Unlike archive nodes, validator nodes focus on real-time operations rather than storing extensive historical data or responding to general API requests.