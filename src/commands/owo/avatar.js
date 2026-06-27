const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Show your avatar'),
  async execute(interaction) {
    const avatarUrl = interaction.user.displayAvatarURL({ size: 256 });
    const embed = createEmbed({ description: '🖼️ Your avatar' });
    embed.setImage(avatarUrl);
    await interaction.reply({ embeds: [embed] });
  }
};
