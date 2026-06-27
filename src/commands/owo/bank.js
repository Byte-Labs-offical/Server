const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');
const { owoProfiles } = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bank')
    .setDescription('Show your bank balance'),
  async execute(interaction) {
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    const embed = createEmbed({ description: `🏦 ${interaction.user.username}: **${profile.balance}**` });
    await interaction.reply({ embeds: [embed] });
  }
};
