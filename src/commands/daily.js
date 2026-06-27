const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward'),

  async execute(interaction) {
    const reward = 100;
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    owoProfiles.update(interaction.user.id, { balance: profile.balance + reward });
    const embed = createEmbed({
      description: `🎁 ${interaction.user.username} claimed **${reward}** credits.`
    });

    await interaction.reply({ embeds: [embed] });
  }
};
