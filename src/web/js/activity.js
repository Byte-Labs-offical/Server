async function loadActivity() {
  const userResp = await fetch('/api/user');
  const userData = await userResp.json();

  if (!userData.authenticated) {
    window.location.href = '/';
    return;
  }

  document.getElementById('activity-user').innerHTML = `
    <p><strong>${userData.user.username}#${userData.user.discriminator}</strong></p>
    <p>ID: ${userData.user.id}</p>
    <p>Signed in with Discord OAuth.</p>
  `;

  const guilds = userData.user.guilds || [];
  const manageGuilds = guilds.filter(g => g.owner || (g.permissions & 0x8) || (g.permissions & 0x20));

  document.getElementById('activity-guilds').innerHTML = manageGuilds.length > 0
    ? `<div class="guild-list">${manageGuilds.map(g => `
        <div class="guild-card">
          <div class="guild-card-header">
            <div>
              <strong>${g.name}</strong>
              <p>${g.owner ? 'Owner' : 'Manage Server'}</p>
            </div>
            <span class="guild-badge">${g.botPresent ? 'Bot Installed' : 'Bot Not Installed'}</span>
          </div>
          <p class="guild-meta">Server ID: ${g.id}</p>
          <div class="guild-actions">
            <a class="button button-primary" href="https://discord.com/channels/${g.id}" target="_blank">Open Server</a>
          </div>
        </div>
      `).join('')}</div>`
    : '<p>No servers available for management.</p>';

  document.getElementById('activity-actions').innerHTML = manageGuilds.length > 0
    ? `<div class="guild-actions">${manageGuilds.map(g => `
        <a class="button button-secondary" href="https://discord.com/channels/${g.id}" target="_blank">Open ${g.name}</a>
      `).join('')}</div>`
    : '<p>Visit Discord to join or manage your servers.</p>';
}

loadActivity();