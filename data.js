// ═══════════════════════════════════════════════════════════════
// Gulab Jamun – Sample Data
// ═══════════════════════════════════════════════════════════════

const DATA = {

    // ── KPI Summary ──────────────────────────────────────────────
    kpis: {
        totalRevenue: '₹2,84,35,000',
        revenueChange: '+12.5%',
        totalOrders: '18,432',
        ordersChange: '+8.3%',
        totalCustomers: '9,871',
        customersChange: '+15.2%',
        inventoryHealth: '87%',
        inventoryChange: '-2.1%',
        avgOrderValue: '₹1,543',
        aovChange: '+4.7%',
        returnRate: '3.2%',
        returnChange: '-0.8%',
    },

    // ── Stores ───────────────────────────────────────────────────
    stores: [
        { id: 'STR-001', name: 'Gulab Jamun Central', city: 'Mumbai', region: 'West', revenue: '₹42,50,000', orders: 3120, status: 'active', rating: 4.8 },
        { id: 'STR-002', name: 'Gulab Jamun Saket', city: 'New Delhi', region: 'North', revenue: '₹38,20,000', orders: 2890, status: 'active', rating: 4.6 },
        { id: 'STR-003', name: 'Gulab Jamun Koramangala', city: 'Bengaluru', region: 'South', revenue: '₹35,10,000', orders: 2650, status: 'active', rating: 4.7 },
        { id: 'STR-004', name: 'Gulab Jamun Salt Lake', city: 'Kolkata', region: 'East', revenue: '₹28,40,000', orders: 2100, status: 'active', rating: 4.3 },
        { id: 'STR-005', name: 'Gulab Jamun Baner', city: 'Pune', region: 'West', revenue: '₹26,80,000', orders: 1980, status: 'active', rating: 4.5 },
        { id: 'STR-006', name: 'Gulab Jamun Anna Nagar', city: 'Chennai', region: 'South', revenue: '₹24,60,000', orders: 1840, status: 'active', rating: 4.4 },
        { id: 'STR-007', name: 'Gulab Jamun Navrangpura', city: 'Ahmedabad', region: 'West', revenue: '₹22,30,000', orders: 1670, status: 'active', rating: 4.2 },
        { id: 'STR-008', name: 'Gulab Jamun Aliganj', city: 'Lucknow', region: 'North', revenue: '₹20,10,000', orders: 1520, status: 'maintenance', rating: 4.1 },
        { id: 'STR-009', name: 'Gulab Jamun Palasia', city: 'Indore', region: 'Central', revenue: '₹18,90,000', orders: 1410, status: 'active', rating: 4.0 },
        { id: 'STR-010', name: 'Gulab Jamun MG Road', city: 'Kochi', region: 'South', revenue: '₹17,50,000', orders: 1250, status: 'active', rating: 4.3 },
    ],

    // ── Products / Inventory ─────────────────────────────────────
    products: [
        { sku: 'PRD-1001', name: 'Basmati Rice Premium 5kg', category: 'Grocery', price: 620, stock: 1240, reorderLevel: 200, status: 'good' },
        { sku: 'PRD-1002', name: 'Tata Salt 1kg', category: 'Grocery', price: 28, stock: 3400, reorderLevel: 500, status: 'good' },
        { sku: 'PRD-1003', name: 'Amul Butter 500g', category: 'Dairy', price: 270, stock: 890, reorderLevel: 150, status: 'good' },
        { sku: 'PRD-1004', name: 'Surf Excel Matic 2kg', category: 'Household', price: 480, stock: 120, reorderLevel: 200, status: 'low' },
        { sku: 'PRD-1005', name: 'Aashirvaad Atta 10kg', category: 'Grocery', price: 420, stock: 670, reorderLevel: 100, status: 'good' },
        { sku: 'PRD-1006', name: 'Cadbury Dairy Milk Silk', category: 'Confectionery', price: 160, stock: 45, reorderLevel: 100, status: 'critical' },
        { sku: 'PRD-1007', name: 'Maggi 2-Minute Noodles 12pk', category: 'Grocery', price: 144, stock: 2100, reorderLevel: 300, status: 'good' },
        { sku: 'PRD-1008', name: 'Tropicana Orange Juice 1L', category: 'Beverages', price: 110, stock: 380, reorderLevel: 100, status: 'good' },
        { sku: 'PRD-1009', name: 'Nivea Body Lotion 400ml', category: 'Personal Care', price: 350, stock: 85, reorderLevel: 100, status: 'low' },
        { sku: 'PRD-1010', name: 'Bisleri Water 1L (Pack 12)', category: 'Beverages', price: 240, stock: 1560, reorderLevel: 200, status: 'good' },
        { sku: 'PRD-1011', name: 'Haldiram Namkeen Mix 400g', category: 'Snacks', price: 190, stock: 920, reorderLevel: 150, status: 'good' },
        { sku: 'PRD-1012', name: 'Dove Shampoo 340ml', category: 'Personal Care', price: 290, stock: 30, reorderLevel: 80, status: 'critical' },
        { sku: 'PRD-1013', name: 'Mother Dairy Milk 1L', category: 'Dairy', price: 64, stock: 2800, reorderLevel: 400, status: 'good' },
        { sku: 'PRD-1014', name: 'Vim Dishwash Gel 750ml', category: 'Household', price: 135, stock: 450, reorderLevel: 100, status: 'good' },
        { sku: 'PRD-1015', name: 'Parle-G Biscuit 800g', category: 'Snacks', price: 65, stock: 3100, reorderLevel: 500, status: 'good' },
        { sku: 'PRD-1016', name: 'Red Bull Energy 250ml', category: 'Beverages', price: 125, stock: 180, reorderLevel: 100, status: 'good' },
        { sku: 'PRD-1017', name: 'Colgate MaxFresh 150g', category: 'Personal Care', price: 95, stock: 60, reorderLevel: 100, status: 'low' },
        { sku: 'PRD-1018', name: 'Tata Tea Gold 500g', category: 'Beverages', price: 280, stock: 740, reorderLevel: 100, status: 'good' },
        { sku: 'PRD-1019', name: 'Lays Classic Chips 130g', category: 'Snacks', price: 40, stock: 1800, reorderLevel: 300, status: 'good' },
        { sku: 'PRD-1020', name: 'Saffola Gold Oil 1L', category: 'Grocery', price: 210, stock: 520, reorderLevel: 100, status: 'good' },
    ],

    // ── Transactions (POS) ──────────────────────────────────────
    transactions: [
        { id: 'TXN-90001', store: 'STR-001', customer: 'Priya Sharma', items: 5, total: '₹2,340', method: 'UPI', time: '11:04 AM', status: 'completed' },
        { id: 'TXN-90002', store: 'STR-003', customer: 'Rajesh Iyer', items: 3, total: '₹1,120', method: 'Card', time: '11:08 AM', status: 'completed' },
        { id: 'TXN-90003', store: 'STR-002', customer: 'Ananya Gupta', items: 8, total: '₹4,560', method: 'UPI', time: '11:12 AM', status: 'completed' },
        { id: 'TXN-90004', store: 'STR-005', customer: 'Vikram Patel', items: 2, total: '₹890', method: 'Cash', time: '11:15 AM', status: 'completed' },
        { id: 'TXN-90005', store: 'STR-001', customer: 'Sneha Reddy', items: 6, total: '₹3,210', method: 'Card', time: '11:18 AM', status: 'completed' },
        { id: 'TXN-90006', store: 'STR-004', customer: 'Amit Das', items: 1, total: '₹420', method: 'UPI', time: '11:22 AM', status: 'refunded' },
        { id: 'TXN-90007', store: 'STR-006', customer: 'Kavitha Nair', items: 4, total: '₹1,870', method: 'Wallet', time: '11:25 AM', status: 'completed' },
        { id: 'TXN-90008', store: 'STR-002', customer: 'Rohit Mehta', items: 7, total: '₹5,100', method: 'Card', time: '11:30 AM', status: 'completed' },
        { id: 'TXN-90009', store: 'STR-007', customer: 'Fatima Sheikh', items: 3, total: '₹960', method: 'UPI', time: '11:34 AM', status: 'completed' },
        { id: 'TXN-90010', store: 'STR-001', customer: 'Arjun Singh', items: 9, total: '₹6,430', method: 'Card', time: '11:38 AM', status: 'processing' },
        { id: 'TXN-90011', store: 'STR-003', customer: 'Deepa Krishnan', items: 2, total: '₹780', method: 'Cash', time: '11:42 AM', status: 'completed' },
        { id: 'TXN-90012', store: 'STR-008', customer: 'Manish Tiwari', items: 4, total: '₹2,100', method: 'UPI', time: '11:45 AM', status: 'completed' },
        { id: 'TXN-90013', store: 'STR-005', customer: 'Lakshmi Rao', items: 6, total: '₹3,890', method: 'Wallet', time: '11:48 AM', status: 'completed' },
        { id: 'TXN-90014', store: 'STR-009', customer: 'Suresh Pandey', items: 1, total: '₹210', method: 'Cash', time: '11:52 AM', status: 'completed' },
        { id: 'TXN-90015', store: 'STR-002', customer: 'Nisha Agarwal', items: 5, total: '₹2,670', method: 'Card', time: '11:55 AM', status: 'completed' },
        { id: 'TXN-90016', store: 'STR-010', customer: 'Karthik Menon', items: 3, total: '₹1,340', method: 'UPI', time: '11:58 AM', status: 'completed' },
        { id: 'TXN-90017', store: 'STR-001', customer: 'Pooja Joshi', items: 8, total: '₹4,920', method: 'Card', time: '12:02 PM', status: 'completed' },
        { id: 'TXN-90018', store: 'STR-004', customer: 'Gaurav Banerjee', items: 2, total: '₹540', method: 'UPI', time: '12:05 PM', status: 'completed' },
        { id: 'TXN-90019', store: 'STR-006', customer: 'Swati Pillai', items: 4, total: '₹1,780', method: 'Cash', time: '12:09 PM', status: 'processing' },
        { id: 'TXN-90020', store: 'STR-003', customer: 'Rahul Verma', items: 6, total: '₹3,450', method: 'Card', time: '12:12 PM', status: 'completed' },
    ],

    // ── Roles & Permissions ─────────────────────────────────────
    roles: [
        { id: 1, name: 'Super Admin', users: 2, color: '#1a1a1a', permissions: { dashboard: true, pos: true, inventory: true, insights: true, hrm: true, settings: true, userMgmt: true } },
        { id: 2, name: 'Store Manager', users: 12, color: '#F97316', permissions: { dashboard: true, pos: true, inventory: true, insights: true, hrm: false, settings: false, userMgmt: false } },
        { id: 3, name: 'Data Analyst', users: 5, color: '#6b7280', permissions: { dashboard: true, pos: false, inventory: true, insights: true, hrm: false, settings: false, userMgmt: false } },
        { id: 4, name: 'Cashier', users: 38, color: '#FB923C', permissions: { dashboard: false, pos: true, inventory: false, insights: false, hrm: false, settings: false, userMgmt: false } },
        { id: 5, name: 'HR Manager', users: 3, color: '#374151', permissions: { dashboard: true, pos: false, inventory: false, insights: false, hrm: true, settings: false, userMgmt: true } },
        { id: 6, name: 'Viewer', users: 15, color: '#9ca3af', permissions: { dashboard: true, pos: false, inventory: false, insights: true, hrm: false, settings: false, userMgmt: false } },
    ],

    users: [
        { id: 1, name: 'Ayush Yadav', email: 'ayush@gulabjamun.in', role: 'Super Admin', store: 'All Stores', lastActive: '2 min ago', avatar: 'AY' },
        { id: 2, name: 'Ritu Kapoor', email: 'ritu@gulabjamun.in', role: 'Super Admin', store: 'All Stores', lastActive: '5 min ago', avatar: 'RK' },
        { id: 3, name: 'Anil Sharma', email: 'anil@gulabjamun.in', role: 'Store Manager', store: 'GJ Central, Mumbai', lastActive: '12 min ago', avatar: 'AS' },
        { id: 4, name: 'Meera Joshi', email: 'meera@gulabjamun.in', role: 'Store Manager', store: 'GJ Saket, Delhi', lastActive: '1 hr ago', avatar: 'MJ' },
        { id: 5, name: 'Siddharth Rao', email: 'sid@gulabjamun.in', role: 'Data Analyst', store: 'All Stores', lastActive: '30 min ago', avatar: 'SR' },
        { id: 6, name: 'Priya Menon', email: 'priya@gulabjamun.in', role: 'Data Analyst', store: 'All Stores', lastActive: '45 min ago', avatar: 'PM' },
        { id: 7, name: 'Rajat Gupta', email: 'rajat@gulabjamun.in', role: 'Cashier', store: 'GJ Central, Mumbai', lastActive: '3 min ago', avatar: 'RG' },
        { id: 8, name: 'Divya Pillai', email: 'divya@gulabjamun.in', role: 'Cashier', store: 'GJ Koramangala', lastActive: '8 min ago', avatar: 'DP' },
        { id: 9, name: 'Vikrant Choudhary', email: 'vikrant@gulabjamun.in', role: 'HR Manager', store: 'All Stores', lastActive: '20 min ago', avatar: 'VC' },
        { id: 10, name: 'Neha Saxena', email: 'neha@gulabjamun.in', role: 'Viewer', store: 'All Stores', lastActive: '2 hrs ago', avatar: 'NS' },
    ],

    // ── Employees (HRM) ─────────────────────────────────────────
    employees: [
        { id: 'EMP-001', name: 'Anil Sharma', department: 'Operations', designation: 'Store Manager', store: 'Mumbai Central', joinDate: '2021-03-15', status: 'active', attendance: 96 },
        { id: 'EMP-002', name: 'Meera Joshi', department: 'Operations', designation: 'Store Manager', store: 'New Delhi Saket', joinDate: '2020-08-01', status: 'active', attendance: 98 },
        { id: 'EMP-003', name: 'Rajat Gupta', department: 'Sales', designation: 'Senior Cashier', store: 'Mumbai Central', joinDate: '2022-01-10', status: 'active', attendance: 92 },
        { id: 'EMP-004', name: 'Divya Pillai', department: 'Sales', designation: 'Cashier', store: 'Bengaluru', joinDate: '2023-06-20', status: 'active', attendance: 89 },
        { id: 'EMP-005', name: 'Siddharth Rao', department: 'Analytics', designation: 'Senior Analyst', store: 'HQ', joinDate: '2021-11-05', status: 'active', attendance: 94 },
        { id: 'EMP-006', name: 'Priya Menon', department: 'Analytics', designation: 'Data Analyst', store: 'HQ', joinDate: '2022-09-12', status: 'active', attendance: 91 },
        { id: 'EMP-007', name: 'Vikrant Choudhary', department: 'HR', designation: 'HR Manager', store: 'HQ', joinDate: '2020-04-01', status: 'active', attendance: 97 },
        { id: 'EMP-008', name: 'Neha Saxena', department: 'Finance', designation: 'Accounts Executive', store: 'HQ', joinDate: '2023-02-18', status: 'active', attendance: 93 },
        { id: 'EMP-009', name: 'Karan Malhotra', department: 'Logistics', designation: 'Warehouse Lead', store: 'Mumbai WH', joinDate: '2021-07-22', status: 'active', attendance: 90 },
        { id: 'EMP-010', name: 'Sunita Devi', department: 'Sales', designation: 'Cashier', store: 'Kolkata', joinDate: '2023-10-01', status: 'active', attendance: 87 },
        { id: 'EMP-011', name: 'Farhan Qureshi', department: 'Logistics', designation: 'Delivery Exec', store: 'Delhi WH', joinDate: '2022-05-14', status: 'on-leave', attendance: 85 },
        { id: 'EMP-012', name: 'Lavanya Krishnan', department: 'Operations', designation: 'Asst. Manager', store: 'Chennai', joinDate: '2022-12-03', status: 'active', attendance: 95 },
        { id: 'EMP-013', name: 'Bharat Patel', department: 'Sales', designation: 'Cashier', store: 'Ahmedabad', joinDate: '2024-01-08', status: 'active', attendance: 88 },
        { id: 'EMP-014', name: 'Isha Tiwari', department: 'HR', designation: 'HR Executive', store: 'HQ', joinDate: '2023-08-25', status: 'active', attendance: 92 },
        { id: 'EMP-015', name: 'Manoj Deshmukh', department: 'Operations', designation: 'Store Manager', store: 'Pune Baner', joinDate: '2021-02-10', status: 'active', attendance: 96 },
    ],

    leaveRequests: [
        { id: 'LV-101', employee: 'Farhan Qureshi', type: 'Sick Leave', from: '2026-02-10', to: '2026-02-14', days: 5, status: 'approved' },
        { id: 'LV-102', employee: 'Divya Pillai', type: 'Casual Leave', from: '2026-02-18', to: '2026-02-19', days: 2, status: 'pending' },
        { id: 'LV-103', employee: 'Karan Malhotra', type: 'Earned Leave', from: '2026-03-01', to: '2026-03-05', days: 5, status: 'pending' },
        { id: 'LV-104', employee: 'Sunita Devi', type: 'Casual Leave', from: '2026-02-20', to: '2026-02-20', days: 1, status: 'pending' },
        { id: 'LV-105', employee: 'Rajat Gupta', type: 'Sick Leave', from: '2026-02-05', to: '2026-02-06', days: 2, status: 'approved' },
        { id: 'LV-106', employee: 'Bharat Patel', type: 'Earned Leave', from: '2026-02-25', to: '2026-02-28', days: 4, status: 'rejected' },
    ],

    // ── Recent Activity (Dashboard Feed) ────────────────────────
    recentActivity: [
        { icon: 'order', text: 'New order #TXN-90010 placed at Mumbai Central', time: '2 min ago', type: 'order' },
        { icon: 'shipment', text: 'Shipment SHP-4421 dispatched from Delhi WH', time: '8 min ago', type: 'shipment' },
        { icon: 'alert', text: 'Low stock alert: Cadbury Dairy Milk Silk (45 units)', time: '15 min ago', type: 'alert' },
        { icon: 'user', text: 'New user Bharat Patel onboarded as Cashier', time: '1 hr ago', type: 'user' },
        { icon: 'milestone', text: 'Daily revenue crossed ₹5,00,000 milestone', time: '2 hrs ago', type: 'milestone' },
        { icon: 'system', text: 'Inventory sync completed for all stores', time: '3 hrs ago', type: 'system' },
        { icon: 'alert', text: 'Critical stock: Dove Shampoo 340ml (30 units)', time: '4 hrs ago', type: 'alert' },
        { icon: 'report', text: 'Weekly analytics report generated', time: '5 hrs ago', type: 'report' },
    ],

    // ── Chart Data ──────────────────────────────────────────────
    revenueByMonth: [
        { month: 'Aug', value: 180 },
        { month: 'Sep', value: 210 },
        { month: 'Oct', value: 245 },
        { month: 'Nov', value: 290 },
        { month: 'Dec', value: 320 },
        { month: 'Jan', value: 275 },
        { month: 'Feb', value: 284 },
    ],

    salesByCategory: [
        { category: 'Grocery', percentage: 35, color: '#1a1a1a' },
        { category: 'Beverages', percentage: 18, color: '#F97316' },
        { category: 'Personal Care', percentage: 15, color: '#6b7280' },
        { category: 'Snacks', percentage: 14, color: '#FB923C' },
        { category: 'Dairy', percentage: 10, color: '#374151' },
        { category: 'Household', percentage: 8, color: '#9ca3af' },
    ],

    paymentMethods: [
        { method: 'UPI', percentage: 42, color: '#1a1a1a' },
        { method: 'Card', percentage: 30, color: '#F97316' },
        { method: 'Cash', percentage: 18, color: '#6b7280' },
        { method: 'Wallet', percentage: 10, color: '#FB923C' },
    ],

    // ── Department breakdowns (HRM) ─────────────────────────────
    departments: [
        { name: 'Operations', count: 4, color: '#1a1a1a' },
        { name: 'Sales', count: 4, color: '#F97316' },
        { name: 'Analytics', count: 2, color: '#6b7280' },
        { name: 'Logistics', count: 2, color: '#FB923C' },
        { name: 'HR', count: 2, color: '#374151' },
        { name: 'Finance', count: 1, color: '#9ca3af' },
    ],
};
