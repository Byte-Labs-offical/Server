const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8b')
    .setDescription('Share a playful 8ball-style response'),
  async execute(interaction) {
    const responses = ['Yes', 'No', 'Maybe', 'Definitely', 'Not today'];
    const embed = createEmbed({ description: `🎱 ${responses[Math.floor(Math.random() * responses.length)]}` });
    await interaction.reply({ embeds: [embed] });
  }
};
