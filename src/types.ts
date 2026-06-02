export type ControlTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "PLATFORM_SECURITY"
  | "PROCUREMENT_TRUST"
  | "REVENUE_CONTROLS"
  | "REGULATED_SYSTEMS";

export type BinderAction = "CLOSE" | "REFRESH" | "ESCALATE" | "DEFER";

export type ReadinessSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface SecurityControlEvidenceBinderItem {
  id: string;
  lane: string;
  track: ControlTrack;
  action: BinderAction;
  controlFamily: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  requestedAssertion: string;
  controlGapHeadline: string;
  evidenceSignal: string;
  missingArtifact: string;
  evidenceArtifacts: string[];
  evidenceMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  coverageScore: number;
  freshnessDays: number;
  ownerReadinessScore: number;
  buyerCriticalityScore: number;
  blockerCount: number;
  trustExposureMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ReadinessAssessment {
  severity: ReadinessSeverity;
  ok: boolean;
  message: string;
}

export interface SecurityControlEvidenceBinderReportItem extends SecurityControlEvidenceBinderItem {
  evidenceCoverageAssessment: ReadinessAssessment;
  freshnessAssessment: ReadinessAssessment;
  ownerReadinessAssessment: ReadinessAssessment;
  blockerAssessment: ReadinessAssessment;
  buyerCriticalityAssessment: ReadinessAssessment;
  compositeTrustRiskScore: number;
}

export interface SecurityControlEvidenceBinderSummary {
  controlFamilies: number;
  criticalFamilies: number;
  blockedFamilies: number;
  averageCoverage: number;
  trustExposureMillions: number;
  leadingMessage: string;
}

export interface SecurityControlEvidenceBinderExport {
  generatedAt: string;
  summary: SecurityControlEvidenceBinderSummary;
  items: SecurityControlEvidenceBinderReportItem[];
}

export interface SecurityControlEvidenceBinderPayload {
  report: SecurityControlEvidenceBinderExport;
  controlLibrary: ReturnType<typeof import("./services/verticalBriefService.js").controlLibrary>;
  evidenceRoom: ReturnType<typeof import("./services/verticalBriefService.js").evidenceRoom>;
  readinessPosture: ReturnType<typeof import("./services/verticalBriefService.js").readinessPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: SecurityControlEvidenceBinderItem[];
}
