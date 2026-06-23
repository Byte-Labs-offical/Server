async function loadDashboard() {
  const [userResp, statsResp] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/stats')
  ]);

  const userData = await userResp.json();
  const stats = await statsResp.json();

  if (!userData.authenticated) {
    window.location.href = '/';
    return;
  }

  document.getElementById('dashboard-user').innerHTML = `
    <p><strong>${userData.user.username}#${userData.user.discriminator}</strong></p>
    <p>ID: ${userData.user.id}</p>
    <p>Use this dashboard to review your guilds and access the bot in servers you manage.</p>
  `;

  const manageGuilds = userData.user.guilds.filter(g => g.owner || (parseInt(g.permissions, 10) & 0x8) || (parseInt(g.permissions, 10) & 0x20));
  const guildHtml = manageGuilds.length > 0
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
    : '<p>No manageable guilds found.</p>';

  document.getElementById('guild-list').innerHTML = guildHtml;

  document.getElementById('dashboard-status').innerHTML = `
    <p><strong>Connected servers</strong><br>${stats.servers}</p>
    <p><strong>Known users</strong><br>${stats.users}</p>
    <p><strong>Gateway ping</strong><br>${stats.ping} ms</p>
  `;
}

loadDashboard();
