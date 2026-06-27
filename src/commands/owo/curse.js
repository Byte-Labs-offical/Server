const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('curse')
    .setDescription('Send a playful curse'),
  async execute(interaction) {
    const embed = createEmbed({ description: '😈 You cursed the room!' });
    await interaction.reply({ embeds: [embed] });
  }
};
