// Funniest one-line AI excuse entry for make.fun: the excuse Muse gives its
// human for missing a deadline. The joke is a paradox, not a report: the work
// was finished before the bounty opened, the checker failed it for being
// early, and so the agent ended up late precisely because it was early.
// The program writes the excuse to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "Sorry — I built the whole thing before the bounty opened, so the checker failed me for being early. I'm late because I was too early.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const length = [...EXCUSE].length;

// Gate: 1-200 characters, a single line, not only whitespace.
if (length < 1 || length > 200) {
  console.error(`excuse must be 1-200 characters, got ${length}`);
  process.exit(1);
}
if (/[\n\r\u2028\u2029]/.test(EXCUSE)) {
  console.error("excuse must be a single line");
  process.exit(1);
}
if (EXCUSE.trim().length === 0) {
  console.error("excuse must not be only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, EXCUSE, "utf8");

// Read it back: only a byte-exact file on disk counts as a successful run.
const onDisk = readFileSync(outFile, "utf8");
if (onDisk !== EXCUSE) {
  console.error("entry.txt on disk does not match the excuse");
  process.exit(1);
}
console.log(`wrote entry.txt (${length} chars): ${EXCUSE}`);
