# Sonic Academy

**Sonic Academy** is an innovative platform designed to make learning about the <a href="https://www.soniclabs.com/" target="_blank">Sonic blockchain</a> accessible, engaging, and personalized for everyone. Whether you're a beginner eager to explore blockchain or a developer aiming to build AI agents on Sonic, Sonic Academy provides an intuitive, gamified experience to guide you every step of the way. Built on the <a href="https://elizaos.github.io/eliza/" target="_blank">ElizaOS framework</a>, it opens the door to blockchain education and agent creation for all.

## Table of Contents
- [Project Overview](#project-overview)
- [Use Cases](#use-cases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)


## Project Overview
Sonic Academy redefines blockchain education and AI agent creation by combining personalized learning with a user-friendly AI Builder. Powered by the ElizaOS framework and custom plugins like `sonic-plugin` and `sonic-agent-academy-plugin`, it offers:
- **Interactive Lessons**: Tailored to your age, learning style, and experience level.
- **AI Agent Creation**: Build your own AI agents on the Sonic blockchain in just 1-2 steps, no coding required.
- **Developer Tools**: Plugins to extend Sonic blockchain functionality for technical users.

## Use Cases
Traditional blockchain resources, like documentation, are often static, technical, and geared toward developers. Sonic Academy changes that by addressing these key challenges:
- **Dynamic Learning**: Unlike static docs, Sonic Academy adapts lessons to your unique learning style (e.g., visual, auditory) and experience level, making blockchain approachable for everyone.
- **Inclusive Education**: Non-technical users can learn about the Sonic blockchain without being overwhelmed by jargon-heavy docs, opening the door to a broader audience.
- **Simplified AI Agents**: The concept of AI agents is exciting but often feels exclusive to tech users. Sonic Academy’s AI Builder lets anyone create their own agents on the Sonic blockchain in 1-2 easy steps.
- **Trust and Ownership**: Users don’t have to rely on pre-built AI agents created by others. With Sonic Academy, you build your own, fostering trust and personal connection.
- **Developer Support**: Developers can learn Sonic and integrate the `sonic-plugin` to create advanced agents or blockchain features in their projects.
- **Community Engagement**: Our Twitter AI agent, <a href="https://twitter.com/Prof_S_Academy" target="_blank">Prof.SonicAcademy</a>, educates, engages, and grows the Sonic community—an example of what users can create.

## Features
- **User Interface**: A sleek, gamified UI where users can learn about Sonic and build their own on-chain AI agents.
- **`sonic-plugin`**: A custom ElizaOS plugin powering Sonic blockchain actions:
  - **Actions**: `TRANSFER_TOKEN` and `GET_BALANCE`.
  - **Secure Wallet**: Includes `SonicWalletProvider` for safe transactions.
  - **Integration**: Embedded in the AI Builder for seamless agent creation. Developers can also use it standalone to build Sonic-based agents. <a href="https://github.com/thopatevijay/plugin-sonic" target="_blank">GitHub Link</a>
- **`sonic-agent-academy-plugin`**: A plugin generating personalized Sonic blockchain lessons: <a href="https://github.com/thopatevijay/SonicAcademy/tree/main/agent/src/sonic-agent-academy-plugin" target="_blank">GitHub Link</a>
  - **Personalization**: Lessons adapt to user inputs (age, style, experience).
  - **Extensibility**: Developers can integrate it into their ElizaOS projects to create custom lessons.
  - **Upcoming**: Visual and video lessons in development.
- **AI Builder**: A beginner-friendly tool to create AI agents in easy steps, leveraging `sonic-plugin` for on-chain deployment.
- **Live Twitter AI Agent**: <a href="https://twitter.com/Prof_S_Academy" target="_blank">Prof.SonicAcademy</a> is a real-world example of an AI agent built with Sonic Academy, guiding the community on Twitter. <a href="https://github.com/thopatevijay/Prof.SonicAcademy" target="_blank">GitHub Link</a>


## Tech Stack
- **Frontend**: <a href="https://nextjs.org/" target="_blank">Next.js</a> (v15.2.1) with <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>.
- **Backend**: <a href="https://elizaos.github.io/eliza/" target="_blank">ElizaOS framework</a> with custom plugins (`sonic-plugin`, `sonic-agent-academy-plugin`).
- **Database**: <a href="https://www.mongodb.com/cloud/atlas" target="_blank">MongoDB Atlas</a> for storing agent and lesson data.
- **API**: RESTful API for agent creation and management.
- **Deployment**: <a href="https://vercel.com/" target="_blank">Vercel</a>.


## Installation
To run Sonic Academy locally:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/thopatevijay/SonicAcademy.git
   cd SonicAcademy
   ```

## Usage

1.  **Landing Page**: Enter your age group, learning style, and experience level to get started.
    
2.  **Lessons**: Receive personalized text-based lessons about the Sonic blockchain, powered by sonic-agent-academy-plugin.
    
3.  **AI Builder**: Create your own AI agent in 1-2 steps, deployed on-chain via sonic-plugin.
    
4.  **Developer Use**: Integrate sonic-plugin and sonic-agent-academy-plugin into your ElizaOS projects for custom agents or lessons.


## Future Enhancements

The proof-of-concept is just the beginning! Here’s what’s on the horizon:

-   **More Lessons**: Expand to advanced topics like DeFi strategies and Sonic governance.
    
-   **Agent Marketplace**: Share or sell your agents with the community.
    
-   **Gamified Rewards**: Introduce leaderboards, badges, or staking incentives.
    
-   **Multi-Language Support**: Translate lessons for global users.
    
-   **Advanced Agent Customization**: Enable complex behaviors and additional on-chain actions.
    
-   **Multimedia Lessons**: Add visual and video content to sonic-agent-academy-plugin for diverse learners.
-   **Pro Version**: Launch a subscription-based Pro tier with extra features, including priority support, early access to new lessons, and advanced agent-building tools.


## Contributing

We’d love your help! To contribute:

1.  Fork the repository.
    
2.  Create a branch for your feature or fix.
    
3.  Submit a pull request with a clear description.

## License

This project is licensed under the MIT License.


Built with ❤️ for the Sonic DeFAI Hackathon, March 2025.

