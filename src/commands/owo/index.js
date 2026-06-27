const fs = require('fs');
const path = require('path');

const commandDir = __dirname;
const commandFiles = fs.readdirSync(commandDir)
  .filter((file) => file.endsWith('.js') && file !== 'index.js');

const owoCommands = [];
const owoCommandNames = [];

for (const file of commandFiles) {
  const command = require(path.join(commandDir, file));
  if (command && command.data && command.data.name) {
    owoCommands.push(command);
    owoCommandNames.push(command.data.name);
  }
}

module.exports = { owoCommands, owoCommandNames };
