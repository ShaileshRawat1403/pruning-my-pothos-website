# Shelf Resource Cover Style Guide

This guide defines the default visual direction for covers used in `shelf/shared-resources`.

## Scope
- Applies to covers referenced by `src/content/shelf/shared-resources/*.md`.
- Covers are stored in `public/covers/shelf/`.
- Preferred format is SVG for crisp rendering and easy editing.

## Design intent
- Editorial and calm, not promotional.
- Structural and conceptual, not literal UI screenshots.
- Clear hierarchy so cards stay legible on desktop and mobile.

## Required rules
- Use a unique cover for every resource entry.
- Use file names like `shared-<slug>.svg`.
- Keep title text short:
  - Line 1: resource/topic title
  - Line 2: compact subtitle (optional but preferred)
- Keep one focal motif per cover:
  - Examples: network nodes, flow lines, block systems, loop marks, charts.
- Limit palette to 2-4 core colors plus neutrals.
- Maintain strong contrast between foreground text and background.
- Avoid noisy detail that hurts readability in small card previews.

## Composition pattern
- 16:9 canvas (e.g. `1200x675`).
- Header micro-label (optional): `Shared Resource` or `Video Resource`.
- Main title in the middle/lower half.
- Subtitle near title, smaller and muted.
- Background motif should support text, not compete with it.

## Do / Do not
- Do use simple geometric systems language.
- Do keep whitespace intentional.
- Do ensure title remains readable at small size.
- Do not reuse placeholder art across multiple entries.
- Do not rely on long paragraphs of text inside the image.
- Do not use heavy effects, glow stacks, or dense gradients.

## Accessibility checks
- Verify readable contrast for title/subtitle.
- Include `<title>` and `<desc>` in SVG.
- Keep semantic, concise alt text in card/detail image usage.

## Implementation checklist (per new resource)
1. Create `public/covers/shelf/shared-<slug>.svg`.
2. Add `coverUrl` to the resource frontmatter.
3. If PDF, add `pdfUrl` and optional `resourceHighlights`.
4. If video, add `videoUrl`.
5. Run `npm run build` and check:
   - `/shelf/shared-resources`
   - the resource detail page
   - mobile card readability.

