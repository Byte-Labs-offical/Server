# Byte Labs Server Discord Bot

A clean, lightweight, and feature-rich Discord moderation **and verification** bot built for **Byte Labs**. Powered by `discord.js` v14 with native **slash commands** and a local SQLite database — no external database servers required.

## Features

- **Native slash command system** — All commands use Discord's built-in `/command` interface with autocomplete, option validation, and permission gating
- **Auto-registration** — Commands register themselves with Discord on startup; set `GUILD_ID` for instant updates while developing
- **Full moderation suite** — Kick, ban, timeout, mute, warn, purge, nuke, and more
- **Captcha verification** — `/verify` onboarding flow with image captchas, a button panel, modal answer input, per-guild settings, stats, and audit logging
- **Channel management** — Slowmode, lock/unlock, nickname changes
- **Role management** — Add, remove, or toggle roles with a single command
- **Information commands** — Server info, user info, avatar, icon, emoji list, member stats
- **Local database** — SQLite stores user activity, moderation logs, and verification state
- **Role hierarchy protection** — Cannot moderate users or manage roles above your own rank
- **Permission gating** — Each command declares its required permission via `setDefaultMemberPermissions`, plus a runtime safety check
- **Ephemeral errors** — Validation failures reply privately so they don't clutter the channel
- **Error fallback** — Every interaction is wrapped in error handling; the bot stays online even if a single command throws
- **MIT Licensed** — Free to use, modify, and distribute
- **Zero comments** — Clean, self-documenting code

---

## Commands

All commands use Discord's native slash command interface. Type `/` in any channel to browse them.

### Moderation

| Command | Permission | Description |
|---------|------------|-------------|
| `/kick user:[@user] reason:[text]` | Kick Members | Kick a member from the server |
| `/ban user:[@user] reason:[text]` | Ban Members | Ban a member from the server |
| `/unban user_id:[id] reason:[text]` | Ban Members | Unban a user by their ID |
| `/timeout user:[@user] duration:[10m] reason:[text]` | Moderate Members | Timeout a member (e.g., `10m`, `2h`, `1d`) |
| `/mute user:[@user] duration:[10m] reason:[text]` | Moderate Members | Alias behavior for timeout |
| `/unmute user:[@user] reason:[text]` | Moderate Members | Remove a timeout early |
| `/warn user:[@user] reason:[text]` | Moderate Members | Issue a warning (logged to database) |
| `/warnings user:[@user]` | Moderate Members | View all warnings for a member |
| `/purge amount:[1-100]` | Manage Messages | Bulk delete recent messages |
| `/nuke` | Manage Channels | Clone and delete the channel for a clean reset |

### Channel Management

| Command | Permission | Description |
|---------|------------|-------------|
| `/slowmode duration:[seconds\|off]` | Manage Channels | Set channel slowmode (max 21600s / 6h) |
| `/lock` | Manage Channels | Deny @everyone from sending messages |
| `/unlock` | Manage Channels | Restore @everyone's send permission |
| `/nick user:[@user] nickname:[name]` | Manage Nicknames | Change a member's nickname (max 32 chars) |

### Information

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/ping` | Check bot and API latency |
| `/botinfo` | Bot stats: servers, users, uptime, ping, version |
| `/serverinfo` | Server info: owner, members, channels, boosts, roles |
| `/servericon` | Display the server icon at full resolution |
| `/userinfo user:[@user]` | User info: ID, roles, account age, join date |
| `/avatar user:[@user]` | Display a user's avatar at full resolution |
| `/membercount` | Show total, user, bot, and online member counts |
| `/emojilist` | List all server emojis (static and animated) |

### Roles

| Command | Permission | Description |
|---------|------------|-------------|
| `/role action:[add\|remove\|toggle] user:[@user] role:[@role]` | Manage Roles | Add, remove, or toggle a role on a member |

### Verification

The `/verify` command groups all verification administration into subcommands (requires **Manage Server**). Members verify themselves through the panel button — no command needed.

| Command | Description |
|---------|-------------|
| `/verify setup role:[@role] channel:[#channel] log-channel:[#channel]` | Save the verified role, optional panel channel, and optional log channel |
| `/verify settings captcha-length:[4-8] timeout-minutes:[1-30] max-attempts:[1-10] enabled:[true\|false]` | Update verification behavior |
| `/verify panel channel:[#channel]` | Send the verification panel with a **Start Verification** button |
| `/verify config` | Show the current verification configuration and stats |
| `/verify stats member:[@user]` | Show guild verification totals, or a single member's state |
| `/verify reset member:[@user] remove-role:[true\|false]` | Clear a member's active challenge and optionally remove the verified role |

When a member presses **Start Verification**, the bot DMs an ephemeral image captcha with **Enter Captcha** and **Refresh Captcha** buttons. Correct answers grant the verified role; challenges expire automatically after the configured timeout. The bot needs the **Manage Roles** permission and its own role must sit above the verified role.

---

## Project Structure

```
server/
├── src/
│   ├── index.js              # Entry point — loads commands, events, and starts the bot
│   ├── database.js           # SQLite database — users, moderation logs, and verification state
│   ├── utils.js              # Helpers — embed builder, error logging, support link
│   ├── commands/             # All slash commands (one SlashCommandBuilder per file)
│   │   ├── avatar.js
│   │   ├── ban.js
│   │   ├── botinfo.js
│   │   ├── emojilist.js
│   │   ├── help.js
│   │   ├── kick.js
│   │   ├── lock.js
│   │   ├── membercount.js
│   │   ├── mute.js
│   │   ├── nick.js
│   │   ├── nuke.js
│   │   ├── ping.js
│   │   ├── purge.js
│   │   ├── role.js
│   │   ├── servericon.js
│   │   ├── serverinfo.js
│   │   ├── slowmode.js
│   │   ├── timeout.js
│   │   ├── unban.js
│   │   ├── unlock.js
│   │   ├── unmute.js
│   │   ├── userinfo.js
│   │   ├── verify.js
│   │   ├── warn.js
│   │   └── warnings.js
│   ├── verification/             # Verification feature modules
│   │   ├── constants.js          # Default settings, custom IDs, audit limit
│   │   ├── captcha-service.js    # Captcha image generation (@napi-rs/canvas)
│   │   ├── verification-service.js  # Panel, captcha flow, button/modal handling
│   │   ├── custom-id.js          # User-scoped custom ID helpers
│   │   └── messages.js           # Component v2 payloads (panel, config, stats, etc.)
│   └── events/
│       ├── ready.js              # Ready event — presence, command registration, challenge cleanup
│       ├── interactionCreate.js  # Slash command, button, and modal handler
│       └── messageCreate.js      # Lightweight user-activity tracker
├── .github/
│   ├── dependabot.yml            # Automated dependency updates
│   └── PULL_REQUEST_TEMPLATE.md
├── .env.example                  # Environment variable template
├── .gitignore
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE                       # MIT License
├── package.json
└── README.md
```

---

## How Slash Commands Work

Each file in `src/commands/` exports a `data` object (a `SlashCommandBuilder`) and an `execute(interaction)` handler. On startup:

1. `index.js` loads every command file into a `Collection` keyed by command name.
2. The `ready` event collects all command definitions and registers them with Discord:
   - If `GUILD_ID` is set in `.env`, commands register to that single guild and appear **instantly** — ideal for development.
   - If `GUILD_ID` is left blank, commands register **globally** and may take up to ~1 hour to propagate across all servers.
3. When a user runs a command, the `interactionCreate` event looks it up and calls its `execute` handler. The same event also routes verification **button** and **modal** interactions to the verification service.

There is no separate deploy step — registration happens automatically every time the bot starts.

---

## Database Schema

The bot uses a local SQLite database (`data.db`).

### `users`
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PRIMARY KEY | Discord user ID |
| username | TEXT | Current username |
| messages_count | INTEGER DEFAULT 0 | Total messages counted |
| last_seen | DATETIME | Last message timestamp |

### `mod_logs`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Auto-incrementing log ID |
| guild_id | TEXT NOT NULL | Guild where action occurred |
| user_id | TEXT NOT NULL | Target user |
| moderator_id | TEXT NOT NULL | Staff who performed the action |
| type | TEXT NOT NULL | Action type (Kick, Ban, Warn, Timeout, etc.) |
| reason | TEXT DEFAULT 'No reason provided' | Reason for the action |
| created_at | DATETIME | When the action occurred |

> A `guilds` table also exists for forward-compatible per-guild settings; it is not required by the slash command flow.

### `verify_guilds`
Per-guild verification settings and rolling stats.

| Column | Type | Description |
|--------|------|-------------|
| guild_id | TEXT PRIMARY KEY | Guild ID |
| enabled | INTEGER DEFAULT 1 | Whether verification is enabled |
| verified_role_id | TEXT | Role granted after verification |
| panel_channel_id | TEXT | Last channel a panel was sent to |
| log_channel_id | TEXT | Optional verification log channel |
| captcha_length | INTEGER DEFAULT 6 | Captcha character count (4–8) |
| timeout_minutes | INTEGER DEFAULT 5 | Challenge lifetime (1–30) |
| max_attempts | INTEGER DEFAULT 3 | Allowed attempts per challenge (1–10) |
| started / verified / failed / expired / resets / panels_sent | INTEGER | Rolling counters |
| created_at / updated_at | DATETIME | Record timestamps |

### `verify_challenges`
Active captcha challenges, keyed by guild + user.

| Column | Type | Description |
|--------|------|-------------|
| guild_id | TEXT | Guild ID (part of primary key) |
| user_id | TEXT | User ID (part of primary key) |
| answer | TEXT | Expected captcha answer |
| expires_at | TEXT | ISO timestamp when the challenge expires |
| attempt_count | INTEGER DEFAULT 0 | Failed attempts so far |
| created_at | TEXT | When the challenge was issued |

### `verify_audit`
Recent verification events (capped at the newest 200 rows).

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Auto-incrementing entry ID |
| guild_id | TEXT | Guild where the event occurred |
| action | TEXT | Event type (setup_saved, panel_sent, verification_completed, etc.) |
| actor_id | TEXT | User who triggered the event |
| target_id | TEXT | Affected user or role |
| metadata | TEXT | Optional JSON details |
| timestamp | TEXT | ISO timestamp |

---

## Setup

### Prerequisites

- **Node.js** 20.11 or higher
- **Discord Bot Token** — [Create one in the Discord Developer Portal](https://discord.com/developers/applications)

### Installation

```bash
# Clone the repository
git clone https://github.com/Byte-Labs-offical/Server
cd server

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

Edit `.env` and add your bot token plus the dashboard auth settings:

```
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=
PORT=3000
SESSION_SECRET=your_session_secret_here
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback
```

Set `GUILD_ID` to your test server's ID for instant slash command registration, or leave it blank to register globally.

To configure Discord OAuth2, open your application on the Discord Developer Portal and add a Redirect URI matching your callback URL above.

### Running

```bash
# Start the bot
npm start

# Or with auto-restart on file changes
npm run dev
```

On the first successful start you should see a `[COMMANDS] Registered N ... commands` log line. Your slash commands are now available in Discord.

---

## Bot Configuration

### Required Intents

Enable these in the Discord Developer Portal under **Bot > Privileged Gateway Intents** (only the privileged ones need toggling there):

| Intent | Why it's needed |
|--------|----------------|
| **Guilds** | Server info, channels, roles, slash command delivery |
| **Guild Messages** | User-activity tracking |
| **Guild Members** *(privileged)* | Fetching member info, role hierarchy checks |
| **Guild Moderation** | Audit log events for moderation |
| **Guild Presences** *(privileged)* | Online/offline status for membercount |

> The bot no longer requires the **Message Content** intent — commands are handled entirely through Discord's slash command system.

### Required Permissions

The bot needs these permissions to function fully:

- Send Messages
- Manage Messages (purge)
- Kick Members
- Ban Members
- Moderate Members (timeout/mute)
- Manage Channels (lock, slowmode, nuke)
- Manage Nicknames
- Manage Roles

When inviting the bot, include the `applications.commands` scope so it can register slash commands.

---

## Error Handling

- Every command execution is wrapped in a `try/catch` block in `interactionCreate`
- Errors are logged to the console with timestamps
- If a command fails, an ephemeral error message is sent to the user who ran it
- The bot stays online and fully operational even if a single command errors

---

## Security

- **Role hierarchy protection** — Users cannot moderate or manage roles for members with equal or higher roles
- **Bot role protection** — Commands check if the bot has the required permissions before proceeding
- **Self-target prevention** — Users cannot kick, ban, timeout, or warn themselves
- **Permission gating** — Each command declares its required permission and re-verifies it at runtime
- **Managed role protection** — Bot-managed roles (boosters, bot roles) cannot be modified via the role command

See [SECURITY.md](./SECURITY.md) for how to report vulnerabilities.

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

---

## License

MIT — see [LICENSE](./LICENSE).

Copyright (c) 2026 **Byte Labs**

---

## Support

[Join the Byte Labs Server](https://discord.gg/wZuTsF5Z2P)

For issues, feature requests, or contributions, please open an issue or pull request on the repository.
