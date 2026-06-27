const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils');
const { owoProfiles } = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addweapon')
    .setDescription('Add a weapon to your inventory'),
  async execute(interaction) {
    const weapon = 'Sword';
    const profile = owoProfiles.getOrCreate(interaction.user.id, interaction.user.username);
    const weapons = Array.isArray(profile.weapons) ? profile.weapons : [];
    if (!weapons.includes(weapon)) {
      weapons.push(weapon);
      owoProfiles.update(interaction.user.id, { weapons });
    }
    const embed = createEmbed({ description: `⚔️ Added **${weapon}** to your inventory.` });
    await interaction.reply({ embeds: [embed] });
  }
};
