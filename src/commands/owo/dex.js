const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dex')
    .setDescription('Show your dex summary'),
  async execute(interaction) {
    const embed = createEmbed({ description: '📘 Dex is empty.' });
    await interaction.reply({ embeds: [embed] });
  }
};
