Approve token spending const token = new ethers.Contract const approveTx = await token.approve; // 3.

Deposit tokens const deposit = new ethers.Contract, tokenAddress, amount); const receipt = await tx.wait; return { transactionHash: receipt.transactionHash, mintedToken, blockNumber: receipt.blockNumber, depositId: receipt.events.find.args.id }; }

async function waitForStateUpdate { const stateOracle = new ethers.Contract { const currentBlockNum = await stateOracle.lastBlockNum; if { return; } await new Promise); // Check } } async function generateProof { // Generate storage slot for deposit const storageSlot = ethers.utils.keccak256; // Encode proof in required format return ethers.utils.RLP.encode ]); } async function claimOnSonic // 1.

Wait for state oracle update console.log; await waitForStateUpdate; // 2.

Generate proof console.log; const proof = await generateProof; // 3.

Claim tokens with proof const bridge = new ethers.Contract; const receipt = await tx.wait; return receipt.transactionHash; }

Initiate withdrawal const bridge = new ethers.Contract, originalToken, amount); const receipt = await tx.wait; return { transactionHash: receipt.transactionHash, blockNumber: receipt.blockNumber, withdrawalId: receipt.events.find.a }; }

async function waitForEthStateUpdate { const stateOracle = new ethers.Contract { const currentBlockNum = await stateOracle.lastBlockNum; if { return; } await new Promise); // Check } } async function generateWithdrawalProof { // Generate storage slot for withdrawal const storageSlot = ethers.utils.keccak256; // Encode proof in required format return ethers.utils.RLP.encode ]); } async function claimOnEthereum; await waitForEthStateUpdate; // 2.

Generate proof console.log; const proof = await generateWithdrawalProof; // 3.

Claim tokens with proof const deposit = new ethers.Contract; const receipt = await tx.wait; return receipt.transactionHash; }