const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Choose between options'),
  async execute(interaction) {
    const choices = ['A', 'B', 'C'];
    const choice = choices[Math.floor(Math.random() * choices.length)];
    const embed = createEmbed({ description: `🎯 I choose **${choice}**.` });
    await interaction.reply({ embeds: [embed] });
  }
};
