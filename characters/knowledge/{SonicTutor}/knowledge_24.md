For the most common cases, use 12GiB as -cache and ~90% of RAM as GOMEMLIMIT.

After processing, you should see a con rmation of a successfully imported state.

git clone https://github.com/Fantom-foundation/Sonic.git cd Sonic git fetch --tags && git checkout -b v2.0.1 tags/v2.0.1 make all build/sonicd version sudo mv build/sonic* /usr/local/bin/ wget https://genesis.soniclabs.com/sonic-mainnet/genesis/sonic.g GOMEMLIMIT=54GiB sonictool --datadir ~/.sonic \ --cache 12000 genesis \ --mode validator sonic.g

Now that your database is primed, start the node to synchronize it with the network.

The Sonic node will connect to the network and advance its state by processing new blocks.

Once fully synchronized, the "age" of new blocks should be only a few seconds.

Next, create a wallet to identify and control your validator account.

This wallet must hold the minimum amount you are going to use as the self-stake .

If you choose to create it locally using sonictool: Important: Keep your wallet and keys secure.

Your node needs a validator signing key to participate.