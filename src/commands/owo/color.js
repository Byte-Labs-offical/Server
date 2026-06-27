const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('color')
    .setDescription('Show a random color'),
  async execute(interaction) {
    const colors = ['Red', 'Green', 'Blue', 'Purple'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const embed = createEmbed({ description: `🎨 **${color}**` });
    await interaction.reply({ embeds: [embed] });
  }
};
