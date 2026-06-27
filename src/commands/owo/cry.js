const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cry')
    .setDescription('Cry a little'),
  async execute(interaction) {
    const embed = createEmbed({ description: '😢 Crying...' });
    await interaction.reply({ embeds: [embed] });
  }
};
