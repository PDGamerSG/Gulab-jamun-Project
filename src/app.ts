
// ═══════════════════════════════════════════════════════════════
// Gulab Jamun – Dashboard Application Logic (TypeScript)
// ═══════════════════════════════════════════════════════════════

import { DATA, Product, Store, Employee, Transaction, Role, User } from './data.js';



document.addEventListener('DOMContentLoaded', () => {

    // ── References ──────────────────────────────────────────────
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const sidebarOverlay = document.getElementById('sidebarOverlay') as HTMLElement;
    const sidebarToggle = document.getElementById('sidebarToggle') as HTMLElement;
    const navBtns = document.querySelectorAll('.sidebar-nav-btn[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const pageTitle = document.getElementById('pageTitle') as HTMLElement;
    const pageSubtitle = document.getElementById('pageSubtitle') as HTMLElement;

    const pageMeta: { [key: string]: { title: string; subtitle: string } } = {
        'dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Ayush — here\'s your overview' },
        'user-roles': { title: 'User Roles', subtitle: 'Manage roles, permissions and user assignments' },
        'pos-suite': { title: 'POS Suite', subtitle: 'Real-time point-of-sale monitoring' },
        'inventory': { title: 'Inventory', subtitle: 'Track stock levels and manage products' },
        'store-insights': { title: 'Store Insights', subtitle: 'Performance analytics across all stores' },
        'hrm-hub': { title: 'HRM Hub', subtitle: 'Employee management and HR operations' },
        'settings': { title: 'Settings', subtitle: 'System configuration and preferences' },
    };

    // ── Sidebar Expand / Collapse ───────────────────────────────
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-expanded');
        });
    }

    // Close on overlay click (mobile)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-expanded');
            sidebarOverlay.classList.remove('active');
        });
    }

    // ── Tooltip system (collapsed mode) ─────────────────────────
    document.querySelectorAll('.sidebar-item-wrapper').forEach(wrapper => {
        const btn = wrapper.querySelector('.sidebar-nav-btn') as HTMLElement;
        if (!btn) return;
        const tooltipText = btn.dataset.tooltip;
        if (!tooltipText) return;

        let tooltip: HTMLElement | null = null;

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
    function switchPage(pageId: string) {
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
            if (pageTitle) pageTitle.textContent = meta.title;
            if (pageSubtitle) pageSubtitle.textContent = meta.subtitle;
        }

        // On mobile, collapse sidebar
        if (sidebar) sidebar.classList.remove('sidebar-expanded');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = (btn as HTMLElement).dataset.page;
            if (page) switchPage(page);
        });
    });

    // ── Toggle items in modal ───────────────────────────────────
    document.querySelectorAll('.toggle-item').forEach(t => {
        t.addEventListener('click', () => t.classList.toggle('on'));
    });

    // ── Modal ───────────────────────────────────────────────────
    const roleModal = document.getElementById('roleModal') as HTMLElement;
    const btnAddRole = document.getElementById('btnAddRole') as HTMLElement;
    const closeModal = document.getElementById('closeRoleModal') as HTMLElement;
    const cancelModal = document.getElementById('cancelRoleModal') as HTMLElement;

    function openModal() { roleModal.classList.add('active'); }
    function closeModalFn() { roleModal.classList.remove('active'); }

    if (btnAddRole) btnAddRole.addEventListener('click', openModal);
    if (closeModal) closeModal.addEventListener('click', closeModalFn);
    if (cancelModal) cancelModal.addEventListener('click', closeModalFn);
    if (roleModal) roleModal.addEventListener('click', (e) => { if (e.target === roleModal) closeModalFn(); });

    // ══════════════════════════════════════════════════════════════
    //  RENDER FUNCTIONS
    // ══════════════════════════════════════════════════════════════

    // ── SVG Icon Library ───────────────────────────────────────
    const SVG: Record<string, string> = {
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
        if (grid) {
            grid.innerHTML = cards.map(c => `
        <div class="card kpi-card">
          <div class="kpi-icon ${c.cls}">${c.icon}</div>
          <div class="kpi-label">${c.label}</div>
          <div class="kpi-value">${c.value}</div>
          <div class="kpi-change ${c.up ? 'up' : 'down'}">${c.up ? '↑' : '↓'} ${c.change}</div>
        </div>
      `).join('');
        }
    }

    // ── Revenue Chart ───────────────────────────────────────────
    function renderRevenueChart() {
        const container = document.getElementById('revenueChart');
        if (container && DATA.revenueByMonth) {
            const values = DATA.revenueByMonth.map(d => d.value as number);
            const maxVal = Math.max(...values);
            container.innerHTML = DATA.revenueByMonth.map(d => {
                const val = d.value as number;
                const pct = (val / maxVal) * 100;
                return `
            <div class="bar-col">
                <span class="bar-value">₹${val}L</span>
                <div class="bar" style="height:${pct}%;" title="${d.month}: ₹${val}L"></div>
                <span class="bar-label">${d.month}</span>
            </div>
            `;
            }).join('');
        }
    }

    // ── Category / Payment List ─────────────────────────────────
    function renderCategoryList(containerId: string, data: any[]) {
        const container = document.getElementById(containerId);
        if (container) {
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
    }

    // ── Activity Feed ───────────────────────────────────────────
    function renderActivity() {
        const container = document.getElementById('activityFeed');
        if (container) {
            container.innerHTML = DATA.recentActivity.map(a => `
        <div class="activity-item">
          <div class="act-icon">${SVG[a.icon] || SVG.system}</div>
          <div class="act-text">${a.text}</div>
          <div class="act-time">${a.time}</div>
        </div>
      `).join('');
        }
    }

    // ── Roles Grid ──────────────────────────────────────────────
    function renderRoles() {
        const grid = document.getElementById('rolesGrid');
        if (grid) {
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
    }

    // ── Users Table ─────────────────────────────────────────────
    function renderUsers(filter = '', roleFilter = '') {
        const tbody = document.getElementById('usersTableBody');
        if (tbody) {
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
            <td><button class="btn btn-sm btn-outline btn-edit-user" data-id="${u.id}">Edit</button></td>
          </tr>
        `;
            }).join('');

            // Attach event listeners
            document.querySelectorAll('.btn-edit-user').forEach(btn => {
                btn.addEventListener('click', () => {
                    openEditUserModal((btn as HTMLElement).dataset.id as string);
                });
            });
        }
    }

    // ── Permissions Matrix ──────────────────────────────────────
    function renderPermMatrix() {
        const tbody = document.getElementById('permMatrixBody');
        if (tbody) {
            const permKeys = ['dashboard', 'pos', 'inventory', 'insights', 'hrm', 'settings', 'userMgmt'];
            tbody.innerHTML = DATA.roles.map(r => {
                const cells = permKeys.map(p => {
                    const has = r.permissions[p];
                    return `<td><span class="perm-check ${has ? 'yes' : 'no'}">${has ? '✓' : '✕'}</span></td>`;
                }).join('');
                return `<tr><td><span class="role-tag" style="background:${r.color}15;color:${r.color};"><span class="role-dot" style="background:${r.color}"></span>${r.name}</span></td>${cells}</tr>`;
            }).join('');
        }
    }

    function populateRoleFilter() {
        const select = document.getElementById('roleFilter') as HTMLSelectElement;
        if (select) {
            DATA.roles.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.name;
                opt.textContent = r.name;
                select.appendChild(opt);
            });
        }
    }

    // ── Transactions Table ──────────────────────────────────────
    function renderTransactions(filter = '', statusFilter = '', methodFilter = '') {
        const tbody = document.getElementById('txnTableBody');
        if (tbody) {
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
    }

    // ── Products Table ──────────────────────────────────────────
    function renderProducts(filter = '', catFilter = '', stockFilter = '') {
        const tbody = document.getElementById('productTableBody');
        if (tbody) {
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
          <td><button class="btn btn-sm btn-outline btn-edit-product" data-sku="${p.sku}">Edit</button></td>
        </tr>
      `).join('');

            const goodCount = document.getElementById('goodStockCount');
            if (goodCount) goodCount.textContent = DATA.products.filter(p => p.status === 'good').length.toString();
            const lowCount = document.getElementById('lowStockCount');
            if (lowCount) lowCount.textContent = DATA.products.filter(p => p.status === 'low').length.toString();
            const criticalCount = document.getElementById('criticalStockCount');
            if (criticalCount) criticalCount.textContent = DATA.products.filter(p => p.status === 'critical').length.toString();
        }
    }

    function populateCategoryFilter() {
        const select = document.getElementById('categoryFilter') as HTMLSelectElement;
        if (select) {
            const cats = [...new Set(DATA.products.map(p => p.category))];
            cats.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c; opt.textContent = c;
                select.appendChild(opt);
            });
        }
    }

    // ── Store Cards ─────────────────────────────────────────────
    function renderStoreCards() {
        const grid = document.getElementById('storeCardsGrid');
        if (grid) {
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
    }

    // ── Store Table ─────────────────────────────────────────────
    function renderStoreTable() {
        const tbody = document.getElementById('storeTableBody');
        if (tbody) {
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
    }

    // ── Employees ───────────────────────────────────────────────
    function renderEmployees(filter = '', deptFilter = '') {
        const tbody = document.getElementById('empTableBody');
        if (tbody) {
            let emps = DATA.employees;
            if (filter) {
                const q = filter.toLowerCase();
                emps = emps.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
            }
            if (deptFilter) emps = emps.filter(e => e.department === deptFilter);

            tbody.innerHTML = emps.map(e => {
                const attColor = e.attendance >= 95 ? '#1a1a1a' : e.attendance >= 90 ? '#F97316' : e.attendance >= 85 ? '#FB923C' : 'var(--danger)';
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
    }

    function populateDeptFilter() {
        const select = document.getElementById('deptFilter') as HTMLSelectElement;
        if (select) {
            const depts = [...new Set(DATA.employees.map(e => e.department))];
            depts.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d; opt.textContent = d;
                select.appendChild(opt);
            });
        }
    }

    // ── Dept Breakdown ──────────────────────────────────────────
    function renderDeptBreakdown() {
        const container = document.getElementById('deptBreakdown');
        if (container) {
            const total = DATA.departments.reduce((a, d) => a + (d.count || 0), 0);
            container.innerHTML = DATA.departments.map(d => {
                const count = d.count || 0;
                const pct = Math.round((count / total) * 100);
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
    }

    // ── Leave Requests ──────────────────────────────────────────
    function renderLeaveRequests() {
        const tbody = document.getElementById('leaveTableBody');
        if (tbody) {
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
    }

    // ══════════════════════════════════════════════════════════════
    //  EVENT LISTENERS
    // ══════════════════════════════════════════════════════════════

    // User search & role filter
    const userSearch = document.getElementById('userSearch') as HTMLInputElement;
    const roleFilter = document.getElementById('roleFilter') as HTMLSelectElement;
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            renderUsers((e.target as HTMLInputElement).value, roleFilter ? roleFilter.value : '');
        });
    }
    if (roleFilter) {
        roleFilter.addEventListener('change', (e) => {
            renderUsers(userSearch ? userSearch.value : '', (e.target as HTMLSelectElement).value);
        });
    }

    // Transactions
    const txnSearch = document.getElementById('txnSearch') as HTMLInputElement;
    const txnStatusFilter = document.getElementById('txnStatusFilter') as HTMLSelectElement;
    const txnMethodFilter = document.getElementById('txnMethodFilter') as HTMLSelectElement;

    function applyTxnFilters() {
        renderTransactions(
            txnSearch ? txnSearch.value : '',
            txnStatusFilter ? txnStatusFilter.value : '',
            txnMethodFilter ? txnMethodFilter.value : ''
        );
    }

    if (txnSearch) txnSearch.addEventListener('input', () => applyTxnFilters());
    if (txnStatusFilter) txnStatusFilter.addEventListener('change', () => applyTxnFilters());
    if (txnMethodFilter) txnMethodFilter.addEventListener('change', () => applyTxnFilters());

    // Products
    const productSearch = document.getElementById('productSearch') as HTMLInputElement;
    const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
    const stockFilter = document.getElementById('stockFilter') as HTMLSelectElement;

    function applyProductFilters() {
        renderProducts(
            productSearch ? productSearch.value : '',
            categoryFilter ? categoryFilter.value : '',
            stockFilter ? stockFilter.value : ''
        );
    }

    if (productSearch) productSearch.addEventListener('input', () => applyProductFilters());
    if (categoryFilter) categoryFilter.addEventListener('change', () => applyProductFilters());
    if (stockFilter) stockFilter.addEventListener('change', () => applyProductFilters());

    // Employees
    const empSearch = document.getElementById('empSearch') as HTMLInputElement;
    const deptFilter = document.getElementById('deptFilter') as HTMLSelectElement;

    if (empSearch) {
        empSearch.addEventListener('input', (e) => {
            renderEmployees((e.target as HTMLInputElement).value, deptFilter ? deptFilter.value : '');
        });
    }
    if (deptFilter) {
        deptFilter.addEventListener('change', (e) => {
            renderEmployees(empSearch ? empSearch.value : '', (e.target as HTMLSelectElement).value);
        });
    }

    // ══════════════════════════════════════════════════════════════
    //  CSV UTILITIES
    // ══════════════════════════════════════════════════════════════

    /**  Convert an array of objects to a CSV string */
    function arrayToCSV(data: any[], columns: { label: string; key: string | ((row: any) => any) }[]) {
        const header = columns.map(c => c.label).join(',');
        const rows = data.map(row =>
            columns.map(c => {
                let val = typeof c.key === 'function' ? c.key(row) : row[c.key as string];
                if (val === undefined || val === null) val = '';
                val = String(val);
                // Escape quotes and wrap in quotes if contains comma/quote/newline
                if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                    val = '"' + val.replace(/"/g, '""') + '"';
                }
                return val;
            }).join(',')
        );
        return [header, ...rows].join('\n');
    }

    /** Trigger a CSV file download */
    function downloadCSV(csvContent: string, filename: string) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /** Parse a CSV string into an array of objects using the header row as keys */
    function parseCSV(csvText: string): Record<string, string>[] {
        const lines = csvText.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) return [];
        const headers = parseCSVLine(lines[0]);
        const results: Record<string, string>[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            const obj: Record<string, string> = {};
            headers.forEach((h, idx) => {
                obj[h.trim()] = (values[idx] || '').trim();
            });
            results.push(obj);
        }
        return results;
    }

    /** Parse a single CSV line, handling quoted fields */
    function parseCSVLine(line: string): string[] {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"' && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else if (ch === '"') {
                    inQuotes = false;
                } else {
                    current += ch;
                }
            } else {
                if (ch === '"') {
                    inQuotes = true;
                } else if (ch === ',') {
                    result.push(current);
                    current = '';
                } else {
                    current += ch;
                }
            }
        }
        result.push(current);
        return result;
    }

    /** Read a file input and return its text content */
    function readFileAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }

    /** Show a brief toast notification */
    function showToast(message: string, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'csv-toast ' + type;
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2800);
    }

    // ══════════════════════════════════════════════════════════════
    //  EXPORT CSV HANDLERS
    // ══════════════════════════════════════════════════════════════

    // -- Transactions Export
    const btnExportTxn = document.getElementById('btnExportTxn');
    if (btnExportTxn) {
        btnExportTxn.addEventListener('click', () => {
            const cols = [
                { label: 'Txn ID', key: 'id' },
                { label: 'Store', key: 'store' },
                { label: 'Customer', key: 'customer' },
                { label: 'Items', key: 'items' },
                { label: 'Total', key: 'total' },
                { label: 'Payment', key: 'method' },
                { label: 'Time', key: 'time' },
                { label: 'Status', key: 'status' },
            ];
            downloadCSV(arrayToCSV(DATA.transactions, cols), 'transactions.csv');
            showToast('Transactions exported successfully');
        });
    }

    // -- Products Export
    const btnExportProducts = document.getElementById('btnExportProducts');
    if (btnExportProducts) {
        btnExportProducts.addEventListener('click', () => {
            const cols = [
                { label: 'SKU', key: 'sku' },
                { label: 'Product Name', key: 'name' },
                { label: 'Category', key: 'category' },
                { label: 'Price', key: 'price' },
                { label: 'Stock', key: 'stock' },
                { label: 'Reorder Level', key: 'reorderLevel' },
                { label: 'Status', key: 'status' },
            ];
            downloadCSV(arrayToCSV(DATA.products, cols), 'inventory.csv');
            showToast('Inventory exported successfully');
        });
    }

    // -- Stores Export
    const btnExportStores = document.getElementById('btnExportStores');
    if (btnExportStores) {
        btnExportStores.addEventListener('click', () => {
            const cols = [
                { label: 'Store ID', key: 'id' },
                { label: 'Name', key: 'name' },
                { label: 'City', key: 'city' },
                { label: 'Region', key: 'region' },
                { label: 'Revenue', key: 'revenue' },
                { label: 'Orders', key: 'orders' },
                { label: 'Rating', key: 'rating' },
                { label: 'Status', key: 'status' },
            ];
            downloadCSV(arrayToCSV(DATA.stores, cols), 'stores.csv');
            showToast('Store data exported successfully');
        });
    }

    // -- Employees Export
    const btnExportEmployees = document.getElementById('btnExportEmployees');
    if (btnExportEmployees) {
        btnExportEmployees.addEventListener('click', () => {
            const cols = [
                { label: 'ID', key: 'id' },
                { label: 'Name', key: 'name' },
                { label: 'Department', key: 'department' },
                { label: 'Designation', key: 'designation' },
                { label: 'Store', key: 'store' },
                { label: 'Join Date', key: 'joinDate' },
                { label: 'Status', key: 'status' },
                { label: 'Attendance', key: 'attendance' },
            ];
            downloadCSV(arrayToCSV(DATA.employees, cols), 'employees.csv');
            showToast('Employee data exported successfully');
        });
    }

    // ══════════════════════════════════════════════════════════════
    //  IMPORT CSV HANDLERS
    // ══════════════════════════════════════════════════════════════

    // -- Transactions Import
    const btnImportTxn = document.getElementById('btnImportTxn');
    const importTxnFile = document.getElementById('importTxnFile') as HTMLInputElement;

    if (btnImportTxn && importTxnFile) {
        btnImportTxn.addEventListener('click', () => {
            importTxnFile.click();
        });
        importTxnFile.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            if (!file) return;
            try {
                const text = await readFileAsText(file);
                const rows = parseCSV(text);
                if (rows.length === 0) { showToast('No data found in CSV', 'error'); return; }

                // Map CSV columns to data fields
                DATA.transactions = rows.map((r, i) => ({
                    id: r['Txn ID'] || r['id'] || `TXN-I${String(i + 1).padStart(4, '0')}`,
                    store: r['Store'] || r['store'] || '',
                    customer: r['Customer'] || r['customer'] || '',
                    items: parseInt(r['Items'] || r['items'] || '0', 10),
                    total: r['Total'] || r['total'] || '',
                    method: r['Payment'] || r['method'] || '',
                    time: r['Time'] || r['time'] || '',
                    status: (r['Status'] || r['status'] || 'completed').toLowerCase() as Transaction['status'],
                }));
                renderTransactions();
                showToast(`Imported ${DATA.transactions.length} transactions`);
            } catch (err) {
                showToast('Failed to read CSV file', 'error');
            }
            target.value = ''; // reset so same file can be re-imported
        });
    }

    // -- Products Import
    const btnImportProducts = document.getElementById('btnImportProducts');
    const importProductFile = document.getElementById('importProductFile') as HTMLInputElement;

    if (btnImportProducts && importProductFile) {
        btnImportProducts.addEventListener('click', () => {
            importProductFile.click();
        });
        importProductFile.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            if (!file) return;
            try {
                const text = await readFileAsText(file);
                const rows = parseCSV(text);
                if (rows.length === 0) { showToast('No data found in CSV', 'error'); return; }

                DATA.products = rows.map((r, i) => {
                    const stock = parseInt(r['Stock'] || r['stock'] || '0', 10);
                    const reorder = parseInt(r['Reorder Level'] || r['reorderLevel'] || '100', 10);
                    let status = (r['Status'] || r['status'] || '').toLowerCase();
                    if (!status || !['good', 'low', 'critical'].includes(status)) {
                        status = stock <= reorder * 0.5 ? 'critical' : stock <= reorder ? 'low' : 'good';
                    }
                    return {
                        sku: r['SKU'] || r['sku'] || `PRD-I${String(i + 1).padStart(4, '0')}`,
                        name: r['Product Name'] || r['name'] || '',
                        category: r['Category'] || r['category'] || '',
                        price: parseFloat(r['Price'] || r['price'] || '0'),
                        stock: stock,
                        reorderLevel: reorder,
                        status: status as Product['status'],
                    };
                });

                // Repopulate the category filter
                const catSelect = document.getElementById('categoryFilter');
                if (catSelect) {
                    catSelect.innerHTML = '<option value="">All Categories</option>';
                    const cats = [...new Set(DATA.products.map(p => p.category))];
                    cats.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c; opt.textContent = c;
                        catSelect.appendChild(opt);
                    });
                }

                renderProducts();
                showToast(`Imported ${DATA.products.length} products`);
            } catch (err) {
                showToast('Failed to read CSV file', 'error');
            }
            target.value = '';
        });
    }

    // -- Stores Import
    const btnImportStores = document.getElementById('btnImportStores');
    const importStoreFile = document.getElementById('importStoreFile') as HTMLInputElement;

    if (btnImportStores && importStoreFile) {
        btnImportStores.addEventListener('click', () => {
            importStoreFile.click();
        });
        importStoreFile.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            if (!file) return;
            try {
                const text = await readFileAsText(file);
                const rows = parseCSV(text);
                if (rows.length === 0) { showToast('No data found in CSV', 'error'); return; }

                DATA.stores = rows.map((r, i) => ({
                    id: r['Store ID'] || r['id'] || `STR-I${String(i + 1).padStart(3, '0')}`,
                    name: r['Name'] || r['name'] || '',
                    city: r['City'] || r['city'] || '',
                    region: r['Region'] || r['region'] || '',
                    revenue: r['Revenue'] || r['revenue'] || '',
                    orders: parseInt(r['Orders'] || r['orders'] || '0', 10),
                    rating: parseFloat(r['Rating'] || r['rating'] || '0'),
                    status: (r['Status'] || r['status'] || 'active').toLowerCase() as Store['status'],
                }));
                renderStoreCards();
                renderStoreTable();
                showToast(`Imported ${DATA.stores.length} stores`);
            } catch (err) {
                showToast('Failed to read CSV file', 'error');
            }
            target.value = '';
        });
    }

    // -- Employees Import (Moved logic here for consistency)
    const btnImportEmployees = document.getElementById('btnImportEmployees');
    const importEmpFile = document.getElementById('importEmpFile') as HTMLInputElement;

    if (btnImportEmployees && importEmpFile) {
        btnImportEmployees.addEventListener('click', () => {
            importEmpFile.click();
        });
        importEmpFile.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            if (!file) return;
            try {
                const text = await readFileAsText(file);
                const rows = parseCSV(text);
                if (rows.length === 0) { showToast('No data found in CSV', 'error'); return; }

                DATA.employees = rows.map((r, i) => ({
                    id: r['ID'] || r['id'] || `EMP-I${String(i + 1).padStart(3, '0')}`,
                    name: r['Name'] || r['name'] || '',
                    department: r['Department'] || r['department'] || '',
                    designation: r['Designation'] || r['designation'] || '',
                    store: r['Store'] || r['store'] || '',
                    joinDate: r['Join Date'] || r['joinDate'] || '',
                    status: (r['Status'] || r['status'] || 'active').toLowerCase() as Employee['status'],
                    attendance: parseInt(r['Attendance'] || r['attendance'] || '0', 10),
                }));

                // Repopulate department filter
                const deptSelect = document.getElementById('deptFilter');
                if (deptSelect) {
                    deptSelect.innerHTML = '<option value="">All Departments</option>';
                    const depts = [...new Set(DATA.employees.map(emp => emp.department))];
                    depts.forEach(d => {
                        const opt = document.createElement('option');
                        opt.value = d; opt.textContent = d;
                        deptSelect.appendChild(opt);
                    });
                }

                renderEmployees();
                renderDeptBreakdown();
                showToast(`Imported ${DATA.employees.length} employees`);
            } catch (err) {
                showToast('Failed to read CSV file', 'error');
            }
            target.value = '';
        });
    }

    // ══════════════════════════════════════════════════════════════
    //  EDIT USER LOGIC
    // ══════════════════════════════════════════════════════════════

    const modalEditUser = document.getElementById('modalEditUser') as HTMLElement;
    const btnCloseEditUser = document.getElementById('btnCloseEditUser') as HTMLElement;
    const btnCancelEditUser = document.getElementById('btnCancelEditUser') as HTMLElement;
    const formEditUser = document.getElementById('formEditUser') as HTMLFormElement;

    function openEditUserModal(userId: string) {
        const user = DATA.users.find(u => u.id === parseInt(userId, 10));
        if (!user) return;

        // Check if elements exist before accessing value
        const editUserId = document.getElementById('editUserId') as HTMLInputElement;
        const editUserName = document.getElementById('editUserName') as HTMLInputElement;
        const editUserEmail = document.getElementById('editUserEmail') as HTMLInputElement;
        const editUserStore = document.getElementById('editUserStore') as HTMLInputElement;
        const roleSelect = document.getElementById('editUserRole') as HTMLSelectElement;

        if (editUserId) editUserId.value = String(user.id);
        if (editUserName) editUserName.value = user.name;
        if (editUserEmail) editUserEmail.value = user.email;
        if (editUserStore) editUserStore.value = user.store;

        // Populate roles
        if (roleSelect) {
            roleSelect.innerHTML = DATA.roles.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
            roleSelect.value = user.role;
        }

        if (modalEditUser) modalEditUser.classList.add('active');
    }

    function closeEditUserModal() {
        if (modalEditUser) modalEditUser.classList.remove('active');
    }

    if (btnCloseEditUser) btnCloseEditUser.addEventListener('click', closeEditUserModal);
    if (btnCancelEditUser) btnCancelEditUser.addEventListener('click', closeEditUserModal);
    if (modalEditUser) modalEditUser.addEventListener('click', (e) => { if (e.target === modalEditUser) closeEditUserModal(); });

    if (formEditUser) {
        formEditUser.addEventListener('submit', (e) => {
            e.preventDefault();
            const editUserId = document.getElementById('editUserId') as HTMLInputElement;
            const editUserName = document.getElementById('editUserName') as HTMLInputElement;
            const editUserEmail = document.getElementById('editUserEmail') as HTMLInputElement;
            const editUserRole = document.getElementById('editUserRole') as HTMLSelectElement;
            const editUserStore = document.getElementById('editUserStore') as HTMLInputElement;

            const userId = editUserId ? editUserId.value : '';
            const name = editUserName ? editUserName.value : '';
            const email = editUserEmail ? editUserEmail.value : '';
            const role = editUserRole ? editUserRole.value : '';
            const store = editUserStore ? editUserStore.value : '';

            const userIndex = DATA.users.findIndex(u => u.id === parseInt(userId, 10));
            if (userIndex > -1) {
                DATA.users[userIndex] = { ...DATA.users[userIndex], name, email, role, store };
                const userSearch = document.getElementById('userSearch') as HTMLInputElement;
                const roleFilter = document.getElementById('roleFilter') as HTMLSelectElement;

                renderUsers(userSearch ? userSearch.value : '', roleFilter ? roleFilter.value : '');
                showToast('User updated successfully');
                closeEditUserModal();
            }
        });
    }

    // ══════════════════════════════════════════════════════════════
    //  GLOBAL SEARCH & INSIGHTS
    // ══════════════════════════════════════════════════════════════

    const searchInput = document.getElementById('globalSearch') as HTMLInputElement;
    const searchSection = document.getElementById('page-search-results') as HTMLElement;
    const btnCloseSearch = document.getElementById('btnCloseSearch') as HTMLElement;

    if (searchInput && searchSection) {
        // Debounce search
        let searchTimeout: any;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = (e.target as HTMLInputElement).value.trim().toLowerCase();
            if (!query) {
                // If empty, return to dashboard if currently on search page
                if (searchSection.classList.contains('active')) {
                    switchPage('dashboard');
                }
                return;
            }
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Close search button
        if (btnCloseSearch) {
            btnCloseSearch.addEventListener('click', () => {
                switchPage('dashboard');
                searchInput.value = '';
            });
        }
    }

    function performSearch(query: string) {
        // Switch to search page manually
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        if (searchSection) searchSection.classList.add('active');

        // Update Header
        if (searchSection) {
            const searchHeader = searchSection.querySelector('h2');
            if (searchHeader) searchHeader.textContent = `Search Results for "${query}"`;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Deactivate sidebar nav
        document.querySelectorAll('.sidebar-nav-btn').forEach(b => b.classList.remove('active'));

        // Filter Data
        const products = DATA.products.filter(p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        const stores = DATA.stores.filter(s => s.name.toLowerCase().includes(query) || s.city.toLowerCase().includes(query));
        const employees = DATA.employees.filter(e => e.name.toLowerCase().includes(query) || e.department.toLowerCase().includes(query));
        const transactions = DATA.transactions.filter(t => t.id.toLowerCase().includes(query) || t.customer.toLowerCase().includes(query));

        renderSearchKPIs(products, stores, employees, transactions);
        renderSearchResultsGrid(products, stores);
        renderSearchTable(products, stores, employees, transactions);
    }

    function renderSearchKPIs(products: any[], stores: any[], employees: any[], transactions: any[]) {
        const kpiGrid = document.getElementById('searchKpiGrid');
        if (!kpiGrid) return;

        const totalMatches = products.length + stores.length + employees.length + transactions.length;

        kpiGrid.innerHTML = `
      <div class="card kpi-card">
        <div class="kpi-icon primary">${SVG.search || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'}</div>
        <div class="kpi-label">Total Matches</div>
        <div class="kpi-value">${totalMatches}</div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-icon warning">${SVG.products || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'}</div>
        <div class="kpi-label">Products Found</div>
        <div class="kpi-value">${products.length}</div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-icon success">${SVG.revenue || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'}</div>
        <div class="kpi-label">Stores Found</div>
        <div class="kpi-value">${stores.length}</div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-icon info">${SVG.users || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'}</div>
        <div class="kpi-label">Employees/Txns</div>
        <div class="kpi-value">${employees.length + transactions.length}</div>
      </div>
    `;
    }

    function renderSearchResultsGrid(products: any[], stores: any[]) {
        const grid = document.getElementById('searchResultsGrid');
        if (!grid) return;
        let html = '';

        // Show top 3 products
        products.slice(0, 3).forEach(p => {
            html += `
        <div class="card p-4">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="font-weight:700; font-size:1rem;">${p.name}</div>
            <div class="status-badge ${p.status === 'good' ? 'active' : p.status === 'low' ? 'pending' : 'inactive'}">${p.status}</div>
          </div>
          <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:4px;">SKU: ${p.sku}</div>
          <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:4px;">Price: ₹${p.price}</div>
          <div style="font-size:0.88rem; color:var(--text-secondary);">Stock: ${p.stock} units</div>
        </div>
      `;
        });

        // Show top 3 stores
        stores.slice(0, 3).forEach(s => {
            html += `
        <div class="card p-4">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="font-weight:700; font-size:1rem;">${s.name}</div>
            <div class="status-badge ${s.status === 'active' ? 'active' : 'inactive'}">${s.status}</div>
          </div>
          <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:4px;">${s.city}, ${s.region}</div>
          <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:4px;">Revenue: ${s.revenue}</div>
          <div style="font-size:0.88rem; color:var(--text-secondary);">Rating: ${SVG.star || '★'} ${s.rating}</div>
        </div>
      `;
        });

        if (html === '') {
            html = '<div style="grid-column:1/-1; padding:20px; text-align:center; color:var(--text-muted);">No direct card matches found for Products or Stores.</div>';
        }
        grid.innerHTML = html;
    }

    function renderSearchTable(products: any[], stores: any[], employees: any[], transactions: any[]) {
        const tbody = document.getElementById('searchTableBody');
        if (!tbody) return;
        let rows = '';

        // Products
        products.forEach(p => {
            rows += `
        <tr>
          <td><span class="status-badge active" style="background:var(--bg-tint); color:var(--text-primary);">Product</span></td>
          <td style="font-weight:600;">${p.name}</td>
          <td>₹${p.price}</td>
          <td>Stock: ${p.stock}</td>
          <td><span class="status-badge ${p.status === 'good' ? 'active' : p.status === 'low' ? 'pending' : 'inactive'}">${p.status}</span></td>
          <td><button class="btn-icon" style="color:var(--accent-primary);">View</button></td>
        </tr>
      `;
        });

        // Stores
        stores.forEach(s => {
            rows += `
        <tr>
          <td><span class="status-badge active" style="background:var(--bg-tint); color:var(--text-primary);">Store</span></td>
          <td style="font-weight:600;">${s.name}</td>
          <td>${s.revenue}</td>
          <td>Orders: ${s.orders}</td>
          <td><span class="status-badge ${s.status === 'active' ? 'active' : 'inactive'}">${s.status}</span></td>
          <td><button class="btn-icon" style="color:var(--accent-primary);">View</button></td>
        </tr>
      `;
        });

        // Employees
        employees.forEach(e => {
            rows += `
        <tr>
          <td><span class="status-badge active" style="background:var(--bg-tint); color:var(--text-primary);">Employee</span></td>
          <td style="font-weight:600;">${e.name}</td>
          <td>${e.department}</td>
          <td>${e.designation}</td>
          <td><span class="status-badge ${e.status === 'active' ? 'active' : 'inactive'}">${e.status}</span></td>
          <td><button class="btn-icon" style="color:var(--accent-primary);">View</button></td>
        </tr>
      `;
        });

        // Transactions
        transactions.forEach(t => {
            rows += `
        <tr>
          <td><span class="status-badge active" style="background:var(--bg-tint); color:var(--text-primary);">Transaction</span></td>
          <td style="font-weight:600;">${t.id}</td>
          <td>${t.total}</td>
          <td>Customer: ${t.customer}</td>
          <td><span class="status-badge ${t.status === 'completed' ? 'active' : t.status === 'processing' ? 'pending' : 'inactive'}">${t.status}</span></td>
          <td><button class="btn-icon" style="color:var(--accent-primary);">View</button></td>
        </tr>
      `;
        });

        if (rows === '') {
            rows = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">No results found.</td></tr>`;
        }
        tbody.innerHTML = rows;
    }

    // ══════════════════════════════════════════════════════════════
    //  HEADER DROPDOWNS
    // ══════════════════════════════════════════════════════════════

    const btnNotifications = document.getElementById('btnNotifications') as HTMLElement;
    const dropdownNotifications = document.getElementById('dropdownNotifications') as HTMLElement;
    const btnProfile = document.getElementById('btnProfile') as HTMLElement;
    const dropdownProfile = document.getElementById('dropdownProfile') as HTMLElement;
    const btnHelp = document.getElementById('btnHelp') as HTMLElement;
    const dropdownHelp = document.getElementById('dropdownHelp') as HTMLElement;

    function closeAllDropdowns() {
        if (dropdownNotifications) dropdownNotifications.classList.remove('active');
        if (dropdownProfile) dropdownProfile.classList.remove('active');
        if (dropdownHelp) dropdownHelp.classList.remove('active');
    }

    if (btnNotifications && dropdownNotifications) {
        btnNotifications.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = dropdownNotifications.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) dropdownNotifications.classList.add('active');
        });

        dropdownNotifications.addEventListener('click', (e) => e.stopPropagation());
    }

    if (btnProfile && dropdownProfile) {
        btnProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = dropdownProfile.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) dropdownProfile.classList.add('active');
        });

        dropdownProfile.addEventListener('click', (e) => e.stopPropagation());
    }

    if (btnHelp && dropdownHelp) {
        btnHelp.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = dropdownHelp.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) dropdownHelp.classList.add('active');
        });

        dropdownHelp.addEventListener('click', (e) => e.stopPropagation());
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // ══════════════════════════════════════════════════════════════
    //  ADD / EDIT PRODUCT MODAL
    // ══════════════════════════════════════════════════════════════

    const modalAddProduct = document.getElementById('modalAddProduct') as HTMLElement;
    const btnAddProduct = document.getElementById('btnAddProduct') as HTMLElement;
    const btnCloseAddProduct = document.getElementById('btnCloseAddProduct') as HTMLElement;
    const btnCancelAddProduct = document.getElementById('btnCancelAddProduct') as HTMLElement;
    const formAddProduct = document.getElementById('formAddProduct') as HTMLFormElement;
    const modalTitle = modalAddProduct ? modalAddProduct.querySelector('h3') : null;
    const modalSubmitBtn = formAddProduct ? formAddProduct.querySelector('button[type="submit"]') : null;

    function openAddProductModal() {
        if (modalAddProduct) {
            modalAddProduct.classList.add('active');
            if (modalTitle) modalTitle.textContent = 'Add New Product';
            if (modalSubmitBtn) modalSubmitBtn.textContent = 'Add Product';
            if (formAddProduct) delete formAddProduct.dataset.editSku;
        }
    }

    function openEditProductModal(sku: string) {
        const product = DATA.products.find(p => p.sku === sku);
        if (!product || !modalAddProduct) return;

        // Populate form
        const prodName = document.getElementById('prodName') as HTMLInputElement;
        const prodSku = document.getElementById('prodSku') as HTMLInputElement;
        const prodCategory = document.getElementById('prodCategory') as HTMLInputElement;
        const prodPrice = document.getElementById('prodPrice') as HTMLInputElement;
        const prodStock = document.getElementById('prodStock') as HTMLInputElement;
        const prodReorder = document.getElementById('prodReorder') as HTMLInputElement;

        if (prodName) prodName.value = product.name;
        if (prodSku) prodSku.value = product.sku;
        if (prodCategory) prodCategory.value = product.category;
        if (prodPrice) prodPrice.value = String(product.price);
        if (prodStock) prodStock.value = String(product.stock);
        if (prodReorder) prodReorder.value = String(product.reorderLevel);

        // Set Edit Mode
        if (modalTitle) modalTitle.textContent = 'Edit Product';
        if (modalSubmitBtn) modalSubmitBtn.textContent = 'Update Product';
        if (formAddProduct) formAddProduct.dataset.editSku = sku;

        modalAddProduct.classList.add('active');
    }

    function closeAddProductModal() {
        if (modalAddProduct) {
            modalAddProduct.classList.remove('active');
            if (formAddProduct) {
                formAddProduct.reset();
                delete formAddProduct.dataset.editSku;
            }
        }
    }

    if (btnAddProduct && modalAddProduct) {
        btnAddProduct.addEventListener('click', (e) => {
            e.stopPropagation();
            openAddProductModal();
        });

        // Delegated listener for Edit buttons
        document.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('btn-edit-product')) {
                const sku = target.dataset.sku;
                if (sku) openEditProductModal(sku);
            }
        });

        if (btnCloseAddProduct) btnCloseAddProduct.addEventListener('click', closeAddProductModal);
        if (btnCancelAddProduct) btnCancelAddProduct.addEventListener('click', closeAddProductModal);

        modalAddProduct.addEventListener('click', (e) => {
            if (e.target === modalAddProduct) closeAddProductModal();
        });

        if (formAddProduct) {
            formAddProduct.addEventListener('submit', (e) => {
                e.preventDefault();

                const prodStock = document.getElementById('prodStock') as HTMLInputElement;
                const prodReorder = document.getElementById('prodReorder') as HTMLInputElement;
                const stock = parseInt(prodStock ? prodStock.value : '0');
                const reorder = parseInt(prodReorder ? prodReorder.value : '0') || 0;

                let status: Product['status'] = 'good';
                if (stock === 0) status = 'critical'; // changed from Out of Stock to critical/low/good to match type
                else if (stock <= reorder) status = 'low';

                const editSku = formAddProduct.dataset.editSku;

                const prodName = document.getElementById('prodName') as HTMLInputElement;
                const prodSku = document.getElementById('prodSku') as HTMLInputElement;
                const prodCategory = document.getElementById('prodCategory') as HTMLInputElement;
                const prodPrice = document.getElementById('prodPrice') as HTMLInputElement;

                if (editSku) {
                    // UPDATE EXISTING
                    const index = DATA.products.findIndex(p => p.sku === editSku);
                    if (index !== -1) {
                        DATA.products[index] = {
                            ...DATA.products[index],
                            name: prodName ? prodName.value : '',
                            sku: prodSku ? prodSku.value : '',
                            category: prodCategory ? prodCategory.value : '',
                            price: parseFloat(prodPrice ? prodPrice.value : '0'),
                            stock: stock,
                            reorderLevel: reorder,
                            status: status
                        };
                        showToast(`Product updated successfully`, 'success');
                    }
                } else {
                    // ADD NEW
                    const newProduct: Product = {
                        sku: prodSku ? prodSku.value : '',
                        name: prodName ? prodName.value : '',
                        category: prodCategory ? prodCategory.value : '',
                        price: parseFloat(prodPrice ? prodPrice.value : '0'),
                        stock: stock,
                        reorderLevel: reorder,
                        status: status,
                    };
                    DATA.products.unshift(newProduct);
                    showToast(`Product "${newProduct.name}" added successfully`, 'success');
                }

                renderProducts(); // Re-render table
                renderKPIs(); // Update counts
                closeAddProductModal();
            });
        }
    }

    // ══════════════════════════════════════════════════════════════
    //  ADD EMPLOYEE MODAL
    // ══════════════════════════════════════════════════════════════

    const modalAddEmployee = document.getElementById('modalAddEmployee') as HTMLElement;
    const btnAddEmployee = document.getElementById('btnAddEmployee') as HTMLElement;
    const btnCloseAddEmployee = document.getElementById('btnCloseAddEmployee') as HTMLElement;
    const btnCancelAddEmployee = document.getElementById('btnCancelAddEmployee') as HTMLElement;
    const formAddEmployee = document.getElementById('formAddEmployee') as HTMLFormElement;

    function openAddEmployeeModal() {
        if (modalAddEmployee) modalAddEmployee.classList.add('active');
    }

    function closeAddEmployeeModal() {
        if (modalAddEmployee) {
            modalAddEmployee.classList.remove('active');
            if (formAddEmployee) formAddEmployee.reset();
        }
    }

    if (btnAddEmployee && modalAddEmployee) {
        btnAddEmployee.addEventListener('click', (e) => {
            e.stopPropagation();
            openAddEmployeeModal();
        });

        if (btnCloseAddEmployee) btnCloseAddEmployee.addEventListener('click', closeAddEmployeeModal);
        if (btnCancelAddEmployee) btnCancelAddEmployee.addEventListener('click', closeAddEmployeeModal);

        modalAddEmployee.addEventListener('click', (e) => {
            if (e.target === modalAddEmployee) closeAddEmployeeModal();
        });

        if (formAddEmployee) {
            formAddEmployee.addEventListener('submit', (e) => {
                e.preventDefault();

                const idNum = DATA.employees.length + 1;
                const idStr = `EMP-${idNum.toString().padStart(3, '0')}`;

                const empName = document.getElementById('empName') as HTMLInputElement;
                const empDept = document.getElementById('empDept') as HTMLSelectElement;
                const empDesignation = document.getElementById('empDesignation') as HTMLInputElement;
                const empStore = document.getElementById('empStore') as HTMLSelectElement;
                const empJoinDate = document.getElementById('empJoinDate') as HTMLInputElement;
                const empStatus = document.getElementById('empStatus') as HTMLSelectElement;

                const name = empName ? empName.value : '';

                const newEmployee: Employee = {
                    id: idStr,
                    name: name,
                    department: empDept ? empDept.value : '',
                    designation: empDesignation ? empDesignation.value : '',
                    store: empStore ? empStore.value : '',
                    joinDate: empJoinDate ? empJoinDate.value : '',
                    status: (empStatus ? empStatus.value : 'active') as Employee['status'],
                    attendance: Math.floor(Math.random() * (100 - 85 + 1)) + 85 // Random 85-100
                };

                DATA.employees.unshift(newEmployee);
                renderEmployees();

                showToast(`Employee "${name}" added successfully`, 'success');
                closeAddEmployeeModal();
            });
        }
    }

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


