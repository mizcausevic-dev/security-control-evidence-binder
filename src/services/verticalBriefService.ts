import { analyze } from "../analyze.js";
import { sampleSecurityControlEvidenceBinder } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use procurement and identity as the reference binders, escalate platform security first, defer integrated revenue language second, and refresh AI plus regulated-control proof before the next external review."
  };
}

export function controlLibrary() {
  return sampleSecurityControlEvidenceBinder.map((item) => ({
    lane: item.lane,
    controlFamily: item.controlFamily,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    requestedAssertion: item.requestedAssertion,
    coverageScore: item.coverageScore,
    nextMove: item.nextMove
  }));
}

export function evidenceRoom() {
  return sampleSecurityControlEvidenceBinder.map((item) => ({
    lane: item.lane,
    track: item.track,
    controlGapHeadline: item.controlGapHeadline,
    evidenceSignal: item.evidenceSignal,
    missingArtifact: item.missingArtifact,
    evidenceArtifacts: item.evidenceArtifacts,
    coverageScore: item.coverageScore,
    freshnessDays: item.freshnessDays,
    ownerReadinessScore: item.ownerReadinessScore
  }));
}

export function readinessPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    blockerCount: item.blockerCount,
    compositeTrustRiskScore: item.compositeTrustRiskScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    compositeTrustRiskScore: item.compositeTrustRiskScore,
    trustExposureMillions: item.trustExposureMillions,
    buyerCriticalityScore: item.buyerCriticalityScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic control-family data only - no live buyer, board, customer, or partner evidence packets are included.",
    "Scores are modeled to show how Kinetic Gain can compare control coverage, evidence freshness, owner readiness, blocker load, and review criticality in one board-readable trust surface.",
    "All routes are read-only and demonstrate trust-evidence packaging, not production legal, security, or compliance advice."
  ];
}

export function payload() {
  return {
    report,
    controlLibrary: controlLibrary(),
    evidenceRoom: evidenceRoom(),
    readinessPosture: readinessPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleSecurityControlEvidenceBinder
  };
}
