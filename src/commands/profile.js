const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils');
const { owoProfiles } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Show your profile'),

  async execute(interaction) {
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    const embed = createEmbed({
      description: [`**${interaction.user.username}**`, `Balance: **${profile.balance}**`, `Level: **${profile.level}**`].join('\n')
    });

    await interaction.reply({ embeds: [embed] });
  }
};
