# Sonic Academy Client

The `client` is a Next.js-based frontend for Sonic Academy, offering a gamified interface to learn about the Sonic blockchain and build AI agents.

- **Purpose**: Provide an engaging, interactive learning experience.
- **Key Features**: Displays lessons from the plugin and includes an AI agent builder.
- **How to Use**: Clone the repo, install dependencies (`npm install`), and run (`npm run dev`).

Built with TypeScript and Tailwind CSS. Features a dark, neon-themed design.


## .env Configuration

Create a `.env` file in the `client` directory with the following variables:

```env
NEXT_PUBLIC_PRIVY_APP_ID=
MONGODB_URI=mongo_atlas_uri

# Use the same URL for both of the following keys
NEXT_PUBLIC_CREATE_AGENT_URL=
NEXT_PUBLIC_CREATE_LESSON_URL=

# Contact me on Discord or Telegram (username: thopate_vijay) to get live production URLs
```

Licensed under MIT.