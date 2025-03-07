###### ◦ Implementation: 0xE34e6851a4a3763e1d27aa7ac5980d2D33C2d315

###### ◦ Implementation: 0x0B3fe0c10C050270a9bc34271987989B6CF2107C

###### ◦ Implementation: 0x1071405A4736535C545580064039A235827ee6D4

###### ◦ Implementation: 0x0c40Ae1c82401EA741953D3f026ADc07BE9e7943

###### ◦ 0xa1E2481a9CD0Cb0447EeB1cbc26F1b3fff3bec20

###### ◦ Implementation: 0x4cbd824685F1E21B119F230B54d65C5a7D2a5330

- DirectExitAdministrator Gateway Infrastructure :

###### ◦ 0xB0bECf0fBfE431D42bA0FbD8dFBFbB0DCFd62Da4

###### ◦ Implementation: 0x13bd43A6BE5795D4A4E3Efc4baC21Cd36Ae9e68A

// Network RPC endpoints const ETHEREUM_RPC = "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"; const SONIC_RPC = "https://rpc.soniclabs.com"; // Initialize providers const ethProvider = new ethers.providers.JsonRpcProvider; const sonicProvider = new ethers.providers.JsonRpcProvider; // Initialize signer with your private key const PRIVATE_KEY = "your-private-key"; const ethSigner = new ethers.Wallet; const sonicSigner = new ethers.Wallet; async function bridgeToSonic { // 1.