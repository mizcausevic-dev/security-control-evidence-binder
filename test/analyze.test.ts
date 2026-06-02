import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleSecurityControlEvidenceBinder } from "../src/data/sampleVerticalBrief.js";
import type { SecurityControlEvidenceBinderItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleSecurityControlEvidenceBinder.length);
  });

  it("counts critical families", () => {
    const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.criticalFamilies).toBeGreaterThan(0);
  });

  it("counts blocked families", () => {
    const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.blockedFamilies).toBeGreaterThan(0);
  });

  it("sums trust exposure", () => {
    const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.trustExposureMillions).toBe(147);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.controlFamilies).toBe(0);
    expect(report.summary.averageCoverage).toBe(0);
    expect(report.summary.leadingMessage).toContain("strong enough");
  });

  it("hits low and medium trust branches explicitly", () => {
    const fixtures: SecurityControlEvidenceBinderItem[] = [
      {
        id: "low-branch",
        lane: "Healthy binder",
        track: "PROCUREMENT_TRUST",
        action: "CLOSE",
        controlFamily: "Healthy binder",
        boardQuestion: "Can this binder close cleanly?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        requestedAssertion: "Controls are ready.",
        controlGapHeadline: "Evidence is aligned.",
        evidenceSignal: "No visible issue.",
        missingArtifact: "None",
        evidenceArtifacts: ["trust packet"],
        evidenceMoves: ["keep binder current"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        coverageScore: 86,
        freshnessDays: 9,
        ownerReadinessScore: 82,
        buyerCriticalityScore: 40,
        blockerCount: 0,
        trustExposureMillions: 5,
        headline: "Healthy binder.",
        narrative: "Low branch test.",
        nextMove: "Keep the binder current."
      },
      {
        id: "medium-branch",
        lane: "Watch binder",
        track: "IDENTITY",
        action: "REFRESH",
        controlFamily: "Watch binder",
        boardQuestion: "Where does the binder start aging?",
        owner: "Security owner",
        audience: "Audit committee",
        currentPosture: "Watch state.",
        requestedAssertion: "Controls are consistent.",
        controlGapHeadline: "Evidence is aging.",
        evidenceSignal: "One small blocker.",
        missingArtifact: "Recent control export",
        evidenceArtifacts: ["control export"],
        evidenceMoves: ["refresh binder"],
        relatedSurfaces: ["certs.kineticgain.com"],
        companyTags: ["Okta"],
        coverageScore: 72,
        freshnessDays: 24,
        ownerReadinessScore: 69,
        buyerCriticalityScore: 55,
        blockerCount: 1,
        trustExposureMillions: 7,
        headline: "Watch the binder.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the binder."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].evidenceCoverageAssessment.severity).toBe("LOW");
    expect(report.items[0].freshnessAssessment.severity).toBe("LOW");
    expect(report.items[1].evidenceCoverageAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].freshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].ownerReadinessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].blockerAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("strong enough");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleSecurityControlEvidenceBinder, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.controlFamilies).toBe(sampleSecurityControlEvidenceBinder.length);
  });
});
