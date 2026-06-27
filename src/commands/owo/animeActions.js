const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('animeaction')
    .setDescription('Send a fun anime action response'),
  async execute(interaction) {
    const embed = createEmbed({ description: '✨ Anime action triggered!' });
    await interaction.reply({ embeds: [embed] });
  }
};
