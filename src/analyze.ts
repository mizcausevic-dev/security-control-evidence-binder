import type {
  ReadinessAssessment,
  ReadinessSeverity,
  SecurityControlEvidenceBinderExport,
  SecurityControlEvidenceBinderItem,
  SecurityControlEvidenceBinderReportItem
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): ReadinessAssessment {
  let severity: ReadinessSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ReadinessAssessment {
  let severity: ReadinessSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: SecurityControlEvidenceBinderItem[],
  options: { now?: string } = {}
): SecurityControlEvidenceBinderExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: SecurityControlEvidenceBinderReportItem[] = items.map((item) => {
    const evidenceCoverageAssessment = assessStrength(
      item.coverageScore,
      82,
      68,
      "Control coverage is strong enough for buyer and board reuse.",
      "Control coverage exists, but the binder still needs stronger attachment depth.",
      "Control coverage is too thin for the current trust claim."
    );

    const freshnessAssessment = assessDelay(
      item.freshnessDays,
      14,
      35,
      "Evidence is fresh enough for external review.",
      "Evidence is aging and should be refreshed before reuse.",
      "Evidence is stale enough to weaken the control claim."
    );

    const ownerReadinessAssessment = assessStrength(
      item.ownerReadinessScore,
      80,
      65,
      "Ownership is clear enough to close the binder quickly.",
      "Ownership exists, but closure still depends on cross-functional follow-up.",
      "Ownership is too weak to move the binder cleanly."
    );

    const blockerAssessment = assessDelay(
      item.blockerCount,
      0,
      1,
      "No visible blocker is slowing control-family closure.",
      "A blocker is forming and should be cleared before the next trust review.",
      "Blocker load is already delaying the binder."
    );

    const buyerCriticalityAssessment = assessStrength(
      100 - item.buyerCriticalityScore,
      55,
      35,
      "The review pressure is manageable relative to the current binder.",
      "The review is becoming hard to satisfy with the current control coverage.",
      "The review is too critical for the current binder weakness."
    );

    const compositeTrustRiskScore =
      Math.round(
        ((100 - item.coverageScore +
          item.freshnessDays +
          100 - item.ownerReadinessScore +
          item.blockerCount * 20 +
          item.buyerCriticalityScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      evidenceCoverageAssessment,
      freshnessAssessment,
      ownerReadinessAssessment,
      blockerAssessment,
      buyerCriticalityAssessment,
      compositeTrustRiskScore
    };
  });

  const criticalFamilies = reportItems.filter(
    (item) =>
      item.evidenceCoverageAssessment.severity === "HIGH" ||
      item.freshnessAssessment.severity === "HIGH" ||
      item.ownerReadinessAssessment.severity === "HIGH"
  ).length;

  const blockedFamilies = reportItems.filter(
    (item) => item.blockerAssessment.severity !== "LOW" || item.action === "ESCALATE"
  ).length;

  const averageCoverage =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.coverageScore, 0) / reportItems.length) * 10) / 10;

  const trustExposureMillions = reportItems.reduce((sum, item) => sum + item.trustExposureMillions, 0);

  const leadingMessage =
    criticalFamilies === 0
      ? "Control evidence is strong enough to support the current buyer, partner, and board trust narrative."
      : criticalFamilies <= 2
        ? "A few control families need fresher evidence and tighter ownership before the next external review."
        : "Trust weakness is now cross-functional and should be closed as one board-visible evidence workstream.";

  return {
    generatedAt,
    summary: {
      controlFamilies: reportItems.length,
      criticalFamilies,
      blockedFamilies,
      averageCoverage,
      trustExposureMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: SecurityControlEvidenceBinderItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
