import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("security-control-evidence-binder app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Security Control Evidence Binder");
  });

  it("serves the control library route", async () => {
    const response = await request(app).get("/control-library");
    expect(response.status).toBe(200);
  });

  it("serves the evidence room route", async () => {
    const response = await request(app).get("/evidence-room");
    expect(response.status).toBe(200);
  });

  it("serves the readiness posture route", async () => {
    const response = await request(app).get("/readiness-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.controlFamilies).toBeGreaterThan(0);
  });

  it("serves the control library API", async () => {
    const response = await request(app).get("/api/control-library");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the evidence room API", async () => {
    const response = await request(app).get("/api/evidence-room");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
