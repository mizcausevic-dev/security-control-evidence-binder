import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { formatSummary } from "./format.js";
import type { SecurityControlEvidenceBinderItem } from "./types.js";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: security-control-evidence-binder <input.json> [--format summary|json]");
  process.exit(1);
}

const inputPath = args[0] ?? "fixtures/security-control-evidence-binder.json";
const formatFlagIndex = args.findIndex((arg) => arg === "--format");
const requestedFormat =
  formatFlagIndex >= 0 && args[formatFlagIndex + 1] ? args[formatFlagIndex + 1] : "summary";

const raw = readFileSync(inputPath, "utf8");
const items = JSON.parse(raw) as SecurityControlEvidenceBinderItem[];
const report = analyze(items);

if (requestedFormat === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(formatSummary(report.summary, "Security Control Evidence Binder"));
}
