async function bridgeUSDC { try { // USDC details const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" const amount = ethers.utils.parseUnits; // USDC has 6 de // 1.

Bridge USDC to Sonic console.log; const deposit = await bridgeToSonic; console.log; // 2.

Claim USDC on Sonic console.log; const claimTx = await claimOnSonic; // Later: Bridge back to Ethereum console.log; const withdrawal = await bridgeToEthereum // Claim on Ethereum console.log; console.log; } catch { console.error; throw error; } }

- Ethereum^ →^ Sonic: Monitor StateOracle.lastBlockNum until it's >= deposit block

- Sonic^ →^ Ethereum: Monitor StateOracle.lastBlockNum until it's >= withdrawal block

- Generated using eth_getProof RPC call with correct storage slots

const STATE_ORACLE_ABI = ; const ERC20_ABI = ; const TOKEN_PAIRS_ABI = ; const TOKEN_DEPOSIT_ABI = ; const BRIDGE_ABI = ;

- Claim operations typically cost more gas due to proof veri cation

Sonic Labs has partnered with HackQuest to offer a learning track for anyone who is eager to learn Solidity on Sonic, whether they are a beginner or advanced.

Upon completing the course outlined below, graduates will receive a Sonic Developer Certi cate.