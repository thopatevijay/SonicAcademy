# Sonic Agent Academy Plugin

The `sonic-agent-academy-plugin` is a custom plugin for the ElizaOS framework that creates personalized, text-based lessons about the Sonic blockchain. It adjusts content based on a user’s age, learning style, and experience level.

- **Purpose**: Deliver tailored blockchain education.
- **Key Feature**: Generates markdown lessons customized to user inputs.

## .env Configuration

Create a `.env` file in the `agent` directory with the following variables:

```env
GOOGLE_GENERATIVE_AI_API_KEY=
SERVER_PORT=8080
# When true, disables interactive chat mode for background process operation
DAEMON_PROCESS=false

```