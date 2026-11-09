/**
 * PT BIG FORTUNE MESINDO - MANUFACTURING CRM & MES MOCKUP
 * Backend Server powered by Express & Node.js
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock Data Source matching image
const mockData = {
  system: {
    company: "PT Big Fortune Mesindo",
    subsystem: "ERP and MES",
    plant: "BFM Semarang Plant",
    server: "ERP-PROD",
    database: "BFM_ERP",
    version: "2.6.4-mfg"
  },
  sidebar: {
    crm: [
      { id: "pipeline", label: "Sales pipeline", count: 14, link: "pipeline" },
      { id: "quotations", label: "Quotations", count: 9, link: "quotations" },
      { id: "customers", label: "Customers", count: 126, link: "customers" },
      { id: "contracts", label: "Contracts", count: 18, link: "contracts" },
      { id: "orders", label: "Sales orders", count: 41, link: "orders" }
    ],
    documents: [
      { id: "register", label: "Document register", count: "3,284", alert: false },
      { id: "needs_attention", label: "Needs attention", count: 4, alert: true }
    ]
  },
  workSummary: [
    { item: "Open pipeline opportunities", count: "14", valueIdr: "2,040,000,000", action: "Open" },
    { item: "Quotations waiting for approval", count: "3", valueIdr: "612,000,000", action: "Open" },
    { item: "Win rate, last 90 days", count: "38%", valueIdr: "-", action: "-" },
    { item: "Documents needing action", count: "4", valueIdr: "-", action: "Open" }
  ],
  recentQuotations: [
    {
      quoteNo: "QT-2026-0153",
      rev: "02",
      customer: "PT Sumber Otomotif Nusantara",
      partNo: "BKT-4411",
      status: "Pending approval",
      date: "06 Nov 2026",
      valueIdr: "412,000,000"
    },
    {
      quoteNo: "QT-2026-0158",
      rev: "01",
      customer: "PT Elektra Presisi Jaya",
      partNo: "HSG-0932",
      status: "Sent",
      date: "04 Nov 2026",
      valueIdr: "186,500,000"
    },
    {
      quoteNo: "QT-2026-0161",
      rev: "03",
      customer: "PT Maju Peralatan Rumah",
      partNo: "CVR-1208",
      status: "Accepted",
      date: "02 Nov 2026",
      valueIdr: "97,250,000"
    },
    {
      quoteNo: "QT-2026-0164",
      rev: "01",
      customer: "PT Nusa Medika Plastik",
      partNo: "CAP-0047",
      status: "Draft",
      date: "31 Oct 2026",
      valueIdr: "54,900,000"
    }
  ],
  documentAlerts: [
    {
      docNo: "DRW-BKT4411",
      fileName: "DRW-BKT4411_C_DRAWING_20260315.pdf",
      status: "Missing",
      detail: "Not found on NAS. Upload again or restore from backup."
    },
    {
      docNo: "PPAP-HSG0932",
      fileName: "PPAP-HSG0932_L3_20261102.pdf",
      status: "Pending storage",
      detail: "Waiting for upload check. Retry in 12 minutes."
    },
    {
      docNo: "CoC-CVR1208",
      fileName: "CoC-CVR1208_R1_20261019.pdf",
      status: "Checksum",
      detail: "Hash changed after upload. File moved to quarantine."
    }
  ]
};

// API Endpoints
app.get('/api/system', (req, res) => {
  res.json(mockData.system);
});

app.get('/api/summary', (req, res) => {
  res.json({
    summary: mockData.workSummary,
    quotations: mockData.recentQuotations,
    alerts: mockData.documentAlerts,
    sidebar: mockData.sidebar
  });
});

app.post('/api/login', (req, res) => {
  const { username, plant } = req.body;
  res.json({
    success: true,
    user: {
      username: username || "Sari Anggraini",
      role: "Sales Admin",
      plant: plant || "BFM Semarang Plant"
    }
  });
});

// Page routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/crm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crm.html'));
});

app.get('/quotations', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quotations.html'));
});

app.get('/quotations/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quotations.html'));
});

app.get('/documents', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documents.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` PT BIG FORTUNE MESINDO - MANUFACTURING CRM & MES`);
  console.log(` Metro UI Dense Industrial Interface Started`);
  console.log(` Dashboard URL:  http://localhost:${PORT}/`);
  console.log(` CRM Pipeline:   http://localhost:${PORT}/crm`);
  console.log(` Quotations:     http://localhost:${PORT}/quotations`);
  console.log(` Documents:      http://localhost:${PORT}/documents`);
  console.log(` Login URL:      http://localhost:${PORT}/login`);
  console.log(`=======================================================`);
});

