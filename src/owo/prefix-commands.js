const { createEmbed } = require('../utils');

const prefixCommands = {
  ping: {
    name: 'ping',
    description: 'Check the bot latency',
    execute: async (message) => {
      const sent = await message.reply({ content: 'Pong!' });
      const latency = sent.createdTimestamp - message.createdTimestamp;
      const embed = createEmbed({
        description: `🏓 Pong!\nLatency: ${latency}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`
      });
      await sent.edit({ content: null, embeds: [embed] });
    }
  },
  help: {
    name: 'help',
    description: 'Show available prefix commands',
    execute: async (message) => {
      const embed = createEmbed({
        description: [
          '## Byte Labs compatibility commands',
          '',
          'Available prefix commands: `balance`, `daily`, `work`, `beg`, `ping`, `help`, `profile`, `top`, `my`',
          '',
          'These commands are included as a lightweight compatibility layer for the merged OWO-style bot features.'
        ].join('\n')
      });
      await message.reply({ embeds: [embed] });
    }
  },
  balance: {
    name: 'balance',
    description: 'Show your balance',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const embed = createEmbed({
        description: `💰 ${message.author.username}'s balance: **${profile.balance}**`
      });
      await message.reply({ embeds: [embed] });
    }
  },
  daily: {
    name: 'daily',
    description: 'Claim your daily reward',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const reward = 100;
      await profileManager.update(message.author.id, { balance: profile.balance + reward });
      const embed = createEmbed({
        description: `🎁 ${message.author.username} claimed **${reward}** credits.`
      });
      await message.reply({ embeds: [embed] });
    }
  },
  work: {
    name: 'work',
    description: 'Work for a small reward',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const reward = 25 + Math.floor(Math.random() * 25);
      await profileManager.update(message.author.id, { balance: profile.balance + reward });
      const embed = createEmbed({
        description: `💼 ${message.author.username} worked and earned **${reward}** credits.`
      });
      await message.reply({ embeds: [embed] });
    }
  },
  beg: {
    name: 'beg',
    description: 'Ask for a tiny gift',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const reward = 10 + Math.floor(Math.random() * 10);
      await profileManager.update(message.author.id, { balance: profile.balance + reward });
      const embed = createEmbed({
        description: `🫴 ${message.author.username} was gifted **${reward}** credits.`
      });
      await message.reply({ embeds: [embed] });
    }
  },
  profile: {
    name: 'profile',
    description: 'Show your profile',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const embed = createEmbed({
        description: [`**${message.author.username}**`, `Balance: **${profile.balance}**`, `Level: **${profile.level}**`].join('\n')
      });
      await message.reply({ embeds: [embed] });
    }
  },
  top: {
    name: 'top',
    description: 'Show the richest users',
    execute: async (message, args, profileManager) => {
      const topProfiles = await profileManager.listTop(5);
      const lines = topProfiles.map((profile, index) => `${index + 1}. ${profile.username} — ${profile.balance}`).join('\n');
      const embed = createEmbed({
        description: lines || 'No profiles yet.'
      });
      await message.reply({ embeds: [embed] });
    }
  },
  my: {
    name: 'my',
    description: 'Show your profile summary',
    execute: async (message, args, profileManager) => {
      const profile = await profileManager.getOrCreate(message.author.id, message.author.username);
      const embed = createEmbed({
        description: `👤 ${message.author.username}\nBalance: **${profile.balance}**\nLevel: **${profile.level}**`
      });
      await message.reply({ embeds: [embed] });
    }
  }
};

module.exports = { prefixCommands };
