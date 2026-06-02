import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleSecurityControlEvidenceBinder } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "security-control-evidence-binder.json"), { force: true });
rmSync(path.join(fixturesDir, "security-control-evidence-binder-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "security-control-evidence-binder.json"),
  JSON.stringify(sampleSecurityControlEvidenceBinder, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "security-control-evidence-binder-clean.json"),
  JSON.stringify(
    sampleSecurityControlEvidenceBinder.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
