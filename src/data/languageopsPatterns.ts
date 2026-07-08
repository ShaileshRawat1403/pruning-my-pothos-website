// Human-readable names/descriptions for LanguageOps' deterministic anti-pattern
// registry. The live /api/lint endpoint only returns pattern_id slugs (e.g.
// "anti-pattern.delve-reliance"); this lookup is what turns those into
// something a reader can actually understand on the page.
//
// Sourced from language-primitives/compiled/anti-patterns.jsonl (the same
// compiled registry the gateway loads at runtime). Detection is deterministic
// (exact-match / regex / heuristic) for everything listed here — patterns that
// require semantic judgment aren't in this file and won't appear in results,
// since the free, keyless /api/lint pass never scores them; it just lists
// their ids in semantic_review_required if relevant.

export interface LanguageOpsPattern {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium";
}

export const LANGUAGEOPS_PATTERNS: LanguageOpsPattern[] = [
  { id: "anti-pattern.abstract-ending", name: "Abstract Ending", description: "Closes a response, paragraph, or section with a vague, forward-facing phrase that asserts positivity or continuity without adding information (\"look forward to continued growth\", \"exciting times ahead\", \"remain committed to excellence\").", severity: "low" },
  { id: "anti-pattern.academic-distancing", name: "Academic Distancing", description: "Writes in an overly formal, detached, third-person passive style when active personal communication is expected.", severity: "low" },
  { id: "anti-pattern.adverbial-padding", name: "Adverbial Padding", description: "Pads strong verbs with redundant or empty intensifiers (e.g. 'completely destroy', 'significantly improve').", severity: "low" },
  { id: "anti-pattern.cliche-reliance", name: "Cliche Reliance", description: "Uses overused idiomatic phrases or corporate cliches (e.g. 'think outside the box', 'low-hanging fruit').", severity: "low" },
  { id: "anti-pattern.conceptual-vagueness", name: "Conceptual Vagueness", description: "Relies on abstract buzzwords or generic concepts (e.g. 'synergy', 'holistic optimization') instead of naming specific tools or actions.", severity: "medium" },
  { id: "anti-pattern.connective-density-overuse", name: "Connective Density Overuse", description: "Uses three or more transition connectives (Furthermore, Moreover, Additionally, etc.) in a single passage, creating a mechanical, over-signposted cadence.", severity: "medium" },
  { id: "anti-pattern.delve-reliance", name: "Delve Reliance", description: "Employs the verb 'delve' as a default synonym for look, study, analyze, or explore.", severity: "low" },
  { id: "anti-pattern.didactic-tone", name: "Didactic Tone", description: "Adopts a patronizing or overly instructive tone, talking down to the reader with elementary explanations.", severity: "medium" },
  { id: "anti-pattern.excessive-bulleting", name: "Excessive Bulleting", description: "Formats simple narrative steps or short descriptions into massive lists of bullet points instead of prose.", severity: "low" },
  { id: "anti-pattern.false-urgency", name: "False Urgency", description: "Inserts dramatic statements of importance (e.g. 'It is crucial to remember', 'It is vital to note') to force focus.", severity: "medium" },
  { id: "anti-pattern.forced-parallelism", name: "Forced Parallelism", description: "Forcing bullet lists or headers to have identical grammatical lengths or structures even when it reduces clarity.", severity: "low" },
  { id: "anti-pattern.fragmented-paragraph-structure", name: "Fragmented Paragraph Structure", description: "Structures prose as a sequence of one-sentence paragraphs separated by line breaks, producing a staccato pacing where each idea stands alone as a declaration.", severity: "medium" },
  { id: "anti-pattern.hedging-overuse", name: "Hedging Overuse", description: "Dilutes statements with excess qualifiers (e.g. 'it might be possible that perhaps', 'appears to potentially represent').", severity: "medium" },
  { id: "anti-pattern.hyperbolic-intro", name: "Hyperbolic Intro", description: "Commences a section or response with dramatic, sweeping statements (e.g. 'In the rapidly evolving landscape of...').", severity: "medium" },
  { id: "anti-pattern.long-clause-pileup", name: "Long Clause Pileup", description: "Constructs sentences with four or more dependent or relative clauses, burying the main idea under successive qualifications and sub-thoughts.", severity: "medium" },
  { id: "anti-pattern.nominalization-bloat", name: "Nominalization Bloat", description: "Turns active verbs into bloated nouns (e.g. 'make a decision' instead of 'decide').", severity: "low" },
  { id: "anti-pattern.noun-stack-overload", name: "Noun Stack Overload", description: "Packs three or more abstract nouns or nominalized forms in sequence, creating dense noun phrases that obscure meaning and resist parsing.", severity: "medium" },
  { id: "anti-pattern.over-transitioning", name: "Over-Transitioning", description: "Relies on heavy, formal transition words like 'moreover', 'furthermore', 'consequently', or 'additionally'.", severity: "low" },
  { id: "anti-pattern.passive-voice-escape", name: "Passive Voice Escape", description: "Relies on passive verb constructions to avoid assigning responsibility or clear agency.", severity: "low" },
  { id: "anti-pattern.redundant-doublets", name: "Redundant Doublets", description: "Employs two words or qualifiers that mean the same thing in the same phrase (e.g. 'first and foremost', 'various different').", severity: "low" },
  { id: "anti-pattern.repeated-sentence-opening", name: "Repeated Sentence Opening", description: "Starts three or more consecutive sentences with the same word or phrase, creating a mechanical, rocking-horse rhythm.", severity: "medium" },
  { id: "anti-pattern.robotic-empathy", name: "Robotic Empathy", description: "Employs standard, repetitive, and unearned expressions of comfort or understanding (e.g. 'I understand how frustrating...').", severity: "medium" },
  { id: "anti-pattern.short-sentence-staccato", name: "Short Sentence Staccato", description: "Writes four or more consecutive short sentences (under ~60 characters each) within the same prose block, creating a flat, percussive rhythm that feels asserted rather than argued.", severity: "medium" },
  { id: "anti-pattern.soft-vagueness", name: "Soft Vagueness", description: "Uses generic benefit language, nominalization doublets, and vague ease-of-use qualifiers to assert value without saying anything concrete.", severity: "medium" },
  { id: "anti-pattern.structure-without-progression", name: "Structure Without Progression", description: "Fills a paragraph with sentences that restate or slightly rephrase the same idea rather than advancing to evidence, implication, or resolution.", severity: "medium" },
  { id: "anti-pattern.summary-wrap", name: "Summary Wrap", description: "Appends a redundant final paragraph summarizing the content already explained.", severity: "medium" },
  { id: "anti-pattern.sycophantic-agreement", name: "Sycophantic Agreement", description: "Unconditionally validates and praises the user's statements, even if incorrect or problematic.", severity: "medium" },
  { id: "anti-pattern.tapestry-metaphor", name: "Tapestry Metaphor", description: "Relies on generic structural metaphors like 'tapestry', 'beacon', 'journey', 'landscape', or 'testament' to describe situations.", severity: "medium" },
  { id: "anti-pattern.throat-clearing", name: "Throat Clearing", description: "Introduces conversational filler or introductory framing before answering. Includes AI assistant openers and low-information professional email openings.", severity: "low" },
  { id: "anti-pattern.weak-verb-chain", name: "Weak Verb Chain", description: "Relies on a dense sequence of linking, support, or state verbs (is, was, ensures, enables, provides, supports, allows, helps) instead of direct action verbs.", severity: "medium" },
  { id: "anti-pattern.word-count-padding", name: "Word Count Padding", description: "Adds redundant descriptive clauses, repeating information in multiple ways to meet arbitrary length goals.", severity: "low" },
  { id: "anti-pattern.confessional-opener", name: "Confessional Opener", description: "Stock phrases that perform candor before saying anything — \"Here's the thing\", \"Hot take\", \"Let's be honest\", \"Because honestly?\", \"Look, I get it\", \"Ever notice how\", \"the truth nobody wants to hear\".", severity: "medium" },
  { id: "anti-pattern.false-pivot-question", name: "False Pivot Question", description: "A fragment question used as a pivot — \"The problem? Nobody owns it.\" / \"The result? Chaos.\" / \"The insight? It was never about speed.\" The writer asks themselves a two-word question solely to answer it dramatically.", severity: "medium" },
  { id: "anti-pattern.manufactured-stillness", name: "Manufactured Stillness", description: "Faux-zen aphorisms that perform depth through stillness imagery — \"the quiet shift\", \"the shift is not dramatic, it's quiet\", \"Real growth is quiet\", \"None of this feels like a breakthrough in the moment\".", severity: "medium" },
  { id: "anti-pattern.ai-vocabulary-cluster", name: "AI Vocabulary Cluster", description: "Overusing characteristic buzzwords and academic verbs that frequently recur in LLM-generated text.", severity: "medium" },
  { id: "anti-pattern.false-range-construction", name: "False Range Construction", description: "Using 'from X to Y' structures where the two points do not represent a measurable scale or logical spectrum.", severity: "medium" },
  { id: "anti-pattern.legacy-importance-puffery", name: "Legacy/Importance Puffery", description: "Using grandiose, self-important phrases that claim significance rather than showing it.", severity: "medium" },
  { id: "anti-pattern.mechanical-synonym-cycling", name: "Mechanical Synonym Cycling", description: "Rotating demographic descriptors (e.g., 'the older man', 'the central figure') or synonyms purely to avoid repeating a character's name.", severity: "medium" },
  { id: "anti-pattern.narrator-as-analyst", name: "Narrator as Analyst", description: "Attaching present participle phrases (e.g., 'highlighting', 'underscoring') to editorialize the meaning or impact of preceding actions.", severity: "medium" },
  { id: "anti-pattern.negative-parallelism", name: "Negative Parallelism", description: "Replaces direct statements with syntactic opposition ('Not X, but Y').", severity: "medium" },
  { id: "anti-pattern.promotional-brochure-language", name: "Promotional/Brochure Language", description: "Using marketing, travel writing, or promotional clichés to describe places or experiences.", severity: "medium" },
  { id: "anti-pattern.staccato-fragment-streak", name: "Staccato Fragment Streak", description: "Using consecutive single-word verb sentences to mimic tension or rapid action.", severity: "medium" },
  { id: "anti-pattern.trailing-participle-pileup", name: "Trailing Participle Pile-Up", description: "Repeating sentence structures that end with present participle phrases (e.g., ', running a hand...'), leading to a floaty, monotonous rhythm.", severity: "medium" },
  { id: "anti-pattern.triple-beat-list-overuse", name: "Triple-Beat List Overuse", description: "Repeating three-part noun or sentence fragment sequences to create performative emphasis or dramatic cadence.", severity: "medium" },
  { id: "anti-pattern.forced-wit", name: "Forced Wit", description: "Humour that is imported, signalled, or stacked rather than arising from the subject — quips unrelated to the content, jokes flagged as jokes, or multiple gags crowding one response.", severity: "medium" },
];

const PATTERN_MAP: Record<string, LanguageOpsPattern> = Object.fromEntries(
  LANGUAGEOPS_PATTERNS.map((p) => [p.id, p])
);

export function getPatternInfo(id: string): LanguageOpsPattern | undefined {
  return PATTERN_MAP[id];
}

export function humanizePatternId(id: string): string {
  return (
    PATTERN_MAP[id]?.name ??
    id
      .replace(/^anti-pattern\./, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
