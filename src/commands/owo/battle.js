const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('battle')
    .setDescription('Start a battle with a friend'),
  async execute(interaction) {
    const embed = createEmbed({ description: '⚔️ Battle started!' });
    await interaction.reply({ embeds: [embed] });
  }
};
