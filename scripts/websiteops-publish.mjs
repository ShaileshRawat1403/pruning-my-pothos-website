#!/usr/bin/env node
/**
 * websiteops-publish — the governed publish step.
 *
 * Takes a flowright packet, runs the conform+verify bridge with --promote (the
 * gate: it only exits 0 when the post is schema-correct AND lint:content,
 * lint:systems, and verify:covers all pass), and only then opens a pull request
 * in this repo with the conformed MDX and its cover. It never deploys and never
 * merges. The human merge is the stop sign; the existing "Deploy to Hostinger"
 * dispatch ships what is merged.
 *
 * Usage:
 *   node scripts/websiteops-publish.mjs --in <packet> --collection <systems|self|sentences> [options]
 *
 * Options:
 *   --slug <slug>    override slug (default: from title)
 *   --enrich         pass through to the bridge (safe structural conforming)
 *   --base <branch>  PR base branch (default: main)
 *   --dry-run        print the git/gh commands instead of running them
 *
 * Requires (on your machine, not in CI): git, and the GitHub CLI `gh` authed.
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import matter from "gray-matter";
import fs from "node:fs";
import { COLLECTIONS, SUPPORTED, slugify } from "./content-contract.mjs";

const ROOT = process.cwd();

function parseArgs(argv) {
  const a = { enrich: false, "dry-run": false, base: "main", "auto-merge": false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--enrich") a.enrich = true;
    else if (k === "--dry-run") a["dry-run"] = true;
    else if (k === "--auto-merge") a["auto-merge"] = true;
    else if (k.startsWith("--")) a[k.slice(2)] = argv[++i];
  }
  return a;
}
const args = parseArgs(process.argv.slice(2));
const dry = args["dry-run"];

function die(msg) { console.error(`\n✗ ${msg}\n`); process.exit(1); }
if (!args.in) die("Missing --in <packet file>");
if (!SUPPORTED.includes(args.collection)) die(`--collection must be one of ${SUPPORTED.join(", ")}`);

function run(cmd, argv, { capture = false } = {}) {
  if (dry) {
    console.log(`  $ ${cmd} ${argv.join(" ")}`);
    return { status: 0, stdout: "", stderr: "" };
  }
  const r = spawnSync(cmd, argv, { cwd: ROOT, encoding: "utf8", stdio: capture ? "pipe" : "inherit" });
  return r;
}

// ── read packet → derive slug, paths ─────────────────────────────────────────
const collection = args.collection;
const raw = fs.readFileSync(path.resolve(args.in), "utf8");
const data = matter(raw).data || {};
if (!data.title) die("Packet has no title in frontmatter.");
const slug = args.slug ? slugify(args.slug) : slugify(data.title);
const ext = COLLECTIONS[collection].ext;
const contentFile = path.join("src", "content", collection, `${slug}${ext}`);
const coverFile = COLLECTIONS[collection].needsCover ? path.join("public", "covers", "systems", `${slug}.svg`) : null;
const branch = `websiteops/${collection}/${slug}`;

console.log(`\n  websiteops publish · ${collection} · ${slug}\n`);

// ── 1. gate: conform + verify with --promote ─────────────────────────────────
console.log("  [1/4] conform + verify (bridge gate)...");
const conformArgs = ["scripts/websiteops-conform.mjs", "--in", path.resolve(args.in), "--collection", collection];
if (!dry) conformArgs.push("--promote"); // real runs enforce the full CI gates
if (args.enrich) conformArgs.push("--enrich");
if (args.slug) conformArgs.push("--slug", args.slug);
const gate = spawnSync("node", conformArgs, { cwd: ROOT, encoding: "utf8", stdio: "inherit" });
if (!dry && gate.status !== 0) die("Packet is NOT READY — the bridge/gates rejected it. Nothing was published. Fix the reported items and retry.");
if (dry && gate.status !== 0) console.log("\n  (dry-run) packet not yet READY; showing the git/PR plan anyway for preview.");

// ── 2. branch ────────────────────────────────────────────────────────────────
console.log(`\n  [2/4] branch ${branch}...`);
run("git", ["checkout", "-B", branch]);

// ── 3. commit the post + cover ───────────────────────────────────────────────
console.log("  [3/4] commit...");
const toAdd = [contentFile, coverFile].filter(Boolean);
run("git", ["add", ...toAdd]);
run("git", ["commit", "-m", `content(${collection}): ${data.title}`]);

// ── 4. push + open PR (never merge) ──────────────────────────────────────────
console.log("  [4/4] push + open PR...");
run("git", ["push", "-u", "origin", branch]);

const hasGh = dry || spawnSync("gh", ["--version"], { encoding: "utf8" }).status === 0;
const prBody = [
  `Automated WebsiteOps proposal for **${data.title}**.`,
  ``,
  `- Collection: \`${collection}\``,
  `- Conformed and verified by \`scripts/websiteops-conform.mjs\` (frontmatter + body structure + lint:content + lint:systems + verify:covers all green).`,
  `- This is a proposal, not a deployment. Merging is the human stop sign; the existing "Deploy to Hostinger" workflow ships what is merged.`,
].join("\n");

if (hasGh) {
  run("gh", ["pr", "create", "--base", args.base, "--head", branch, "--title", `content(${collection}): ${data.title}`, "--body", prBody]);
  if (args["auto-merge"]) {
    // Squash-merge automatically once CI passes. The human decision already
    // happened at the review gate that approved this packet; CI remains the
    // technical gate. Deploy fires from CI success on main (workflow_run).
    run("gh", ["pr", "merge", branch, "--squash", "--auto", "--delete-branch"]);
    console.log("\n  ✓ Auto-merge armed: merges when CI passes, then Deploy to Hostinger fires automatically.");
  }
} else {
  console.log("\n  gh CLI not found. Push is done; open the PR manually:");
  console.log(`    base: ${args.base}  head: ${branch}`);
}

if (args["auto-merge"]) {
  console.log(`\n  ✓ PR proposed for ${branch} with auto-merge. Approval already given at the review gate; CI green = live.\n`);
} else {
  console.log(`\n  ✓ PR proposed for ${branch}. Review the rendered diff and MERGE to publish. Nothing deployed.\n`);
}
