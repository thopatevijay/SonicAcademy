First, the Sonic Blaze testnet serves as a dedicated environment where you can rigorously test your smart contract code and deployments, ensuring everything functions correctly using faucet tokens.

Once your contracts are thoroughly vetted on the Blaze testnet, you can con dently deploy your live apps to the Sonic mainnet, the production environment where end users will interact with your apps.

- Faucet:^ https://testnet.soniclabs.com/account To meet other builders and receive support, join the o cial Sonic builders group.

At the software level, deploying to Sonic is the same as deploying to any other EVM network.

The only difference is which network you connect to.

Use https://rpc.blaze.soniclabs.com as the connection endpoint for the Blaze testnet or https://rpc.soniclabs.com for the mainnet.

For the Blaze testnet, you can use the Sonic Blaze dashboard to obtain an initial amount of S to execute transactions on the testnet.

Here are example con gurations for Hardhat to deploy on the Sonic mainnet or Blaze testnet: Sonic Mainnet require; // Replace this private key with your Sonic account private key const SONIC_PRIVATE_KEY = "YOUR SONIC TEST ACCOUNT PRIVATE KEY"; module.exports = { solidity: "0.8.26", networks: { sonic: { url: "https://rpc.soniclabs.com", accounts: } } }; Blaze Testnet

To deploy, execute npx hardhat run scripts/deploy.js --network sonic.

Please note that the Sonic Blaze testnet is a testing playground designed to showcase technology capabilities.