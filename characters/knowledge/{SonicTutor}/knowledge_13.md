The data stored on the network might eventually be deleted, with or without notice.

require; // Replace this private key with your Sonic account private key const SONIC_PRIVATE_KEY = "YOUR SONIC TEST ACCOUNT PRIVATE KEY"; module.exports = { solidity: "0.8.26", networks: { sonic: { url: "https://rpc.blaze.soniclabs.com", accounts: } } };

Verifying your smart contract makes its source code publicly visible and auditable on the block explorer, creating transparency and trust.

Here are the recommended methods to verify contracts on the Sonic mainnet explorer and the Sonic Blaze testnet explorer.

— Method 1: Hardhat Veri cation — Method 2: Programmatic Veri cation — Method 3: Manual Veri cation — Method 4: Flattened Source — Troubleshooting The most streamlined way to verify contracts is using Hardhat with hardhat-toolbox:

Con gure hardhat.config.js : npm install --save-dev @nomicfoundation/hardhat-toolbox

Store your SonicScan API key in a .env  le: require; module.exports = { solidity: "0.8.26", networks: { sonic: { url: "https://rpc.soniclabs.com", chainId: 146, accounts: }, sonicTestnet: { url: "https://rpc.blaze.soniclabs.com", chainId: 57054, accounts: } }, etherscan: { apiKey: { sonic: "YOUR_SONICSCAN_API_KEY", sonicTestnet: "YOUR_SONICSCAN_TESTNET_API_KEY" }, customChains: } }; API_KEY=your_sonicscan_api_key

Verify your contract: For automated deployments, you can verify contracts programmatically in your deployment scripts: If automated methods fail, you can verify manually through the explorer interface:

Complete the captcha and submit For contracts with complex dependencies that fail standard veri cation:

- Use this^  le for manual veri cation Common veri cation issues to check: npm install --save-dev hardhat-flattener npx hardhat flatten contracts/YourContract.sol > flattened.sol