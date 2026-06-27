const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work for a small reward'),

  async execute(interaction) {
    const reward = 25 + Math.floor(Math.random() * 25);
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    owoProfiles.update(interaction.user.id, { balance: profile.balance + reward });
    const embed = createEmbed({
      description: `💼 ${interaction.user.username} worked and earned **${reward}** credits.`
    });

    await interaction.reply({ embeds: [embed] });
  }
};
