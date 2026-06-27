const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('my')
    .setDescription('Show your profile summary'),

  async execute(interaction) {
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    const embed = createEmbed({
      description: `👤 ${interaction.user.username}\nBalance: **${profile.balance}**\nLevel: **${profile.level}**`
    });

    await interaction.reply({ embeds: [embed] });
  }
};
