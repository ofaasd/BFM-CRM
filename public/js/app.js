/**
 * PT BIG FORTUNE MESINDO - MANUFACTURING ERP & MES
 * High-Density Client Application Logic & Modular Views
 */

(function () {
  // Read current user session from localStorage or defaults
  const defaultSession = {
    username: "Sari Anggraini",
    role: "Sales Admin",
    plant: "BFM Semarang Plant",
    server: "ERP-PROD",
    database: "BFM_ERP"
  };

  function getSession() {
    try {
      const saved = localStorage.getItem("bfm_session");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultSession;
  }

  function setSession(sessionData) {
    localStorage.setItem("bfm_session", JSON.stringify(sessionData));
  }

  // Update DOM with current session info
  function applySessionInfo() {
    const session = getSession();
    const userDisplay = document.getElementById("header-user-display");
    const plantDisplay = document.getElementById("header-plant-display");
    const statusUser = document.getElementById("status-user-display");
    const statusServer = document.getElementById("status-server-display");
    const statusDb = document.getElementById("status-db-display");

    if (userDisplay) {
      userDisplay.innerHTML = `<strong>${session.username}</strong> (${session.role})`;
    }
    if (plantDisplay) {
      plantDisplay.innerHTML = `<strong>${session.plant}</strong>`;
    }
    if (statusUser) {
      statusUser.innerText = session.username;
    }
    if (statusServer) {
      statusServer.innerText = session.server;
    }
    if (statusDb) {
      statusDb.innerText = session.database;
    }
  }

  // Toast / Status notify
  function showStatusToast(title, message, type = "info") {
    if (window.Metro && window.Metro.toast) {
      Metro.toast.create(message, null, 2500, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    }
  }

  // Generic Modal Controller
  window.openErpModal = function (title, contentHtml, footerHtml = "") {
    const backdrop = document.getElementById("erp-modal-backdrop");
    const modalTitle = document.getElementById("erp-modal-title");
    const modalBody = document.getElementById("erp-modal-body");
    const modalFooter = document.getElementById("erp-modal-footer");

    if (!backdrop) return;

    modalTitle.innerHTML = title;
    modalBody.innerHTML = contentHtml;
    modalFooter.innerHTML = footerHtml || `
      <button class="metro-dense-btn" onclick="closeErpModal()">Close (Esc)</button>
    `;

    backdrop.style.display = "flex";
  };

  window.closeErpModal = function () {
    const backdrop = document.getElementById("erp-modal-backdrop");
    if (backdrop) backdrop.style.display = "none";
  };

  // Keyboard shortcut: Escape to close modal, Alt+N for New Quote
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeErpModal();
    }
    if (e.altKey && (e.key === 'n' || e.key === 'N')) {
      e.preventDefault();
      openNewQuoteModal();
    }
  });

  // Modal handlers for Dashboard items
  window.viewPipelineModal = function () {
    const html = `
      <div style="margin-bottom: 8px;">
        <strong>Active Pipeline Opportunities (14 Total - Value: IDR 2,040,000,000)</strong>
      </div>
      <table class="dense-table">
        <thead>
          <tr>
            <th>Opp ID</th>
            <th>Customer</th>
            <th>Stage</th>
            <th>Target Part</th>
            <th class="text-right">Est. Value (IDR)</th>
            <th>Prob.</th>
            <th>Est. Closing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>OPP-2026-089</strong></td>
            <td>PT Sumber Otomotif Nusantara</td>
            <td>Quotation Sent</td>
            <td>BKT-4411 (Bracket Mounting)</td>
            <td class="text-right">412,000,000</td>
            <td>85%</td>
            <td>15 Nov 2026</td>
          </tr>
          <tr>
            <td><strong>OPP-2026-092</strong></td>
            <td>PT Astra Otoparts Div. Komp</td>
            <td>Technical Feasibility</td>
            <td>ARM-1002 (Suspension Arm)</td>
            <td class="text-right">780,000,000</td>
            <td>60%</td>
            <td>30 Nov 2026</td>
          </tr>
          <tr>
            <td><strong>OPP-2026-095</strong></td>
            <td>PT Elektra Presisi Jaya</td>
            <td>Commercial Review</td>
            <td>HSG-0932 (Electronic Housing)</td>
            <td class="text-right">186,500,000</td>
            <td>90%</td>
            <td>12 Nov 2026</td>
          </tr>
          <tr>
            <td><strong>OPP-2026-097</strong></td>
            <td>PT Maju Peralatan Rumah</td>
            <td>Accepted / PO Processing</td>
            <td>CVR-1208 (Front Cover Plate)</td>
            <td class="text-right">97,250,000</td>
            <td>100%</td>
            <td>08 Nov 2026</td>
          </tr>
          <tr>
            <td><strong>OPP-2026-101</strong></td>
            <td>PT Dharma Precision Component</td>
            <td>RFQ In Review</td>
            <td>PLT-7721 (Stamped Plate 3.2mm)</td>
            <td class="text-right">564,250,000</td>
            <td>50%</td>
            <td>28 Nov 2026</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top: 8px; font-size: 11px; color: #555;">
        * Showing top 5 of 14 pipeline records for BFM Semarang Plant.
      </div>
    `;
    openErpModal("Sales Pipeline - Summary & Forecast", html);
  };

  window.viewApprovalModal = function () {
    const html = `
      <div style="margin-bottom: 8px;">
        <strong>Quotations Waiting for Internal Approval (3 Total - Value: IDR 612,000,000)</strong>
      </div>
      <table class="dense-table">
        <thead>
          <tr>
            <th>Quote No</th>
            <th>Rev</th>
            <th>Customer</th>
            <th>Part Description</th>
            <th class="text-right">Value (IDR)</th>
            <th>Waiting On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>QT-2026-0153</strong></td>
            <td>02</td>
            <td>PT Sumber Otomotif Nusantara</td>
            <td>BKT-4411 (Bracket Mounting 450T)</td>
            <td class="text-right">412,000,000</td>
            <td>Costing GM Approval</td>
            <td><a href="javascript:approveQuote('QT-2026-0153')">Approve</a></td>
          </tr>
          <tr>
            <td><strong>QT-2026-0155</strong></td>
            <td>01</td>
            <td>PT Tri Satria Engineering</td>
            <td>PCH-0081 (Precision Punch Die)</td>
            <td class="text-right">145,000,000</td>
            <td>Plant Director Sign-off</td>
            <td><a href="javascript:approveQuote('QT-2026-0155')">Approve</a></td>
          </tr>
          <tr>
            <td><strong>QT-2026-0159</strong></td>
            <td>01</td>
            <td>PT Indokarya Mitra Sejati</td>
            <td>FLG-2210 (Mounting Flange 12mm)</td>
            <td class="text-right">55,000,000</td>
            <td>Sales Manager Review</td>
            <td><a href="javascript:approveQuote('QT-2026-0159')">Approve</a></td>
          </tr>
        </tbody>
      </table>
    `;
    openErpModal("Quotations Pending Approval", html);
  };

  window.approveQuote = function (quoteNo) {
    alert(`Quotation ${quoteNo} approved successfully by Sales Admin authorization.`);
    closeErpModal();
  };

  window.viewQuoteDetail = function (quoteNo, rev, customer, partNo, status, date, val) {
    const html = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; background: #f8fafc; padding: 8px; border: 1px solid #e2e8f0;">
        <div><strong>Quote Number:</strong> ${quoteNo} (Rev ${rev})</div>
        <div><strong>Status:</strong> <span style="font-weight:600; color:#df6600;">${status}</span></div>
        <div><strong>Customer:</strong> ${customer}</div>
        <div><strong>Submission Date:</strong> ${date}</div>
        <div><strong>Part Number:</strong> ${partNo}</div>
        <div><strong>Total Value:</strong> IDR ${val}</div>
      </div>

      <div style="font-weight:700; margin-bottom: 4px;">Line Items Specification:</div>
      <table class="dense-table">
        <thead>
          <tr>
            <th>Line</th>
            <th>Item / Process Spec</th>
            <th>Material Spec</th>
            <th class="text-right">Qty (Pcs)</th>
            <th class="text-right">Unit Price (IDR)</th>
            <th class="text-right">Subtotal (IDR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Press Stamping & Piercing (${partNo})</td>
            <td>SPCC 2.3mm JIS G3141</td>
            <td class="text-right">25,000</td>
            <td class="text-right">14,200</td>
            <td class="text-right">355,000,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Surface Treatment: ED-Coating Black</td>
            <td>Epoxy Primer 20-25µm</td>
            <td class="text-right">25,000</td>
            <td class="text-right">2,280</td>
            <td class="text-right">57,000,000</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 10px; font-weight:700;">Manufacturing Document Bindings:</div>
      <table class="dense-table" style="margin-top: 4px;">
        <thead>
          <tr>
            <th>Document Type</th>
            <th>File Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2D Part Drawing</td>
            <td>DRW-${partNo.replace('-', '')}_C_DRAWING_20260315.pdf</td>
            <td class="status-missing">Missing on NAS</td>
          </tr>
          <tr>
            <td>Production Routing Card</td>
            <td>ROUT-${partNo.replace('-', '')}_V2.pdf</td>
            <td>Verified</td>
          </tr>
        </tbody>
      </table>
    `;

    const footer = `
      <button class="metro-dense-btn" onclick="alert('Exported Quotation ${quoteNo} as PDF.');">Print / PDF</button>
      <button class="metro-dense-btn btn-primary" onclick="alert('Quotation duplicate created: QT-2026-0165 (Draft)'); closeErpModal();">Duplicate Quotation</button>
      <button class="metro-dense-btn" onclick="closeErpModal()">Close</button>
    `;

    openErpModal(`Quotation Details - ${quoteNo}`, html, footer);
  };

  window.openNewQuoteModal = function () {
    const html = `
      <form id="new-quote-form" onsubmit="handleCreateQuote(event)">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div class="mfg-form-group">
            <label class="mfg-form-label">Quotation ID (Auto)</label>
            <input type="text" class="mfg-input" value="QT-2026-0165" readonly style="background:#f1f5f9;">
          </div>
          <div class="mfg-form-group">
            <label class="mfg-form-label">Target Revision</label>
            <input type="text" class="mfg-input" value="01" readonly style="background:#f1f5f9;">
          </div>
        </div>

        <div class="mfg-form-group">
          <label class="mfg-form-label">Customer Name</label>
          <select class="mfg-select" id="new-q-customer" required>
            <option value="PT Sumber Otomotif Nusantara">PT Sumber Otomotif Nusantara</option>
            <option value="PT Astra Honda Motor Part Sub">PT Astra Honda Motor Part Sub</option>
            <option value="PT Elektra Presisi Jaya">PT Elektra Presisi Jaya</option>
            <option value="PT Maju Peralatan Rumah">PT Maju Peralatan Rumah</option>
            <option value="PT Nusa Medika Plastik">PT Nusa Medika Plastik</option>
          </select>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div class="mfg-form-group">
            <label class="mfg-form-label">Part Number</label>
            <input type="text" class="mfg-input" id="new-q-part" placeholder="e.g. BRK-9901" required>
          </div>
          <div class="mfg-form-group">
            <label class="mfg-form-label">Press Machine Tonnage</label>
            <select class="mfg-select" id="new-q-press">
              <option value="600T">600 Ton Transfer Press (Line 1)</option>
              <option value="450T" selected>450 Ton Progressive Press (Line 2)</option>
              <option value="250T">250 Ton Crank Press (Line 3)</option>
              <option value="110T">110 Ton Tandem (Line 4)</option>
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
          <div class="mfg-form-group">
            <label class="mfg-form-label">Raw Material Spec</label>
            <select class="mfg-select" id="new-q-mat">
              <option value="SPCC 2.0mm">SPCC 2.0mm JIS G3141</option>
              <option value="SPCC 2.3mm" selected>SPCC 2.3mm JIS G3141</option>
              <option value="SPHC 3.2mm">SPHC 3.2mm JIS G3131</option>
              <option value="SUS304 1.5mm">SUS304 Stainless</option>
            </select>
          </div>
          <div class="mfg-form-group">
            <label class="mfg-form-label">Batch Qty (Pcs)</label>
            <input type="number" class="mfg-input" id="new-q-qty" value="10000" required oninput="calcQuoteEstimate()">
          </div>
          <div class="mfg-form-group">
            <label class="mfg-form-label">Unit Price (IDR)</label>
            <input type="number" class="mfg-input" id="new-q-price" value="16500" required oninput="calcQuoteEstimate()">
          </div>
        </div>

        <div style="padding: 8px; background: #f8fafc; border: 1px solid #cbd5e1; margin-top: 6px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight: 600;">Calculated Total Value:</span>
          <span id="new-q-total-display" style="font-size: 13px; font-weight: 700; color: #df6600;">IDR 165,000,000</span>
        </div>

        <div style="margin-top: 12px; display:flex; justify-content:flex-end; gap: 6px;">
          <button type="button" class="metro-dense-btn" onclick="closeErpModal()">Cancel</button>
          <button type="submit" class="metro-dense-btn btn-primary">Save as Draft Quote</button>
        </div>
      </form>
    `;
    openErpModal("Create Stamping & Tooling Quotation", html);
  };

  window.calcQuoteEstimate = function () {
    const qty = parseFloat(document.getElementById("new-q-qty").value) || 0;
    const price = parseFloat(document.getElementById("new-q-price").value) || 0;
    const total = qty * price;
    const disp = document.getElementById("new-q-total-display");
    if (disp) {
      disp.innerText = `IDR ${total.toLocaleString('id-ID')}`;
    }
  };

  window.handleCreateQuote = function (e) {
    e.preventDefault();
    const part = document.getElementById("new-q-part").value;
    alert(`Quotation QT-2026-0165 for part ${part} created successfully! Added to BFM Quotation Register.`);
    closeErpModal();
    switchTab("Quotations");
  };

  window.viewDocumentAlertModal = function (docNo, fileName, status, detail) {
    let resolutionAction = "";
    if (status.includes("Missing")) {
      resolutionAction = `
        <div style="margin-top: 10px; padding: 8px; background: #fff5f5; border: 1px solid #fecaca;">
          <div style="font-weight: 700; color: #991b1b; margin-bottom: 4px;">Recommended Resolution:</div>
          <div>The file <code>${fileName}</code> is not found at target directory <code>\\\\BFM-NAS01\\Engineering\\Drawings\\</code>.</div>
          <div style="margin-top: 8px;">
            <input type="file" style="font-size: 11px;">
            <button class="metro-dense-btn btn-primary" onclick="alert('Drawing file successfully uploaded and indexed.'); closeErpModal();">Re-upload File</button>
          </div>
        </div>
      `;
    } else if (status.includes("Pending")) {
      resolutionAction = `
        <div style="margin-top: 10px; padding: 8px; background: #fffbeb; border: 1px solid #fef3c7;">
          <div style="font-weight: 700; color: #92400e; margin-bottom: 4px;">Storage Verification Queue:</div>
          <div>Pending virus scan and archival hashing on backup volume. Scheduled retry countdown: <strong>11m 42s</strong>.</div>
          <div style="margin-top: 8px;">
            <button class="metro-dense-btn btn-primary" onclick="alert('Forced immediate NAS verification initiated.'); closeErpModal();">Force Immediate Sync</button>
          </div>
        </div>
      `;
    } else {
      resolutionAction = `
        <div style="margin-top: 10px; padding: 8px; background: #fff5f5; border: 1px solid #fecaca;">
          <div style="font-weight: 700; color: #991b1b; margin-bottom: 4px;">Integrity Violation Detected:</div>
          <div>SHA-256 hash does not match engineering master register. File has been locked in quarantine pool <code>/quarantine/202611/</code>.</div>
          <div style="margin-top: 8px;">
            <button class="metro-dense-btn" onclick="alert('Audit logs exported.');">View Audit Log</button>
            <button class="metro-dense-btn btn-primary" onclick="alert('Quarantine cleared with manager bypass token.'); closeErpModal();">Approve Hash Override</button>
          </div>
        </div>
      `;
    }

    const html = `
      <div style="display: grid; grid-template-columns: 120px 1fr; gap: 6px; font-size: 11.5px;">
        <strong>Document No:</strong> <span>${docNo}</span>
        <strong>File Name:</strong> <span><code>${fileName}</code></span>
        <strong>Alert Status:</strong> <span style="font-weight:700;">${status}</span>
        <strong>Diagnosis:</strong> <span>${detail}</span>
      </div>
      ${resolutionAction}
    `;

    openErpModal(`Document Alert Management - ${docNo}`, html);
  };

  // Sign out handler
  window.handleSignOut = function (e) {
    if (e) e.preventDefault();
    if (confirm("Are you sure you want to log out from BFM Semarang Plant ERP?")) {
      localStorage.removeItem("bfm_session");
      window.location.href = "/login";
    }
  };

  // Render sub-views dynamically inside .erp-content
  window.switchTab = function (tabName, el) {
    const tabs = document.querySelectorAll(".erp-nav-tab");
    tabs.forEach(t => t.classList.remove("active"));
    
    // Find matching tab element if not passed directly
    if (!el) {
      tabs.forEach(t => {
        if (t.innerText.trim().toLowerCase() === tabName.toLowerCase()) el = t;
      });
    }
    if (el) el.classList.add("active");

    const contentArea = document.querySelector(".erp-content");
    if (!contentArea) return;

    if (tabName === "Home") {
      renderHomeView(contentArea);
    } else if (tabName === "CRM") {
      renderCrmView(contentArea);
    } else if (tabName === "Quotations") {
      renderQuotationsView(contentArea);
    } else if (tabName === "Documents") {
      renderDocumentsView(contentArea);
    } else if (tabName === "Production") {
      renderProductionView(contentArea);
    } else if (tabName === "Inventory") {
      renderInventoryView(contentArea);
    } else if (tabName === "Reports") {
      renderReportsView(contentArea);
    } else if (tabName === "Setup") {
      renderSetupView(contentArea);
    }
  };

  // View 1: Home View (Exact Screenshot Replica)
  function renderHomeView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label" id="main-breadcrumb">Home</div>
      <h1 class="page-title">Work summary, Saturday 7 November 2026</h1>

      <!-- Table 1: Work Summary -->
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th style="width: 48%;">Item</th>
              <th class="text-right" style="width: 14%;">Count</th>
              <th class="text-right" style="width: 26%;">Value (IDR)</th>
              <th style="width: 12%;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open pipeline opportunities</td>
              <td class="text-right">14</td>
              <td class="text-right">2,040,000,000</td>
              <td><a href="javascript:viewPipelineModal()">Open</a></td>
            </tr>
            <tr>
              <td>Quotations waiting for approval</td>
              <td class="text-right">3</td>
              <td class="text-right">612,000,000</td>
              <td><a href="javascript:viewApprovalModal()">Open</a></td>
            </tr>
            <tr>
              <td>Win rate, last 90 days</td>
              <td class="text-right">38%</td>
              <td class="text-right">-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Documents needing action</td>
              <td class="text-right">4</td>
              <td class="text-right">-</td>
              <td><a href="#document-alerts">Open</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 2: Recent quotations -->
      <div class="section-title">Recent quotations</div>
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th style="width: 15%;">Quote no</th>
              <th style="width: 6%;">Rev</th>
              <th style="width: 32%;">Customer</th>
              <th style="width: 14%;">Part no</th>
              <th style="width: 14%;">Status</th>
              <th style="width: 11%;">Date</th>
              <th class="text-right" style="width: 18%;">Value (IDR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0153','02','PT Sumber Otomotif Nusantara','BKT-4411','Pending approval','06 Nov 2026','412,000,000')">QT-2026-0153</a></td>
              <td>02</td>
              <td>PT Sumber Otomotif Nusantara</td>
              <td>BKT-4411</td>
              <td><span class="status-pending-approval">Pending approval</span></td>
              <td>06 Nov 2026</td>
              <td class="text-right">412,000,000</td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0158','01','PT Elektra Presisi Jaya','HSG-0932','Sent','04 Nov 2026','186,500,000')">QT-2026-0158</a></td>
              <td>01</td>
              <td>PT Elektra Presisi Jaya</td>
              <td>HSG-0932</td>
              <td><span class="status-sent">Sent</span></td>
              <td>04 Nov 2026</td>
              <td class="text-right">186,500,000</td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0161','03','PT Maju Peralatan Rumah','CVR-1208','Accepted','02 Nov 2026','97,250,000')">QT-2026-0161</a></td>
              <td>03</td>
              <td>PT Maju Peralatan Rumah</td>
              <td>CVR-1208</td>
              <td><span class="status-accepted">Accepted</span></td>
              <td>02 Nov 2026</td>
              <td class="text-right">97,250,000</td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0164','01','PT Nusa Medika Plastik','CAP-0047','Draft','31 Oct 2026','54,900,000')">QT-2026-0164</a></td>
              <td>01</td>
              <td>PT Nusa Medika Plastik</td>
              <td>CAP-0047</td>
              <td><span class="status-draft">Draft</span></td>
              <td>31 Oct 2026</td>
              <td class="text-right">54,900,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table 3: Document alerts -->
      <div class="section-title" id="document-alerts">Document alerts</div>
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th style="width: 16%;">Document no</th>
              <th style="width: 32%;">File name</th>
              <th style="width: 14%;">Status</th>
              <th style="width: 38%;">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('DRW-BKT4411','DRW-BKT4411_C_DRAWING_20260315.pdf','Missing','Not found on NAS. Upload again or restore from backup.')">DRW-BKT4411</a></td>
              <td>DRW-BKT4411_C_DRAWING_20260315.pdf</td>
              <td><span class="status-missing">Missing</span></td>
              <td>Not found on NAS. Upload again or restore from backup.</td>
            </tr>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('PPAP-HSG0932','PPAP-HSG0932_L3_20261102.pdf','Pending storage','Waiting for upload check. Retry in 12 minutes.')">PPAP-HSG0932</a></td>
              <td>PPAP-HSG0932_L3_20261102.pdf</td>
              <td><span class="status-pending-storage">Pending storage</span></td>
              <td>Waiting for upload check. Retry in 12 minutes.</td>
            </tr>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('CoC-CVR1208','CoC-CVR1208_R1_20261019.pdf','Checksum','Hash changed after upload. File moved to quarantine.')">CoC-CVR1208</a></td>
              <td>CoC-CVR1208_R1_20261019.pdf</td>
              <td><span class="status-checksum">Checksum</span></td>
              <td>Hash changed after upload. File moved to quarantine.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footnote">
        Last reconciliation: today 06:00. 3 alerts, 0 orphan files.
      </div>
    `;
  }

  // View 2: CRM View
  function renderCrmView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">CRM / Commercial Operations</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <h1 class="page-title" style="margin:0;">Sales Pipeline & Opportunities Register</h1>
        <div style="display:flex; gap:6px;">
          <button class="metro-dense-btn btn-primary" onclick="alert('Exporting pipeline as Excel...')">Export Pipeline (.xlsx)</button>
          <button class="metro-dense-btn" onclick="openNewQuoteModal()">+ New Quotation</button>
        </div>
      </div>

      <!-- Funnel Bar -->
      <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-bottom: 10px;">
        <div style="background:#f1f5f9; border:1px solid #cbd5e1; padding:4px 6px; font-size:11px;">
          <div style="color:#64748b;">1. RFQ Evaluation</div>
          <div style="font-weight:700; font-size:13px; color:#1e293b;">5 Deals <span style="font-size:10.5px; font-weight:normal;">(IDR 840M)</span></div>
        </div>
        <div style="background:#f1f5f9; border:1px solid #cbd5e1; padding:4px 6px; font-size:11px;">
          <div style="color:#64748b;">2. Costing & Tooling</div>
          <div style="font-weight:700; font-size:13px; color:#1e293b;">4 Deals <span style="font-size:10.5px; font-weight:normal;">(IDR 588M)</span></div>
        </div>
        <div style="background:#fef3c7; border:1px solid #fde68a; padding:4px 6px; font-size:11px;">
          <div style="color:#92400e;">3. Quotation Sent</div>
          <div style="font-weight:700; font-size:13px; color:#b45309;">14 Deals <span style="font-size:10.5px; font-weight:normal;">(IDR 2.04B)</span></div>
        </div>
        <div style="background:#f1f5f9; border:1px solid #cbd5e1; padding:4px 6px; font-size:11px;">
          <div style="color:#64748b;">4. Negotiation</div>
          <div style="font-weight:700; font-size:13px; color:#1e293b;">3 Deals <span style="font-size:10.5px; font-weight:normal;">(IDR 390M)</span></div>
        </div>
        <div style="background:#dcfce7; border:1px solid #bbf7d0; padding:4px 6px; font-size:11px;">
          <div style="color:#166534;">5. Won / Mass Prod</div>
          <div style="font-weight:700; font-size:13px; color:#15803d;">41 Orders <span style="font-size:10.5px; font-weight:normal;">(IDR 14.8B)</span></div>
        </div>
      </div>

      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th>Opp ID</th>
              <th>Customer</th>
              <th>Target Part No</th>
              <th>Process Line</th>
              <th>Volume / Yr</th>
              <th class="text-right">Est. Value (IDR)</th>
              <th>Stage</th>
              <th>Prob.</th>
              <th>Sales Rep</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>OPP-2026-089</strong></td>
              <td>PT Sumber Otomotif Nusantara</td>
              <td>BKT-4411 (Bracket Mounting)</td>
              <td>450T Progressive</td>
              <td>300,000 pcs</td>
              <td class="text-right">412,000,000</td>
              <td>Quotation Sent</td>
              <td>85%</td>
              <td>Sari A.</td>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0153','02','PT Sumber Otomotif Nusantara','BKT-4411','Pending approval','06 Nov 2026','412,000,000')">View</a></td>
            </tr>
            <tr>
              <td><strong>OPP-2026-092</strong></td>
              <td>PT Astra Otoparts Div. Komp</td>
              <td>ARM-1002 (Suspension Arm)</td>
              <td>600T Transfer</td>
              <td>120,000 pcs</td>
              <td class="text-right">780,000,000</td>
              <td>Tech Feasibility</td>
              <td>60%</td>
              <td>Bambang W.</td>
              <td><a href="javascript:void(0)" onclick="alert('Opportunity OPP-2026-092 tooling CAD model pending customer review.')">View</a></td>
            </tr>
            <tr>
              <td><strong>OPP-2026-095</strong></td>
              <td>PT Elektra Presisi Jaya</td>
              <td>HSG-0932 (Electronic Housing)</td>
              <td>250T Crank</td>
              <td>180,000 pcs</td>
              <td class="text-right">186,500,000</td>
              <td>Commercial Review</td>
              <td>90%</td>
              <td>Sari A.</td>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0158','01','PT Elektra Presisi Jaya','HSG-0932','Sent','04 Nov 2026','186,500,000')">View</a></td>
            </tr>
            <tr>
              <td><strong>OPP-2026-097</strong></td>
              <td>PT Maju Peralatan Rumah</td>
              <td>CVR-1208 (Front Cover Plate)</td>
              <td>110T Tandem</td>
              <td>50,000 pcs</td>
              <td class="text-right">97,250,000</td>
              <td>Accepted / PO Processing</td>
              <td>100%</td>
              <td>Sari A.</td>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0161','03','PT Maju Peralatan Rumah','CVR-1208','Accepted','02 Nov 2026','97,250,000')">View</a></td>
            </tr>
            <tr>
              <td><strong>OPP-2026-101</strong></td>
              <td>PT Dharma Precision Component</td>
              <td>PLT-7721 (Stamped Plate 3.2mm)</td>
              <td>450T Progressive</td>
              <td>240,000 pcs</td>
              <td class="text-right">564,250,000</td>
              <td>RFQ In Review</td>
              <td>50%</td>
              <td>Dwi H.</td>
              <td><a href="javascript:void(0)" onclick="alert('Reviewing SPCC coil raw material pricing.')">View</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // View 3: Quotations View
  function renderQuotationsView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">CRM / Quotations Management</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <h1 class="page-title" style="margin:0;">Master Quotations Register (9 Total)</h1>
        <div style="display:flex; gap:6px;">
          <button class="metro-dense-btn btn-primary" onclick="openNewQuoteModal()">+ Create Quotation (Alt+N)</button>
          <button class="metro-dense-btn" onclick="viewApprovalModal()">Pending Approvals (3)</button>
        </div>
      </div>

      <!-- Filter Controls -->
      <div style="background:#f8fafc; border:1px solid #cbd5e1; padding:4px 8px; margin-bottom:8px; display:flex; gap:12px; align-items:center; font-size:11px;">
        <div>Filter Status: 
          <select class="mfg-select" style="width:auto; display:inline-block; padding:1px 4px; font-size:11px;">
            <option>All Statuses</option>
            <option>Pending approval</option>
            <option>Sent</option>
            <option>Accepted</option>
            <option>Draft</option>
          </select>
        </div>
        <div>Customer: <input type="text" class="mfg-input" placeholder="Search customer..." style="width:160px; display:inline-block; padding:1px 4px; font-size:11px;"></div>
        <div>Part No: <input type="text" class="mfg-input" placeholder="e.g. BKT, HSG..." style="width:120px; display:inline-block; padding:1px 4px; font-size:11px;"></div>
        <button class="metro-dense-btn" style="padding:1px 8px;">Apply Filter</button>
      </div>

      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th>Quote no</th>
              <th>Rev</th>
              <th>Customer</th>
              <th>Part no & Spec</th>
              <th>Machine Line</th>
              <th>Status</th>
              <th>Date</th>
              <th class="text-right">Value (IDR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0153','02','PT Sumber Otomotif Nusantara','BKT-4411','Pending approval','06 Nov 2026','412,000,000')">QT-2026-0153</a></td>
              <td>02</td>
              <td>PT Sumber Otomotif Nusantara</td>
              <td>BKT-4411 (Bracket Mounting 2.3mm)</td>
              <td>450T Progressive</td>
              <td><span class="status-pending-approval">Pending approval</span></td>
              <td>06 Nov 2026</td>
              <td class="text-right">412,000,000</td>
              <td><a href="javascript:approveQuote('QT-2026-0153')">Approve</a> | <a href="javascript:void(0)" onclick="alert('PDF Generated for QT-2026-0153')">Print</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0155','01','PT Tri Satria Engineering','PCH-0081','Pending approval','05 Nov 2026','145,000,000')">QT-2026-0155</a></td>
              <td>01</td>
              <td>PT Tri Satria Engineering</td>
              <td>PCH-0081 (Precision Punch Die)</td>
              <td>Tooling Room</td>
              <td><span class="status-pending-approval">Pending approval</span></td>
              <td>05 Nov 2026</td>
              <td class="text-right">145,000,000</td>
              <td><a href="javascript:approveQuote('QT-2026-0155')">Approve</a> | <a href="javascript:void(0)" onclick="alert('PDF Generated for QT-2026-0155')">Print</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0158','01','PT Elektra Presisi Jaya','HSG-0932','Sent','04 Nov 2026','186,500,000')">QT-2026-0158</a></td>
              <td>01</td>
              <td>PT Elektra Presisi Jaya</td>
              <td>HSG-0932 (Electronic Housing)</td>
              <td>250T Crank</td>
              <td><span class="status-sent">Sent</span></td>
              <td>04 Nov 2026</td>
              <td class="text-right">186,500,000</td>
              <td><a href="javascript:void(0)" onclick="alert('Follow up email sent to procurement.')">Follow-up</a> | <a href="javascript:void(0)" onclick="alert('PDF Generated')">Print</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0159','01','PT Indokarya Mitra Sejati','FLG-2210','Pending approval','03 Nov 2026','55,000,000')">QT-2026-0159</a></td>
              <td>01</td>
              <td>PT Indokarya Mitra Sejati</td>
              <td>FLG-2210 (Mounting Flange 12mm)</td>
              <td>600T Transfer</td>
              <td><span class="status-pending-approval">Pending approval</span></td>
              <td>03 Nov 2026</td>
              <td class="text-right">55,000,000</td>
              <td><a href="javascript:approveQuote('QT-2026-0159')">Approve</a> | <a href="javascript:void(0)" onclick="alert('PDF Generated')">Print</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0161','03','PT Maju Peralatan Rumah','CVR-1208','Accepted','02 Nov 2026','97,250,000')">QT-2026-0161</a></td>
              <td>03</td>
              <td>PT Maju Peralatan Rumah</td>
              <td>CVR-1208 (Front Cover Plate)</td>
              <td>110T Tandem</td>
              <td><span class="status-accepted">Accepted</span></td>
              <td>02 Nov 2026</td>
              <td class="text-right">97,250,000</td>
              <td><a href="javascript:void(0)" onclick="alert('Sales Order SO-2026-041 created!')">Create SO</a> | <a href="javascript:void(0)" onclick="alert('PDF Generated')">Print</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewQuoteDetail('QT-2026-0164','01','PT Nusa Medika Plastik','CAP-0047','Draft','31 Oct 2026','54,900,000')">QT-2026-0164</a></td>
              <td>01</td>
              <td>PT Nusa Medika Plastik</td>
              <td>CAP-0047 (Medical Seal Cap)</td>
              <td>110T Tandem</td>
              <td><span class="status-draft">Draft</span></td>
              <td>31 Oct 2026</td>
              <td class="text-right">54,900,000</td>
              <td><a href="javascript:void(0)" onclick="alert('Quotation submitted for review!')">Submit</a> | <a href="javascript:void(0)" onclick="alert('Opening editor...')">Edit</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // View 4: Documents View
  function renderDocumentsView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">Documents / Technical Master Archive</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <h1 class="page-title" style="margin:0;">Engineering Drawing & PPAP Register (3,284 Files)</h1>
        <div style="display:flex; gap:6px;">
          <button class="metro-dense-btn btn-primary" onclick="alert('Triggered full NAS rescan on \\\\\\\\BFM-NAS01\\\\Engineering')">Trigger NAS Rescan</button>
        </div>
      </div>

      <div style="font-size:11px; background:#f1f5f9; padding:4px 8px; border:1px solid #cbd5e1; margin-bottom:8px;">
        <strong>Storage Server Path:</strong> <code>\\\\BFM-NAS01\\Engineering\\Drawings\\2026\\</code> (Reconciled today at 06:00 WIB)
      </div>

      <div class="section-title" style="color:#b91c1c;">Active Action Alerts (3)</div>
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th>Document no</th>
              <th>File name</th>
              <th>Status</th>
              <th>Detail</th>
              <th>Resolution Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('DRW-BKT4411','DRW-BKT4411_C_DRAWING_20260315.pdf','Missing','Not found on NAS. Upload again or restore from backup.')">DRW-BKT4411</a></td>
              <td>DRW-BKT4411_C_DRAWING_20260315.pdf</td>
              <td><span class="status-missing">Missing</span></td>
              <td>Not found on NAS. Upload again or restore from backup.</td>
              <td><a href="javascript:viewDocumentAlertModal('DRW-BKT4411','DRW-BKT4411_C_DRAWING_20260315.pdf','Missing','Not found on NAS.')">Upload Drawing</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('PPAP-HSG0932','PPAP-HSG0932_L3_20261102.pdf','Pending storage','Waiting for upload check. Retry in 12 minutes.')">PPAP-HSG0932</a></td>
              <td>PPAP-HSG0932_L3_20261102.pdf</td>
              <td><span class="status-pending-storage">Pending storage</span></td>
              <td>Waiting for upload check. Retry in 12 minutes.</td>
              <td><a href="javascript:viewDocumentAlertModal('PPAP-HSG0932','PPAP-HSG0932_L3_20261102.pdf','Pending storage','Waiting check')">Force Verify</a></td>
            </tr>
            <tr>
              <td><a href="javascript:viewDocumentAlertModal('CoC-CVR1208','CoC-CVR1208_R1_20261019.pdf','Checksum','Hash changed after upload. File moved to quarantine.')">CoC-CVR1208</a></td>
              <td>CoC-CVR1208_R1_20261019.pdf</td>
              <td><span class="status-checksum">Checksum</span></td>
              <td>Hash changed after upload. File moved to quarantine.</td>
              <td><a href="javascript:viewDocumentAlertModal('CoC-CVR1208','CoC-CVR1208_R1_20261019.pdf','Checksum','Quarantine')">Review Quarantine</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // View 5: Production View
  function renderProductionView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">MES / Shop Floor Execution</div>
      <h1 class="page-title">Stamping Lines Live Monitoring - BFM Semarang Plant</h1>
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th>Line Name</th>
              <th>Capacity</th>
              <th>Active Part No</th>
              <th>Customer</th>
              <th>Current Shift Operator</th>
              <th>Target / Shift</th>
              <th>Actual Output</th>
              <th>OEE %</th>
              <th>Line Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Stamping Line 1</strong></td>
              <td>600 Ton Komatsu Transfer</td>
              <td>ARM-1002</td>
              <td>PT Astra Otoparts</td>
              <td>Agus Riyadi (Shift 1)</td>
              <td>4,000 pcs</td>
              <td>3,820 pcs</td>
              <td><strong>92.4%</strong></td>
              <td><span style="color:#15803d; font-weight:700;">● RUNNING</span></td>
            </tr>
            <tr>
              <td><strong>Stamping Line 2</strong></td>
              <td>450 Ton AIDA Progressive</td>
              <td>BKT-4411</td>
              <td>PT Sumber Otomotif</td>
              <td>Joko Priyono (Shift 1)</td>
              <td>5,500 pcs</td>
              <td>4,910 pcs</td>
              <td><strong>88.1%</strong></td>
              <td><span style="color:#15803d; font-weight:700;">● RUNNING</span></td>
            </tr>
            <tr>
              <td><strong>Stamping Line 3</strong></td>
              <td>250 Ton Chin Fong Crank</td>
              <td>HSG-0932</td>
              <td>PT Elektra Presisi</td>
              <td>Teguh Prasetyo (Shift 1)</td>
              <td>3,200 pcs</td>
              <td>1,200 pcs</td>
              <td><strong>72.5%</strong></td>
              <td><span style="color:#b45309; font-weight:700;">▲ DIE CHANGEOVER</span></td>
            </tr>
            <tr>
              <td><strong>Stamping Line 4</strong></td>
              <td>110 Ton Seyi Tandem (4-Stn)</td>
              <td>CVR-1208</td>
              <td>PT Maju Peralatan Rumah</td>
              <td>Wahyu Setiawan (Shift 1)</td>
              <td>2,500 pcs</td>
              <td>2,480 pcs</td>
              <td><strong>94.0%</strong></td>
              <td><span style="color:#15803d; font-weight:700;">● RUNNING</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // View 6: Inventory View
  function renderInventoryView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">Inventory / Warehouse & Raw Material Stock</div>
      <h1 class="page-title">Steel Coil & WIP Stamping Inventory</h1>
      <div class="dense-table-wrapper">
        <table class="dense-table">
          <thead>
            <tr>
              <th>Material Grade</th>
              <th>Coil Spec</th>
              <th>Supplier</th>
              <th class="text-right">Stock Weight (Kg)</th>
              <th class="text-right">Min Buffer (Kg)</th>
              <th>Assigned Quotation / Part</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SPCC-SD JIS G3141</strong></td>
              <td>2.3mm x 1219mm x Coil</td>
              <td>PT Krakatau POSCO</td>
              <td class="text-right">48,250</td>
              <td class="text-right">20,000</td>
              <td>BKT-4411 (Bracket Mounting)</td>
              <td><span style="color:#15803d; font-weight:700;">Adequate</span></td>
            </tr>
            <tr>
              <td><strong>SPHC JIS G3131</strong></td>
              <td>3.2mm x 1000mm x Coil</td>
              <td>PT Gunung Raja Paksi</td>
              <td class="text-right">18,400</td>
              <td class="text-right">15,000</td>
              <td>PLT-7721 (Stamped Plate)</td>
              <td><span style="color:#15803d; font-weight:700;">Adequate</span></td>
            </tr>
            <tr>
              <td><strong>SECC Electro-Galv</strong></td>
              <td>1.2mm x 914mm x Coil</td>
              <td>PT Steel Pipe Industry</td>
              <td class="text-right">8,100</td>
              <td class="text-right">10,000</td>
              <td>HSG-0932 (Electronic Housing)</td>
              <td><span style="color:#b45309; font-weight:700;">Re-order Point</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // View 7: Reports View
  function renderReportsView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">Reports / Commercial & MES Analytics</div>
      <h1 class="page-title">Commercial Realization & Performance Metrics</h1>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div style="border:1px solid #cbd5e1; padding:8px; background:#fff;">
          <div style="font-weight:700; margin-bottom:4px;">Quarterly Win Rate (Q4 2026)</div>
          <table class="dense-table">
            <thead>
              <tr><th>Month</th><th class="text-right">Submitted</th><th class="text-right">Won</th><th class="text-right">Rate %</th></tr>
            </thead>
            <tbody>
              <tr><td>September 2026</td><td class="text-right">18</td><td class="text-right">7</td><td class="text-right">38.8%</td></tr>
              <tr><td>October 2026</td><td class="text-right">22</td><td class="text-right">8</td><td class="text-right">36.3%</td></tr>
              <tr><td>November 2026 (MTD)</td><td class="text-right">9</td><td class="text-right">4</td><td class="text-right">44.4%</td></tr>
            </tbody>
          </table>
        </div>
        <div style="border:1px solid #cbd5e1; padding:8px; background:#fff;">
          <div style="font-weight:700; margin-bottom:4px;">Top Customer Revenue Contributions</div>
          <table class="dense-table">
            <thead>
              <tr><th>Customer</th><th class="text-right">Volume (IDR)</th><th class="text-right">Share %</th></tr>
            </thead>
            <tbody>
              <tr><td>PT Sumber Otomotif Nusantara</td><td class="text-right">4,210,000,000</td><td class="text-right">32.4%</td></tr>
              <tr><td>PT Astra Otoparts Div. Komp</td><td class="text-right">3,850,000,000</td><td class="text-right">29.6%</td></tr>
              <tr><td>PT Elektra Presisi Jaya</td><td class="text-right">1,940,000,000</td><td class="text-right">14.9%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // View 8: Setup View
  function renderSetupView(container) {
    container.innerHTML = `
      <div class="breadcrumb-label">Setup / System Configuration</div>
      <h1 class="page-title">Enterprise System Parameters & Machine Line Config</h1>
      <table class="dense-table">
        <thead>
          <tr><th>Parameter</th><th>Current Node Value</th><th>Environment / Scope</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Cluster Node</td><td>ERP-PROD-01 (Semarang DC)</td><td>Core Production</td><td>Online (Latency 2ms)</td></tr>
          <tr><td>Database Replica</td><td>BFM_ERP_SEMARANG_MASTER</td><td>PostgreSQL / Oracle ERP</td><td>Synchronized</td></tr>
          <tr><td>NAS Archival Target</td><td>\\\\BFM-NAS01\\Engineering\\Drawings\\</td><td>Internal File Cluster</td><td>3 Document Alerts Pending</td></tr>
          <tr><td>Default Stamping Currency</td><td>IDR (Indonesian Rupiah)</td><td>Commercial Quotations</td><td>Active</td></tr>
        </tbody>
      </table>
    `;
  }

  // Init on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    applySessionInfo();

    // Auto-update live time in status bar if element exists
    const timeEl = document.getElementById("status-live-time");
    if (timeEl) {
      function updateTime() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        timeEl.innerText = `07 Nov 2026 ${hrs}:${mins}`;
      }
      updateTime();
      setInterval(updateTime, 30000);
    }
  });

})();
