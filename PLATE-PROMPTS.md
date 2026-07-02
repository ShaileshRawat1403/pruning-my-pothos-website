# Plate image prompts — consistent generation sheet

Goal: seven portraits that match the Ada Lovelace and Aristotle plates in style.
The trick to consistency is a **locked style block** reused in every prompt, with
only the scene changing. Keep the model, style block, aspect, and negatives the
same across all seven. If your tool supports an image style reference, attach
`ada-lovelace-hero.jpg` to every generation.

## Global settings (use for all)

- Aspect ratio: **3:2 landscape** (e.g. 1536 x 1024)
- Same model + same style block every time; vary only the SCENE line
- Composition: subject centered or slightly right; **keep the upper-left third
  calmer / darker** so the speech bubble has room
- Save each as JPG at the path listed, then tell me and I wire it in

## STYLE BLOCK (paste into every prompt, unchanged)

> Painterly oil painting, cyber-classical style. A historical figure fused with
> anachronistic technology in a dark, atmospheric setting lit by the glow of
> luminous code and symbols. Dramatic chiaroscuro, deep shadows, a single warm
> key light on the subject. Rich detail, visible brushwork, museum-quality oil
> portrait. Palette: midnight-blue and teal shadows, glowing emerald and cyan
> code, brass and warm-gold highlights, oxblood accents. Romantic, cerebral,
> non-photorealistic. Composed for 3:2, subject slightly right of center, calmer
> negative space in the upper left.

## NEGATIVE PROMPT (use for all)

> text, lettering, captions, watermark, signature, logo, modern UI, frame,
> border, deformed hands, extra fingers, low detail, flat lighting, cartoonish,
> 3D render, photograph

---

## 1. Nietzsche  →  `public/images/characters/nietzsche.jpg`
SCENE: Friedrich Nietzsche with his great sweeping mustache, standing on a
windswept alpine summit at dusk, greatcoat caught by the wind. A glowing ring of
light arcs overhead like an eternal return. Torn pages of aphorisms swirl around
him like snow, faint luminous script dissolving in the cold air. Sublime,
solitary, mountains fading into blue distance.
[+ STYLE BLOCK]

## 2. Ramon Llull  →  `public/images/characters/llull.jpg`
SCENE: A medieval robed scholar-mystic in a dark scriptorium, both hands turning
large concentric lettered discs (a volvelle "thinking machine"). Candlelight
bleeds into glowing circuit-light; luminous lines connect the letters into
combinations across the air. Manuscripts, stars inked in the margins, a quiet
zealous intensity.
[+ STYLE BLOCK]

## 3. George Boole  →  `public/images/characters/boole.jpg`
SCENE: A Victorian gentleman-logician at a wooden desk in a dim study, one lamp
burning. Chalk equations on a slate lift off and transform into glowing AND, OR,
and NOT logic gates; streams of green 0s and 1s rise like fireflies toward the
ceiling. Composed, patient, ink-stained fingers.
[+ STYLE BLOCK]

## 4. Hero of Alexandria  →  `public/images/characters/hero.jpg`
SCENE: A Greek engineer in a candlelit workshop of brass automata, sleeves
rolled. Interlocking gears turn a pegged programming drum; a small cart moves
itself along a track, trailing a thin string. Faint steam, glowing schematic
lines in the air, amphorae and scrolls in the shadows. Tinkerer's delight.
[+ STYLE BLOCK]

## 5. Iannis Xenakis  →  `public/images/characters/xenakis.jpg`
SCENE: A rugged mid-century architect-composer, a faint scar near one eye,
standing before a vast glowing wall where a musical score becomes an
architectural blueprint: sweeping ruled curves of a hyperbolic-paraboloid shell,
a stochastic scatter of luminous points. Drafting tools, blueprint blue, dramatic
raking light.
[+ STYLE BLOCK]

## 6. Jonny Greenwood  →  `public/images/characters/greenwood.jpg`
SCENE (evocation, NOT a facial likeness): A modern composer seen from a
three-quarter back angle in dim stage light, hunched over an ondes Martenot and a
modular synthesizer. Patch cables glow, waveforms and orchestral shapes rise from
the machine into the dark, warm amber amp glow. Absorbed, unshowy. Face turned
away or shadowed.
[+ STYLE BLOCK]

## 7. Euclid  →  `public/images/characters/euclid.jpg`
SCENE: An ancient Greek geometer kneeling at a slate in a dim stone colonnade,
drawing with a compass. Luminous geometry blooms from his hand: two intersecting
circles forming an equilateral triangle, a glowing tetrahedron and other solids
rising into the air. A scroll of the Elements at his side, warm classical light.
[+ STYLE BLOCK]

---

## Optional — About page (if you cast Émilie du Châtelet)
`public/images/characters/duchatelet.jpg`
SCENE: An 18th-century woman in a silk gown at a candlelit salon desk,
translating Newton's Principia. Glowing equations float above the page; a glass
prism throws a spectrum across her diagrams. Poised, brilliant, mid-thought.
[+ STYLE BLOCK]

---

## After you generate

Drop each JPG at its path and tell me. I swap that page's plate to the developing
wrapper (`/scenes/character.html?img=/images/characters/<name>.jpg`), which fades
it in from grayscale, seats it in the warm Atelier grade, and keeps the five
quotes and speech bubble exactly as they are. No other change needed.
