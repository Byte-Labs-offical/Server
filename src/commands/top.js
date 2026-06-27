const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('top')
    .setDescription('Show the richest users'),

  async execute(interaction) {
    const topProfiles = owoProfiles.listTop(5);
    const lines = topProfiles.map((profile, index) => `${index + 1}. ${profile.username} — ${profile.balance}`).join('\n');
    const embed = createEmbed({
      description: lines || 'No profiles yet.'
    });

    await interaction.reply({ embeds: [embed] });
  }
};
