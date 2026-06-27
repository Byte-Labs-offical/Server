const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crates')
    .setDescription('Show your crates'),
  async execute(interaction) {
    const embed = createEmbed({ description: '📦 You have 0 crates.' });
    await interaction.reply({ embeds: [embed] });
  }
};
