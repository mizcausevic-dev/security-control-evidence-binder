import { describe, expect, it } from "vitest";
import { controlLibrary, evidenceRoom, payload, readinessPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the trust summary", () => {
    expect(summary().controlFamilies).toBeGreaterThan(0);
  });

  it("returns the control library view", () => {
    expect(controlLibrary().length).toBeGreaterThan(0);
  });

  it("returns the evidence room view", () => {
    expect(evidenceRoom().length).toBeGreaterThan(0);
  });

  it("returns the readiness posture view", () => {
    expect(readinessPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.controlFamilies).toBeGreaterThan(0);
  });
});
