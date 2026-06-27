const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');
const { owoProfiles } = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Deposit funds into your bank'),
  async execute(interaction) {
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    owoProfiles.update(interaction.user.id, { balance: profile.balance });
    const embed = createEmbed({ description: `🏦 ${interaction.user.username} deposited funds.` });
    await interaction.reply({ embeds: [embed] });
  }
};
