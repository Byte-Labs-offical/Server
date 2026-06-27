const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bell')
    .setDescription('Ring a bell'),
  async execute(interaction) {
    const embed = createEmbed({ description: '🔔 Ring ring!' });
    await interaction.reply({ embeds: [embed] });
  }
};
