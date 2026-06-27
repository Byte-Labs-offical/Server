const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Play a quick blackjack round'),
  async execute(interaction) {
    const embed = createEmbed({ description: '🃏 Blackjack round started!' });
    await interaction.reply({ embeds: [embed] });
  }
};
