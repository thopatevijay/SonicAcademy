Google GCP N2D instances with local SSD or AWS i3en.xlarge with instance storage are good options.

- Ubuntu LTS Server or a similar Linux distribution is recommended.

- 1 TB of local SSD/NVMe is su cient for a validator database.

A Sonic node requires both TCP and UDP network tra c allowed on port 5050 by default.

You can use --port <port> to customize this if needed.

You need the essential build tools and the latest Go compiler, version 1.22 or newer, to build the Sonic client and its bundled tools.

Example : Install Go language compiler : sudo apt-get update sudo apt-get install -y build-essential git sudo rm -rf /usr/local/go wget https://go.dev/dl/go1.23.4.linux-amd64.tar.gz sudo tar -xzf go1.23.4.linux-amd64.tar.gz -C /usr/local/ rm -f go1.23.4.linux-amd64.tar.gz sudo tee /etc/profile.d/golang.sh > /dev/null <<EOT export GOROOT=/usr/local/go export GOPATH=\$HOME/go export PATH=\$PATH:\$GOROOT/bin:\$GOPATH/bin EOT source /etc/profile.d/golang.sh

The fastest way is to use a genesis  le from the o cial repository.

For the mainnet, for example: Use sonictool to prime the state database.

Adjust GOMEMLIMIT and --cache according to your available RAM size.