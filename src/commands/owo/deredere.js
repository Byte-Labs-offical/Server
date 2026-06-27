const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deredere')
    .setDescription('Act in a deredere way'),
  async execute(interaction) {
    const embed = createEmbed({ description: '💕 Deredere mode!' });
    await interaction.reply({ embeds: [embed] });
  }
};
