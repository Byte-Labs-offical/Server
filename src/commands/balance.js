const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Show your balance'),

  async execute(interaction) {
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    const embed = createEmbed({
      description: `💰 ${interaction.user.username}'s balance: **${profile.balance}**`
    });

    await interaction.reply({ embeds: [embed] });
  }
};
