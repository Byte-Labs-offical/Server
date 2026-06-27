const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');
const { owoProfiles } = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autohunt')
    .setDescription('Auto-hunt for a little reward'),
  async execute(interaction) {
    const reward = 15;
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    owoProfiles.update(interaction.user.id, { balance: profile.balance + reward });
    const embed = createEmbed({ description: `🦌 Auto-hunt earned **${reward}** credits.` });
    await interaction.reply({ embeds: [embed] });
  }
};
