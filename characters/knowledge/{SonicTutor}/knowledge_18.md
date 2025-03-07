Advanced Solidity Syntax Build With Guided Projects Practical Frameworks — Foundry Smart Contract Security Explore More Resources on Sonic 5   7  

Nodes are interconnected devices, usually software run on servers, that maintain the Sonic network by storing a full or partial copy of the chain, validating transactions, and ensuring consensus to keep the system secure and decentralized.

Archive Node Stores the entire history of the chain since the genesis block but does not validate transactions or create new blocks.

Validator Node Validates transactions and creates new blocks to securely power and maintain the integrity of the network.

Archive nodes store the entire history of the Sonic chain, including all historical states, transactions, and blocks since the genesis block.

These nodes handle historical data requests, useful for chain explorers or apps that require historical chain information.

However, they do not validate transactions or create new blocks, which is the role of validator nodes.

To run an archive node on the Sonic mainnet or Blaze testnet, follow the steps below.

The minimal con guration for a Sonic archive node is a Linux server with 4 vCPU, 32 GB of RAM, and local SSD storage.

We recommend at least 8 vCPU and 64 GB of RAM, but 128GB of RAM is generally preferable for high-demand nodes.