At launch, the Sonic Gateway will only support bridging four tokens from Ethereum — USDC, EURC, WETH, and FTM.

Our roadmap includes adding more tokens and introducing a permissionless mechanism for anyone to add new tokens for bridging.

While Sonic is not an L2, we are active participants on Ethereum as we spend ETH through the Sonic Gateway contracts.

The Sonic Gateway includes a fail-safe mechanism that allows users to retrieve bridged assets on the original chain if the Gateway experiences a failure.

In the highly unlikely event that the Gateway or the Sonic chain is down for 14 consecutive days, users are able to reclaim their bridged assets on Ethereum.

The 14-day period is immutable and cannot be altered by Sonic Labs or any third party after deployment.

Importantly, this period is not intended as a contest period but rather as an essential feature that ensures users retain custody of their bridged funds on the originating chain.

Assets bridged through the Sonic Gateway are processed in intervals called "heartbeats", ensuring gas e ciency by bundling bridging transactions together.

For assets moving from Ethereum to Sonic, these heartbeats occur every 10 minutes, while Sonic to Ethereum heartbeats occur every hour.

During each interval, all queued transactions are processed simultaneously.