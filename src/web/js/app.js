async function load() {
  const [statsResp, userResp] = await Promise.all([
    fetch('/api/stats'),
    fetch('/api/user')
  ]);

  const stats = await statsResp.json();
  const user = await userResp.json();

  document.getElementById('stats').innerHTML = `
    <p><strong>Servers</strong><br>${stats.servers}</p>
    <p><strong>Users</strong><br>${stats.users}</p>
    <p><strong>Ping</strong><br>${stats.ping} ms</p>
  `;

  if (user.authenticated) {
    document.getElementById('auth').innerHTML = `
      <p>Welcome back <strong>${user.user.username}#${user.user.discriminator}</strong>.</p>
      <div class="button-row">
        <a class="button button-primary" href="/dashboard">Open Dashboard</a>
        <a class="button button-secondary" href="/activity">Discord Activity</a>
        <a class="button button-secondary" href="/logout">Logout</a>
      </div>
    `;
  } else {
    document.getElementById('auth').innerHTML = `
      <p>Sign in with Discord to manage your server settings.</p>
      <div class="button-row">
        <a class="button button-primary" href="/login">Login with Discord</a>
        <a class="button button-secondary" href="/activity">Discord Activity</a>
      </div>
    `;
  }
}

load();
setInterval(load, 5000);