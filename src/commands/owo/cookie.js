const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cookie')
    .setDescription('Give a cookie'),
  async execute(interaction) {
    const embed = createEmbed({ description: '🍪 Here is a cookie!' });
    await interaction.reply({ embeds: [embed] });
  }
};
