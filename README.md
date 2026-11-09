# PT Big Fortune Mesindo - CRM & MES Mockup

A high-density, compact enterprise CRM & Manufacturing Execution System (MES) mockup built with **Node.js**, **Express**, and **Metro UI**.

---

## 🏭 Design & Aesthetic Philosophy
Designed specifically for **industrial / manufacturing shop-floor and commercial office operations**:
- **High Information Density**: Compact tables, zero unnecessary whitespace or padding, maximized data visibility.
- **Accurate Branding**: PT Big Fortune Mesindo industrial branding with custom amber/orange accent (`#df6600`).
- **Manufacturing Controls**: Multi-plant selector (*BFM Klaten Plant*, *BFM Cikarang Plant*, *BFM Surabaya Plant*), shift selection (*Shift 1/2/3/Normal*), and workstation indicators.
- **Classic Desktop ERP Feel**: Fixed bottom status bar displaying terminal readiness, active server node (`ERP-PROD`), database cluster (`BFM_ERP`), and real-time operator clock.
- **Offline Self-Contained**: Metro UI CSS and JS bundled locally in `public/` for offline reliability on industrial networks.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)

### Start the Server
```bash
npm start
# or
node server.js
```

### URLs
- **Dashboard / Home**: [http://localhost:3000/](http://localhost:3000/)
- **Login Terminal**: [http://localhost:3000/login](http://localhost:3000/login)

---

## 📋 Features Implemented

1. **Dashboard (Exact Replica of Reference)**:
   - Header with plant info, operator status, and sign-out link.
   - Metro navigation tabs (`Home`, `CRM`, `Quotations`, `Documents`, `Production`, `Inventory`, `Reports`, `Setup`).
   - High-density sidebar counters (Sales pipeline: 14, Quotations: 9, Customers: 126, Contracts: 18, Sales orders: 41, Document register: 3,284, Needs attention: 4).
   - **Work Summary Table**: Opportunities, waiting approvals, 90-day win rate (38%), action links.
   - **Recent Quotations Table**: QT-2026-0153, QT-2026-0158, QT-2026-0161, QT-2026-0164 with revision codes, customer names, parts, and values.
   - **Document Alerts Table**: Real-time NAS alerts (`Missing`, `Pending storage`, `Checksum` quarantine) with diagnosis and resolution dialogs.
   - **Fixed Bottom Status Bar**: `Ready | Server: ERP-PROD | Database: BFM_ERP | Logged in: Sari Anggraini | 07 Nov 2026 09:14`.

2. **Improvised Industrial Login Page**:
   - High-density Metro authentication terminal.
   - Facility selector (Klaten, Cikarang, Surabaya).
   - Domain selector (CRM, MES, Quality Assurance, Supply Chain).
   - Workstation & shift selector (Shift 1, 2, 3, Normal).
   - Quick operator mock presets (`Sari Anggraini`, `Budi Santoso`, `Hendra Kusuma`).
   - Seamless transition to dashboard preserving selected identity and facility.

3. **Interactive Modals**:
   - Click any quotation or pipeline item to open manufacturing line-item breakdown & engineering drawing attachments.
   - Click document alert items to trigger resolution workflows (re-upload drawing, force NAS sync, quarantine bypass).

