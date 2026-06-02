import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the trust summary", () => {
    const output = formatSummary({
      controlFamilies: 6,
      criticalFamilies: 4,
      blockedFamilies: 3,
      averageCoverage: 71.2,
      trustExposureMillions: 147,
      leadingMessage: "Trust weakness is rising."
    });

    expect(output).toContain("Security Control Evidence Binder");
    expect(output).toContain("Critical families: 4");
    expect(output).toContain("Blocked families: 3");
    expect(output).toContain("Trust exposure: $147M");
  });
});
