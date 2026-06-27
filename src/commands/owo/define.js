const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Define a word'),
  async execute(interaction) {
    const embed = createEmbed({ description: '📖 Definition: a word that means something.' });
    await interaction.reply({ embeds: [embed] });
  }
};
