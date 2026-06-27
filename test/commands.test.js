const test = require('node:test');
const assert = require('node:assert/strict');

const backupCommand = require('../src/commands/backup');
const loadBackupCommand = require('../src/commands/load-backup');
const balanceCommand = require('../src/commands/balance');
const dailyCommand = require('../src/commands/daily');
const workCommand = require('../src/commands/work');
const begCommand = require('../src/commands/beg');
const profileCommand = require('../src/commands/profile');
const topCommand = require('../src/commands/top');
const myCommand = require('../src/commands/my');
const { owoCommandNames, owoCommands } = require('../src/commands/owo');
const { init, backups, owoProfiles } = require('../src/database');

test('backup commands are registered with the expected slash command names', () => {
  assert.equal(backupCommand.data.name, 'backup');
  assert.equal(loadBackupCommand.data.name, 'load-backup');
});

test('backup snapshots can be persisted through the database layer', async () => {
  await init();
  const backupId = `DBTEST-${Date.now()}`;
  const backup = await backups.create({
    backupId,
    guildId: '123456789',
    name: 'Test Guild',
    channels: [],
    roles: [],
    emojis: [],
    stickers: []
  });

  assert.equal(backup.backupId, backupId);
  assert.equal(backup.guildId, '123456789');
  assert.equal(backup.name, 'Test Guild');
});

test('owo compatibility slash commands are registered and persist simple profiles', async () => {
  await init();

  assert.ok(owoCommands.length >= 50);
  assert.deepEqual(owoCommandNames.slice(0, 7), ['balance', 'daily', 'work', 'beg', 'profile', 'top', 'my']);
  assert.ok(owoCommandNames.includes('8b'));
  assert.ok(owoCommandNames.includes('autohunt'));
  assert.ok(owoCommandNames.includes('zoo'));
  assert.ok(owoCommandNames.includes('withdraw'));

  const profileId = `owo-test-user-${Date.now()}`;
  const profile = owoProfiles.getOrCreate(profileId, 'Test User');
  assert.equal(profile.balance, 0);

  owoProfiles.update(profileId, { balance: 125 });
  const updated = owoProfiles.get(profileId);
  assert.equal(updated.balance, 125);
});
