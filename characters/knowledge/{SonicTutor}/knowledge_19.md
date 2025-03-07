You will need ≈1TB of free local SSD space to achieve good performance and speed.

The con guration details depend on your speci c use case.

The IOPS throughput and random access latency of the state DB persistent storage determine the performance of Sonic.

For a smooth installation and fast response time, we recommend a local NVMe or a local SSD drive.

AWS Elastic Block Store , does not provide the required latency and IOPS performance.

The system  rewall must allow TCP and UDP connections from/to port 5050.

Building the Sonic binary requires the essential software compilation tools and the Go language version 1.22 or newer to be available.

Please refer to your Linux distribution manuals to obtain the development tools installed on your system.

Download the Sonic source code from the following GitHub repository.

Build the Sonic binary using the provided con guration.