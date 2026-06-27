const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blush')
    .setDescription('Blush playfully'),
  async execute(interaction) {
    const embed = createEmbed({ description: '😊 Blush!' });
    await interaction.reply({ embeds: [embed] });
  }
};
