const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dance')
    .setDescription('Dance happily'),
  async execute(interaction) {
    const embed = createEmbed({ description: '💃 Dancing!' });
    await interaction.reply({ embeds: [embed] });
  }
};
