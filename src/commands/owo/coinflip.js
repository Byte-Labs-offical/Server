const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),
  async execute(interaction) {
    const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
    const embed = createEmbed({ description: `🪙 **${result}**!` });
    await interaction.reply({ embeds: [embed] });
  }
};
