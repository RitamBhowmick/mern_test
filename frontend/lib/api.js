export const api = {
  // 🔐 Login request
  async login(email, password) {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!r.ok) throw new Error((await r.json()).message || 'Login failed');
    return r.json();
  },

  // 👤 Create new agent (admin use-case)
  async createAgent(d) {
    const r = await fetch('/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(d)
    });
    if (!r.ok) throw new Error((await r.json()).message || 'Create agent failed');
    return r.json();
  },

  // 📋 Get list of all agents
  async listAgents() {
    const r = await fetch('/api/agents', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!r.ok) throw new Error((await r.json()).message || 'Fetch agents failed');
    return r.json();
  },

  // 📂 Upload file (CSV/Excel with leads/tasks)
  async uploadFile(file) {
    const f = new FormData();
    f.append('file', file);
    const r = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: f
    });
    if (!r.ok) throw new Error((await r.json()).message || 'Upload failed');
    return r.json();
  },

  // 📊 Fetch distributed tasks (tasks assigned to agents)
  async distributed() {
    const r = await fetch('/api/upload/distributed', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!r.ok) throw new Error((await r.json()).message || 'Fetch tasks failed');
    return r.json();
  }
};
