# Character Plates — casting, art briefs, and quotes

Each page gets a hero plate: a figure whose real life mirrors the page's intent,
rendered as an **HTML version of a portrait** so it can be enhanced later
(self-developing reveal, theme adaptation, layered overlays).

## How a plate works

1. You generate an oil portrait (Ada / Aristotle style) and drop it at the path below.
2. The reusable wrapper `public/scenes/character.html` renders it: it "develops"
   the plate (grayscale to color + wipe), applies the warm grade + grain, and
   adapts ink to the theme. No code change needed to swap art.
3. The React `CharacterPlate` frames it (corner brackets, PLATE label, caption)
   and shows the speech bubble with the five quotes on hover.

Wiring already live: **Home** (Ada), **Self** (your HTML self-portrait),
**Sentences** (Nietzsche, currently a symbolic line-scene placeholder until his
portrait exists).

## Art direction — shared style

Match the Ada plate: painterly **oil**, cyber-classical, the figure amid the
tools of their craft, glowing code / symbols woven in, dramatic chiaroscuro,
warm-and-cool contrast, **3:2 landscape**, subject centered or centered-right so
the speech bubble has room on the upper left. Non-photoreal, characterful.

> Note on living people (Jonny Greenwood): prefer an **evocative** depiction
> (three-quarter/back view, stage-lit, defined by gear and gesture rather than a
> exact facial likeness) to keep it a homage, not a portrait of a real person.

## Roster, paths, briefs, quotes

### Sentences — Friedrich Nietzsche
Path: `public/images/characters/nietzsche.jpg` → `?img=/images/characters/nietzsche.jpg`
Brief: a wild-mustached philosopher on a windswept alpine summit at dusk, a ring
of eternal return glowing overhead, torn aphorism pages drifting like snow.
Quotes:
1. I wrote in fragments because the whole was too heavy to lift at once.
2. An aphorism is a full day's climb, pressed into a single line.
3. Say less, and mean it harder.
4. What I cannot put in one clear sentence, I do not yet understand.
5. They will misread me for a hundred years. I can wait.

### Sentiments — Ramon Llull
Path: `public/images/characters/llull.jpg`
Brief: a 13th-century mystic-scholar turning glowing concentric volvelle discs
(his combinatorial "thinking machine"), candlelight becoming circuit light,
manuscript margins full of stars.
Quotes:
1. I built a machine of paper wheels to turn every idea against every other. You would call it a search space.
2. Truth, I decided, could be spun. Give the discs a question and let them gossip.
3. They thought me mad for mechanizing thought. Six centuries early, apparently.
4. Faith and logic in the same hand. I never saw why you must drop one to hold the other.
5. Every combination I could name, the wheels would find. The trick was asking the right one.

### Systems — George Boole
Path: `public/images/characters/boole.jpg`
Brief: a Victorian logician at a desk where 0s and 1s float up and resolve into
glowing AND / OR / NOT gates, chalk equations turning into circuit traces.
Quotes:
1. I took the laws of thought and wrote them as sums. Everything you click still obeys them.
2. True and false were enough to build a universe. I only had to be patient.
3. People use my algebra a billion times a day and could not pick me from a crowd. I am at peace with it.
4. Give me AND, OR, and NOT, and I will give you every decision you will ever make.
5. Reason has a grammar, and it is stricter than most people hope.

### Tools — Hero of Alexandria
Path: `public/images/characters/hero.jpg`
Brief: a Greek engineer in a workshop of brass automata and quiet steam, a
programmable cart driven by string-and-peg "code," glowing gears.
Quotes:
1. I wrote programs in string and pegs, and the little theatre moved itself. No electricity required.
2. A door that opens on its own is only a sequence of causes, patiently arranged.
3. They called it magic. I called it a list of steps that happened to be brass.
4. Give a machine one clear instruction and it will repeat it forever, faithfully, stupidly.
5. I automated the temple so the priests could seem divine. The oldest use of a good demo.

### Canvases — Iannis Xenakis
Path: `public/images/characters/xenakis.jpg`
Brief: an architect-composer before a vast glowing graphic score that is also a
building blueprint, ruled-surface curves, a stochastic scatter of star-points.
Quotes:
1. I drew the music as a building and let the mathematics decide where the notes should stand.
2. Give randomness a strict enough rule and it starts to sound like a decision.
3. A score, a blueprint, an equation. On my desk they were the same page turned three ways.
4. The computer did not write the piece. It held the shape while I argued with it.
5. People want music to be feeling. Mine was also structure, and the structure was the feeling.

### Shelf — Jonny Greenwood
Path: `public/images/characters/greenwood.jpg`
Brief (evocative, not a likeness): a modern composer half-lit on a dim stage with
an ondes Martenot and a modular synth, waveforms and patch cables becoming an
orchestra, warm amp glow.
Quotes:
1. The synth is just a very opinionated instrument. You negotiate.
2. Half of scoring a film is deciding what the silence is allowed to do.
3. I like machines that surprise me. The ones that only obey get boring fast.
4. A good part on paper still has to survive a real room and a nervous player.
5. Noise becomes music the moment someone decides where it belongs.

### Docs — Euclid
Path: `public/images/characters/euclid.jpg`
Brief: a geometer drawing luminous axioms that assemble into 3D solids, a scroll
of the Elements, compass-and-straightedge lines of light.
Quotes:
1. Begin with what cannot be doubted. Build only what follows. That is the whole discipline.
2. I wrote the first documentation. Thirteen books, and the diagrams still hold.
3. There is no royal road to geometry, and no shortcut past understanding either.
4. A proof is a promise you can check. That is why it outlives opinion.
5. Define your terms before you quarrel. Most disputes die there, quietly.

### About — open
Candidate: **Emilie du Chatelet**, who translated and corrected Newton so others
could build on him — a literal thinker, tinkerer, translator. Or you, since About
is your own room. Your call.
