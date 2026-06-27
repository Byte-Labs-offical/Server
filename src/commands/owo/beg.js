const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');
const { owoProfiles } = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Ask for a tiny gift'),
  async execute(interaction) {
    const reward = 10 + Math.floor(Math.random() * 10);
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    owoProfiles.update(interaction.user.id, { balance: profile.balance + reward });
    const embed = createEmbed({ description: `🫴 ${interaction.user.username} was gifted **${reward}** credits.` });
    await interaction.reply({ embeds: [embed] });
  }
};
