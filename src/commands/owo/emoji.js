const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emoji')
    .setDescription('Send an emoji reaction'),
  async execute(interaction) {
    const embed = createEmbed({ description: '😀 Emoji!' });
    await interaction.reply({ embeds: [embed] });
  }
};
