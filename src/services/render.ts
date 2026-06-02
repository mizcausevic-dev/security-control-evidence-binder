import { controlLibrary, evidenceRoom, payload, readinessPosture, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Security Control Evidence Binder";
const domain = "https://controls.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid { display: grid; gap: 18px; }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip { color: var(--accent); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/control-library", "Control library"],
    ["/evidence-room", "Evidence room"],
    ["/readiness-posture", "Readiness posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderGapAtlasOverview() {
  const executiveSummary = summary();
  const lanes = controlLibrary().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.controlFamily)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Assertion:</strong> ${escapeHtml(item.requestedAssertion)}</p>
        <p><strong>Coverage:</strong> ${item.coverageScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeTrustRiskScore} · buyer pressure ${item.buyerCriticalityScore} · $${item.trustExposureMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Security control evidence</span>
      <h1>Which control families are ready, which ones are thin or stale, and where will the next buyer, investor, or partner trust review stall first?</h1>
      <p class="lede">Security Control Evidence Binder turns control coverage, evidence freshness, owner readiness, and blocker load into one board-readable trust layer instead of scattered proof folders and narrative-only claims.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Control families</span><span class="metric-value">${executiveSummary.controlFamilies}</span><div class="metric-copy">Modeled trust binders in the current executive-facing estate.</div></div>
        <div class="metric"><span class="metric-label">Critical families</span><span class="metric-value">${executiveSummary.criticalFamilies}</span><div class="metric-copy">Control families with high coverage, freshness, or ownership pressure.</div></div>
        <div class="metric"><span class="metric-label">Blocked families</span><span class="metric-value">${executiveSummary.blockedFamilies}</span><div class="metric-copy">Control families already slowed by blocker load or escalation pressure.</div></div>
        <div class="metric"><span class="metric-label">Trust exposure</span><span class="metric-value">$${executiveSummary.trustExposureMillions}M</span><div class="metric-copy">Modeled exposure tied to incomplete or weak evidence binders.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Control library</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible trust pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready trust surface for comparing control coverage, evidence freshness, ownership readiness, and blocker load."
  );
}

export function renderGapRegister() {
  const rows = controlLibrary()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.controlFamily)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.requestedAssertion)}</td>
        <td>${item.coverageScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Control library",
    "/control-library",
    `<section class="hero">
      <span class="eyebrow">Control library</span>
      <h1>Each control family keeps one owner, one audience, one external assertion, and one corrective move attached.</h1>
      <p class="lede">The control library keeps trust work tied to the exact binder that will succeed or stall under external review.</p>
      <div class="nav">${navLinks("/control-library")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Control family</th><th>Owner</th><th>Audience</th><th>Action</th><th>Requested assertion</th><th>Coverage</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Control-library view showing who owns each trust binder, who needs it, and how complete it is."
  );
}

export function renderCoverageMatrix() {
  const rows = evidenceRoom()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.track)}</td>
        <td>${escapeHtml(item.controlGapHeadline)}</td>
        <td>${escapeHtml(item.evidenceSignal)}</td>
        <td>${escapeHtml(item.missingArtifact)}</td>
        <td>${item.coverageScore}</td>
        <td>${item.freshnessDays}</td>
        <td>${item.ownerReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Evidence room",
    "/evidence-room",
    `<section class="hero">
      <span class="eyebrow">Evidence room</span>
      <h1>Weak attachments, stale proof, and low-owner readiness stay visible in one trust room instead of hiding in separate folders.</h1>
      <p class="lede">This view keeps evidence pressure tied to the specific control family most likely to fail under buyer, investor, or partner review.</p>
      <div class="nav">${navLinks("/evidence-room")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Track</th><th>Gap headline</th><th>Evidence signal</th><th>Missing artifact</th><th>Coverage</th><th>Freshness (days)</th><th>Owner readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Evidence-room view showing where trust binders are incomplete, stale, or weakly owned."
  );
}

export function renderClosePlan() {
  const rows = readinessPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.blockerCount}</td>
        <td>${item.compositeTrustRiskScore}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.nextMove)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Readiness posture",
    "/readiness-posture",
    `<section class="hero">
      <span class="eyebrow">Readiness posture</span>
      <h1>The binder keeps closure work tied to one owner, one blocker count, and one next move instead of a floating trust to-do list.</h1>
      <p class="lede">This readiness posture helps leaders see which binders can close quickly, which require escalation, and which should be deferred until the evidence bundle catches up.</p>
      <div class="nav">${navLinks("/readiness-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Blockers</th><th>Trust risk</th><th>Owner</th><th>Next move</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Readiness-posture view for sequencing trust-binder closure, escalation, and deferral."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this trust binder is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live control binder.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Security Control Evidence Binder sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Security Control Evidence Binder docs</h1>
      <p class="lede">This surface packages control coverage, blocker load, and closure sequencing into reproducible routes and JSON outputs for board, investor, buyer, and partner trust reviews.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/control-library</code> keeps control ownership and assertions tied to one action.</li>
        <li><code>/evidence-room</code> compares missing proof, coverage, freshness, and owner readiness.</li>
        <li><code>/readiness-posture</code> sequences blocker cleanup, escalation, and closure.</li>
        <li><code>/api/payload</code> exposes the reproducible trust binder.</li>
      </ul>
    </section>`,
    "Product documentation for Security Control Evidence Binder and its trust-ready routes."
  );
}
