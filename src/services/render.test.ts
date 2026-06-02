import { describe, expect, it } from "vitest";
import {
  renderClosePlan,
  renderCoverageMatrix,
  renderDocs,
  renderGapAtlasOverview,
  renderGapRegister,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderGapAtlasOverview()).toContain("Security Control Evidence Binder");
  });

  it("renders the control library route", () => {
    expect(renderGapRegister()).toContain("/control-library");
  });

  it("renders the evidence room route", () => {
    expect(renderCoverageMatrix()).toContain("/evidence-room");
  });

  it("renders the readiness posture route", () => {
    expect(renderClosePlan()).toContain("Readiness posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic control-family data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
