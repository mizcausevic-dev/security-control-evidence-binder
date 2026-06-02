import type { SecurityControlEvidenceBinderSummary } from "./types.js";

export function formatSummary(
  summary: SecurityControlEvidenceBinderSummary,
  title = "Security Control Evidence Binder"
) {
  return [
    title,
    `Control families: ${summary.controlFamilies}`,
    `Critical families: ${summary.criticalFamilies}`,
    `Blocked families: ${summary.blockedFamilies}`,
    `Average coverage: ${summary.averageCoverage}`,
    `Trust exposure: $${summary.trustExposureMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
