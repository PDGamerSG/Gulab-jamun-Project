// ═══════════════════════════════════════════════════════════════
// Gulab Jamun – Dashboard Application Logic
// (Matching analytics dashboard sidebar pattern)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── References ──────────────────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const navBtns = document.querySelectorAll('.sidebar-nav-btn[data-page]');
  const pageSections = document.querySelectorAll('.page-section');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');

  const pageMeta = {
    'dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Ayush — here\'s your overview' },
    'user-roles': { title: 'User Roles', subtitle: 'Manage roles, permissions and user assignments' },
    'pos-suite': { title: 'POS Suite', subtitle: 'Real-time point-of-sale monitoring' },
    'inventory': { title: 'Inventory', subtitle: 'Track stock levels and manage products' },
    'store-insights': { title: 'Store Insights', subtitle: 'Performance analytics across all stores' },
    'hrm-hub': { title: 'HRM Hub', subtitle: 'Employee management and HR operations' },
    'settings': { title: 'Settings', subtitle: 'System configuration and preferences' },
  };

  // ── Sidebar Expand / Collapse ───────────────────────────────
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-expanded');
  });

  // Close on overlay click (mobile)
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('sidebar-expanded');
      sidebarOverlay.classList.remove('active');
    });
  }

  // ── Tooltip system (collapsed mode) ─────────────────────────
  document.querySelectorAll('.sidebar-item-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.sidebar-nav-btn');
    if (!btn) return;
    const tooltipText = btn.dataset.tooltip;
    if (!tooltipText) return;

    let tooltip = null;

    wrapper.addEventListener('mouseenter', () => {
      if (sidebar.classList.contains('sidebar-expanded')) return;
      tooltip = document.createElement('div');
      tooltip.className = 'sidebar-tooltip';
      if (btn.classList.contains('logout-btn')) tooltip.classList.add('logout-tooltip');
      tooltip.textContent = tooltipText;
      wrapper.appendChild(tooltip);
    });

    wrapper.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    });
  });

  // ── Page Navigation ─────────────────────────────────────────
  function switchPage(pageId) {
    // Update nav active
    navBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.sidebar-nav-btn[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Show page
    pageSections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    // Update header
    const meta = pageMeta[pageId];
    if (meta) {
      pageTitle.textContent = meta.title;
      pageSubtitle.textContent = meta.subtitle;
    }

    // On mobile, collapse sidebar
    sidebar.classList.remove('sidebar-expanded');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) switchPage(page);
    });
  });

  // ── Toggle items in modal ───────────────────────────────────
  document.querySelectorAll('.toggle-item').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('on'));
  });

  // ── Modal ───────────────────────────────────────────────────
  const roleModal = document.getElementById('roleModal');
  const btnAddRole = document.getElementById('btnAddRole');
  const closeModal = document.getElementById('closeRoleModal');
  const cancelModal = document.getElementById('cancelRoleModal');

  function openModal() { roleModal.classList.add('active'); }
  function closeModalFn() { roleModal.classList.remove('active'); }

  btnAddRole.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalFn);
  cancelModal.addEventListener('click', closeModalFn);
  roleModal.addEventListener('click', (e) => { if (e.target === roleModal) closeModalFn(); });

  // ══════════════════════════════════════════════════════════════
  //  RENDER FUNCTIONS
  // ══════════════════════════════════════════════════════════════

  // ── SVG Icon Library ───────────────────────────────────────
  const SVG = {
    revenue: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    orders: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    customers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    inventory: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    order: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    shipment: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    milestone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    system: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    report: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  };

  // ── Dashboard KPIs ──────────────────────────────────────────
  function renderKPIs() {
    const k = DATA.kpis;
    const cards = [
      { icon: SVG.revenue, label: 'Total Revenue', value: k.totalRevenue, change: k.revenueChange, cls: 'primary', up: true },
      { icon: SVG.orders, label: 'Total Orders', value: k.totalOrders, change: k.ordersChange, cls: 'success', up: true },
      { icon: SVG.customers, label: 'Total Customers', value: k.totalCustomers, change: k.customersChange, cls: 'info', up: true },
      { icon: SVG.inventory, label: 'Inventory Health', value: k.inventoryHealth, change: k.inventoryChange, cls: 'warning', up: false },
    ];
    const grid = document.getElementById('kpiGrid');
    grid.innerHTML = cards.map(c => `
      <div class="card kpi-card">
        <div class="kpi-icon ${c.cls}">${c.icon}</div>
        <div class="kpi-label">${c.label}</div>
        <div class="kpi-value">${c.value}</div>
        <div class="kpi-change ${c.up ? 'up' : 'down'}">${c.up ? '↑' : '↓'} ${c.change}</div>
      </div>
    `).join('');
  }

  // ── Revenue Chart ───────────────────────────────────────────
  function renderRevenueChart() {
    const container = document.getElementById('revenueChart');
    const maxVal = Math.max(...DATA.revenueByMonth.map(d => d.value));
    container.innerHTML = DATA.revenueByMonth.map(d => {
      const pct = (d.value / maxVal) * 100;
      return `
        <div class="bar-col">
          <span class="bar-value">₹${d.value}L</span>
          <div class="bar" style="height:${pct}%;" title="${d.month}: ₹${d.value}L"></div>
          <span class="bar-label">${d.month}</span>
        </div>
      `;
    }).join('');
  }

  // ── Category / Payment List ─────────────────────────────────
  function renderCategoryList(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = data.map(d => `
      <div class="category-item">
        <span class="cat-color" style="background:${d.color}"></span>
        <span class="cat-name">${d.category || d.method}</span>
        <div class="cat-bar">
          <div class="cat-bar-fill" style="width:${d.percentage}%; background:${d.color}"></div>
        </div>
        <span class="cat-pct">${d.percentage}%</span>
      </div>
    `).join('');
  }

  // ── Activity Feed ───────────────────────────────────────────
  function renderActivity() {
    const container = document.getElementById('activityFeed');
    container.innerHTML = DATA.recentActivity.map(a => `
      <div class="activity-item">
        <div class="act-icon">${SVG[a.icon] || SVG.system}</div>
        <div class="act-text">${a.text}</div>
        <div class="act-time">${a.time}</div>
      </div>
    `).join('');
  }

  // ── Roles Grid ──────────────────────────────────────────────
  function renderRoles() {
    const grid = document.getElementById('rolesGrid');
    grid.innerHTML = DATA.roles.map(r => {
      const permCount = Object.values(r.permissions).filter(Boolean).length;
      const totalPerm = Object.keys(r.permissions).length;
      return `
        <div class="card" style="padding:var(--space-lg);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
            <span class="role-tag" style="background:${r.color}15; color:${r.color};">
              <span class="role-dot" style="background:${r.color}"></span>
              ${r.name}
            </span>
            <span style="font-size:0.78rem; color:var(--text-muted);">${r.users} users</span>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; margin-bottom:5px;">
              <span style="color:var(--text-muted);">Permissions</span>
              <span style="font-weight:600;">${permCount}/${totalPerm}</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" style="width:${(permCount / totalPerm) * 100}%; background:${r.color};"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Users Table ─────────────────────────────────────────────
  function renderUsers(filter = '', roleFilter = '') {
    const tbody = document.getElementById('usersTableBody');
    let users = DATA.users;
    if (filter) {
      const q = filter.toLowerCase();
      users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (roleFilter) users = users.filter(u => u.role === roleFilter);

    tbody.innerHTML = users.map(u => {
      const role = DATA.roles.find(r => r.name === u.role);
      const color = role ? role.color : '#94a3b8';
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,${color},${color}aa);display:flex;align-items:center;justify-content:center;color:white;font-size:0.72rem;font-weight:700;">${u.avatar}</div>
              <span style="font-weight:600; color:var(--text-primary);">${u.name}</span>
            </div>
          </td>
          <td>${u.email}</td>
          <td><span class="role-tag" style="background:${color}15;color:${color};"><span class="role-dot" style="background:${color}"></span>${u.role}</span></td>
          <td>${u.store}</td>
          <td>${u.lastActive}</td>
          <td><button class="btn btn-sm btn-outline">Edit</button></td>
        </tr>
      `;
    }).join('');
  }

  // ── Permissions Matrix ──────────────────────────────────────
  function renderPermMatrix() {
    const tbody = document.getElementById('permMatrixBody');
    const permKeys = ['dashboard', 'pos', 'inventory', 'insights', 'hrm', 'settings', 'userMgmt'];
    tbody.innerHTML = DATA.roles.map(r => {
      const cells = permKeys.map(p => {
        const has = r.permissions[p];
        return `<td><span class="perm-check ${has ? 'yes' : 'no'}">${has ? '✓' : '✕'}</span></td>`;
      }).join('');
      return `<tr><td><span class="role-tag" style="background:${r.color}15;color:${r.color};"><span class="role-dot" style="background:${r.color}"></span>${r.name}</span></td>${cells}</tr>`;
    }).join('');
  }

  function populateRoleFilter() {
    const select = document.getElementById('roleFilter');
    DATA.roles.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.name;
      opt.textContent = r.name;
      select.appendChild(opt);
    });
  }

  // ── Transactions Table ──────────────────────────────────────
  function renderTransactions(filter = '', statusFilter = '', methodFilter = '') {
    const tbody = document.getElementById('txnTableBody');
    let txns = DATA.transactions;
    if (filter) {
      const q = filter.toLowerCase();
      txns = txns.filter(t => t.id.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q));
    }
    if (statusFilter) txns = txns.filter(t => t.status === statusFilter);
    if (methodFilter) txns = txns.filter(t => t.method === methodFilter);

    tbody.innerHTML = txns.map(t => `
      <tr>
        <td style="font-weight:600; color:var(--text-primary);">${t.id}</td>
        <td>${t.store}</td>
        <td>${t.customer}</td>
        <td>${t.items}</td>
        <td style="font-weight:600;">${t.total}</td>
        <td>${t.method}</td>
        <td>${t.time}</td>
        <td><span class="status-badge ${t.status}"><span class="status-dot"></span>${t.status}</span></td>
      </tr>
    `).join('');
  }

  // ── Products Table ──────────────────────────────────────────
  function renderProducts(filter = '', catFilter = '', stockFilter = '') {
    const tbody = document.getElementById('productTableBody');
    let prods = DATA.products;
    if (filter) {
      const q = filter.toLowerCase();
      prods = prods.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (catFilter) prods = prods.filter(p => p.category === catFilter);
    if (stockFilter) prods = prods.filter(p => p.status === stockFilter);

    tbody.innerHTML = prods.map(p => `
      <tr>
        <td style="font-weight:600; color:var(--text-primary);">${p.sku}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>₹${p.price.toLocaleString()}</td>
        <td style="font-weight:600;">${p.stock.toLocaleString()}</td>
        <td>${p.reorderLevel}</td>
        <td><span class="stock-badge ${p.status}">${p.status === 'good' ? '● In Stock' : p.status === 'low' ? '● Low Stock' : '● Critical'}</span></td>
        <td><button class="btn btn-sm btn-outline">Edit</button></td>
      </tr>
    `).join('');

    document.getElementById('goodStockCount').textContent = DATA.products.filter(p => p.status === 'good').length;
    document.getElementById('lowStockCount').textContent = DATA.products.filter(p => p.status === 'low').length;
    document.getElementById('criticalStockCount').textContent = DATA.products.filter(p => p.status === 'critical').length;
  }

  function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    const cats = [...new Set(DATA.products.map(p => p.category))];
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      select.appendChild(opt);
    });
  }

  // ── Store Cards ─────────────────────────────────────────────
  function renderStoreCards() {
    const grid = document.getElementById('storeCardsGrid');
    grid.innerHTML = DATA.stores.slice(0, 6).map(s => `
      <div class="card store-card">
        <div class="store-header">
          <div>
            <div class="store-name">${s.name}</div>
            <div class="store-city">${s.city}, ${s.region}</div>
          </div>
          <span class="status-badge ${s.status}"><span class="status-dot"></span>${s.status}</span>
        </div>
        <div class="store-stats">
          <div class="store-stat">
            <div class="ss-value">${s.revenue}</div>
            <div class="ss-label">Revenue</div>
          </div>
          <div class="store-stat">
            <div class="ss-value">${s.orders.toLocaleString()}</div>
            <div class="ss-label">Orders</div>
          </div>
          <div class="store-stat" style="grid-column: span 2;">
            <div class="store-rating">${SVG.star} ${s.rating}</div>
            <div class="ss-label">Customer Rating</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ── Store Table ─────────────────────────────────────────────
  function renderStoreTable() {
    const tbody = document.getElementById('storeTableBody');
    tbody.innerHTML = DATA.stores.map(s => `
      <tr>
        <td style="font-weight:600; color:var(--text-primary);">${s.id}</td>
        <td>${s.name}</td>
        <td>${s.city}</td>
        <td>${s.region}</td>
        <td style="font-weight:600;">${s.revenue}</td>
        <td>${s.orders.toLocaleString()}</td>
        <td><span style="color:var(--warning); font-weight:600;">${SVG.star} ${s.rating}</span></td>
        <td><span class="status-badge ${s.status}"><span class="status-dot"></span>${s.status}</span></td>
      </tr>
    `).join('');
  }

  // ── Employees ───────────────────────────────────────────────
  function renderEmployees(filter = '', deptFilter = '') {
    const tbody = document.getElementById('empTableBody');
    let emps = DATA.employees;
    if (filter) {
      const q = filter.toLowerCase();
      emps = emps.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
    }
    if (deptFilter) emps = emps.filter(e => e.department === deptFilter);

    tbody.innerHTML = emps.map(e => {
      const attColor = e.attendance >= 95 ? 'var(--success)' : e.attendance >= 90 ? '#6366f1' : e.attendance >= 85 ? 'var(--warning)' : 'var(--danger)';
      return `
        <tr>
          <td style="font-weight:600; color:var(--text-primary);">${e.id}</td>
          <td>${e.name}</td>
          <td>${e.department}</td>
          <td>${e.designation}</td>
          <td>${e.store}</td>
          <td>${e.joinDate}</td>
          <td>
            <div class="attendance-bar">
              <div class="att-fill"><div class="att-fill-inner" style="width:${e.attendance}%; background:${attColor};"></div></div>
              <span class="att-pct" style="color:${attColor};">${e.attendance}%</span>
            </div>
          </td>
          <td><span class="status-badge ${e.status}"><span class="status-dot"></span>${e.status}</span></td>
        </tr>
      `;
    }).join('');
  }

  function populateDeptFilter() {
    const select = document.getElementById('deptFilter');
    const depts = [...new Set(DATA.employees.map(e => e.department))];
    depts.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d; opt.textContent = d;
      select.appendChild(opt);
    });
  }

  // ── Dept Breakdown ──────────────────────────────────────────
  function renderDeptBreakdown() {
    const container = document.getElementById('deptBreakdown');
    const total = DATA.departments.reduce((a, d) => a + d.count, 0);
    container.innerHTML = DATA.departments.map(d => {
      const pct = Math.round((d.count / total) * 100);
      return `
        <div class="category-item">
          <span class="cat-color" style="background:${d.color}"></span>
          <span class="cat-name">${d.name}</span>
          <div class="cat-bar">
            <div class="cat-bar-fill" style="width:${pct}%; background:${d.color}"></div>
          </div>
          <span class="cat-pct">${d.count}</span>
        </div>
      `;
    }).join('');
  }

  // ── Leave Requests ──────────────────────────────────────────
  function renderLeaveRequests() {
    const tbody = document.getElementById('leaveTableBody');
    tbody.innerHTML = DATA.leaveRequests.map(l => `
      <tr>
        <td style="font-weight:600;">${l.employee}</td>
        <td>${l.type}</td>
        <td>${l.from}</td>
        <td>${l.to}</td>
        <td>${l.days}</td>
        <td><span class="status-badge ${l.status}"><span class="status-dot"></span>${l.status}</span></td>
      </tr>
    `).join('');
  }

  // ══════════════════════════════════════════════════════════════
  //  EVENT LISTENERS
  // ══════════════════════════════════════════════════════════════

  // User search & role filter
  document.getElementById('userSearch').addEventListener('input', (e) => {
    renderUsers(e.target.value, document.getElementById('roleFilter').value);
  });
  document.getElementById('roleFilter').addEventListener('change', (e) => {
    renderUsers(document.getElementById('userSearch').value, e.target.value);
  });

  // Transactions
  document.getElementById('txnSearch').addEventListener('input', () => applyTxnFilters());
  document.getElementById('txnStatusFilter').addEventListener('change', () => applyTxnFilters());
  document.getElementById('txnMethodFilter').addEventListener('change', () => applyTxnFilters());
  function applyTxnFilters() {
    renderTransactions(
      document.getElementById('txnSearch').value,
      document.getElementById('txnStatusFilter').value,
      document.getElementById('txnMethodFilter').value
    );
  }

  // Products
  document.getElementById('productSearch').addEventListener('input', () => applyProductFilters());
  document.getElementById('categoryFilter').addEventListener('change', () => applyProductFilters());
  document.getElementById('stockFilter').addEventListener('change', () => applyProductFilters());
  function applyProductFilters() {
    renderProducts(
      document.getElementById('productSearch').value,
      document.getElementById('categoryFilter').value,
      document.getElementById('stockFilter').value
    );
  }

  // Employees
  document.getElementById('empSearch').addEventListener('input', (e) => {
    renderEmployees(e.target.value, document.getElementById('deptFilter').value);
  });
  document.getElementById('deptFilter').addEventListener('change', (e) => {
    renderEmployees(document.getElementById('empSearch').value, e.target.value);
  });

  // ══════════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════════

  renderKPIs();
  renderRevenueChart();
  renderCategoryList('categoryList', DATA.salesByCategory);
  renderCategoryList('paymentList', DATA.paymentMethods);
  renderCategoryList('posPaymentList', DATA.paymentMethods);
  renderActivity();
  renderRoles();
  renderUsers();
  renderPermMatrix();
  populateRoleFilter();
  renderTransactions();
  renderProducts();
  populateCategoryFilter();
  renderStoreCards();
  renderStoreTable();
  renderEmployees();
  populateDeptFilter();
  renderDeptBreakdown();
  renderLeaveRequests();

});
