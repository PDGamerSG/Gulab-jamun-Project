// ═══════════════════════════════════════════════════════════════
// Gulab Jamun – Dashboard Application Logic
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── References ──────────────────────────────────────────────
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const navItems = document.querySelectorAll('.nav-item');
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

    // ── Navigation ──────────────────────────────────────────────
    function switchPage(pageId) {
        // Update nav active
        navItems.forEach(n => n.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (activeNav) activeNav.classList.add('active');

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

        // Close mobile sidebar
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page) switchPage(page);
        });
    });

    // Sidebar mobile toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
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

    // ── Dashboard KPIs ──────────────────────────────────────────
    function renderKPIs() {
        const k = DATA.kpis;
        const cards = [
            { icon: '💰', label: 'Total Revenue', value: k.totalRevenue, change: k.revenueChange, cls: 'primary', up: true },
            { icon: '🛒', label: 'Total Orders', value: k.totalOrders, change: k.ordersChange, cls: 'success', up: true },
            { icon: '👥', label: 'Total Customers', value: k.totalCustomers, change: k.customersChange, cls: 'info', up: true },
            { icon: '📦', label: 'Inventory Health', value: k.inventoryHealth, change: k.inventoryChange, cls: 'warning', up: false },
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

    // ── Category List ───────────────────────────────────────────
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
        <div class="act-icon">${a.icon}</div>
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
        <div class="card" style="padding:20px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
            <div>
              <span class="role-tag" style="background:${r.color}15; color:${r.color};">
                <span class="role-dot" style="background:${r.color}"></span>
                ${r.name}
              </span>
            </div>
            <span style="font-size:12px; color:var(--text-muted);">${r.users} users</span>
          </div>
          <div style="margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
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
        if (roleFilter) {
            users = users.filter(u => u.role === roleFilter);
        }
        tbody.innerHTML = users.map(u => {
            const role = DATA.roles.find(r => r.name === u.role);
            const color = role ? role.color : '#94a3b8';
            return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,${color},${color}aa);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;">${u.avatar}</div>
              <span style="font-weight:600; color:var(--text-primary);">${u.name}</span>
            </div>
          </td>
          <td>${u.email}</td>
          <td><span class="role-tag" style="background:${color}15;color:${color};"><span class="role-dot" style="background:${color}"></span>${u.role}</span></td>
          <td>${u.store}</td>
          <td>${u.lastActive}</td>
          <td>
            <button class="btn btn-sm btn-outline">Edit</button>
          </td>
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

    // ── Role filter dropdown ────────────────────────────────────
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

        // Update counts
        document.getElementById('goodStockCount').textContent = DATA.products.filter(p => p.status === 'good').length;
        document.getElementById('lowStockCount').textContent = DATA.products.filter(p => p.status === 'low').length;
        document.getElementById('criticalStockCount').textContent = DATA.products.filter(p => p.status === 'critical').length;
    }

    function populateCategoryFilter() {
        const select = document.getElementById('categoryFilter');
        const cats = [...new Set(DATA.products.map(p => p.category))];
        cats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
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
            <div class="store-rating">⭐ ${s.rating}</div>
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
        <td><span style="color:var(--warning); font-weight:600;">⭐ ${s.rating}</span></td>
        <td><span class="status-badge ${s.status}"><span class="status-dot"></span>${s.status}</span></td>
      </tr>
    `).join('');
    }

    // ── Employee Table ──────────────────────────────────────────
    function renderEmployees(filter = '', deptFilter = '') {
        const tbody = document.getElementById('empTableBody');
        let emps = DATA.employees;
        if (filter) {
            const q = filter.toLowerCase();
            emps = emps.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
        }
        if (deptFilter) emps = emps.filter(e => e.department === deptFilter);

        tbody.innerHTML = emps.map(e => {
            const attColor = e.attendance >= 95 ? 'var(--success)' : e.attendance >= 90 ? 'var(--primary)' : e.attendance >= 85 ? 'var(--warning)' : 'var(--danger)';
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
            opt.value = d;
            opt.textContent = d;
            select.appendChild(opt);
        });
    }

    // ── Department Breakdown ────────────────────────────────────
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
    //  SEARCH / FILTER EVENT LISTENERS
    // ══════════════════════════════════════════════════════════════

    // User search & role filter
    document.getElementById('userSearch').addEventListener('input', (e) => {
        renderUsers(e.target.value, document.getElementById('roleFilter').value);
    });
    document.getElementById('roleFilter').addEventListener('change', (e) => {
        renderUsers(document.getElementById('userSearch').value, e.target.value);
    });

    // Transaction search & filters
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

    // Product search & filters
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

    // Employee search & filter
    document.getElementById('empSearch').addEventListener('input', (e) => {
        renderEmployees(e.target.value, document.getElementById('deptFilter').value);
    });
    document.getElementById('deptFilter').addEventListener('change', (e) => {
        renderEmployees(document.getElementById('empSearch').value, e.target.value);
    });

    // ══════════════════════════════════════════════════════════════
    //  INITIALIZE
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
