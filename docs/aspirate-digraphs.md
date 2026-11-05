# xi38 aspirate digraphs + the dual role of `h`

This documents how htrlib's xi38 handles the 11 aspirated stops of
Devanagari (and their ISCII-aligned counterparts), and the specific
ambiguity of `h` (aspiration vs. letter ह).

See also:
- `CLAUDE_htrlib_api.md` — overall naming + pipeline spec
- `src/hsciistr/ux38.ts` — `xi38_to_ux38` implementation
- `src/hsciistr/xnglo_post.ts` — `xnglo_india_post` post-processor
- `src/hsciistr/dicts/u1_map.ts` — Devanagari codepoint → xi38 token

---

## The 11 aspirate digraphs

There are 11 aspirated stops in Devanagari. Each is rendered in xi38 as a
**two-character digraph** (base consonant + `h`), and each maps to a
**single precomposed** native codepoint in `ux38` output (NOT base +
Latin-`h`):

| xi38 digraph | Devanagari | Offset | Notes |
|--------------|-----------|--------|-------|
| `kh` | ख | `0x16` | aspirated ka |
| `gh` | घ | `0x18` | aspirated ga |
| `ch` | छ | `0x1b` | aspirated ca |
| `zh` | झ | `0x1d` | aspirated ja — **NOT `jh`** (see below) |
| `ph` | फ | `0x2b` | aspirated pa (alias for `f`) |
| `bh` | भ | `0x2d` | aspirated ba |
| `sh` | श | `0x36` | sha — not strictly aspirated, but `sh` = श phonetically |
| `th` | ठ | `0x20` | aspirated retroflex ṭa |
| `dh` | ढ | `0x22` | aspirated retroflex ḍa |
| `Th` | थ | `0x25` | aspirated dental ta |
| `Dh` | ध | `0x27` | aspirated dental da |

### Conventions

- **`t`/`T` distinction:** lowercase `t` = retroflex ट, uppercase `T` =
  dental त. So `th` = ठ (retroflex aspirate) and `Th` = थ (dental
  aspirate). This is htrlib's own convention — it differs from common
  Sanskrit transliteration (which uses `ṭh` for retroflex and `th` for
  dental). See `u1_map.ts` for the source of truth.
- **`zh`, not `jh`:** ज is `z` (not `j`) in xi38, so its aspirate झ is
  `zh` (not `jh`). `j` isn't a real xi38 consonant token — it's only
  used internally in the font/CSV representation of थ. Same for `q`
  (internal for ध). **`J Q j q` never appear in user-facing xi38.**
- **`ph` is an alias for `f`:** both map to फ. `f` is the canonical
  single-char form (from `u1_map.ts`); `ph` is accepted as an
  alternate spelling for consistency with the other 10 digraphs.
- **`sh` is phonetically motivated:** श is not an *aspirated* consonant
  in the linguistic sense. But `sh` is the standard English digraph for
  the ś sound, and `s` (स) has no aspirated counterpart, so `sh` = श
  is treated as a digraph for symmetry. **Note:** `Sh` (capital-S + h)
  is not a distinct digraph — श is `S` (single capital) or `sh`
  (lowercase digraph).

### Lookup order

Digraphs are matched **before** single characters in `xi38_to_ux38`'s
main loop:

```
if (two in digraf_key_ofset) { emit; i += 2; continue; }
const one = input[i];
if (one in singl_char_key_ofset) { emit; i += 1; continue; }
```

So `kh` → ख (digraph), never `k`+`h` = क+ह. The only way to write
क+ह (two separate letters) is `kv` (see next section).

---

## The dual role of `h` in xi38

`h` has **two distinct meanings** depending on context:

### Meaning 1 — aspiration (part of a digraph)

When `h` **immediately follows one of the 11 aspiratable consonants**
(`k g c z t d T D p b s`), it's the aspiration half of a digraph:

```
k+h → kh → ख        g+h → gh → घ        c+h → ch → छ
z+h → zh → झ        t+h → th → ठ        d+h → dh → ढ
T+h → Th → थ        D+h → Dh → ध        p+h → ph → फ
b+h → bh → भ        s+h → sh → श
```

**`h` after any of these 11 characters is NEVER the letter ह.**

### Meaning 2 — letter ह (standalone)

When `h` appears in any other context — after a vowel, after a
consonant that has no aspirate form, or at the start of a string — it
IS the letter ह (offset `0x39`):

```
y+h → yh → य + ह = यह
r+h → rh → र + ह = रह
l+h → lh → ल + ह = लह
w+h → wh → व + ह = वह
a+h → ah → a + ह = aह (vowel a stays Latin, ह goes native)
h (start) → ह
n+h → nh → न + ह = नह
m+h → mh → म + ह = मह
```

**`h` after any other character (or at start) is ALWAYS the letter ह.**

### The 11 aspiratable consonants

```
k g c z t d T D p b s
```

That's 11 characters. All 11 have an aspirated counterpart in
Devanagari/ISCII.

Consonants that do NOT have an aspirate form — `h` following them is
the letter ह, not aspiration:

```
n N y r l w H R m f B S  (and A x for vowels)
```

For these, `h` following them → letter ह. E.g. `mh` = मह, `nh` = नह,
`fh` = फह (f is already फ, no further aspiration).

⚠️ **`f` is excluded** — `f` is already फ (aspirated p), so `fh` would
be फ+ह = फह, not a double aspirate. `f` is not in the aspiratable set
for this reason.

⚠️ **`B` is excluded** — `B` is भ (aspirated b), so `Bh` = भ+ह = भह,
not double aspirate. `B` is not in the aspiratable set.

⚠️ **`S` is excluded** — `S` is श (sha), no aspirate form. `Sh` =
श+ह = शह.

---

## The `v` alias for ह

Because `h` is ambiguous (see above), `uL_to_xi38` emits **`v`** (not
`h`) for ह when the ह follows one of the 11 aspiratable consonants:

```
क + ह (uL) → k + v → "kv" (xi38)
क + ह (uL) → ख?  NO — that would be "kh" which means ख
```

The disambiguation rule lives in `xnglo_post.ts`:

```
.replace(/([kgcztdTDpbs])[Hh]/g, "$1v")
```

After this rule, `kv`/`gv`/`cv`/`zv`/`tv`/`dv`/`Tv`/`Dv`/`pv`/`bv`/`sv`
all mean "consonant + letter ह" (two separate letters), never a digraph.

The reverse rule (in the same file) ensures `v` survives after those
consonants:

```
.replace(/([^kgcztdjqTDpbsR])v/g, "$1h")
```

So `kv` stays `kv` (k is in the excluded set → `v` not rewritten to
`h`). But `av` → `ah` (a not in excluded set → `v` becomes `h`) — that's
fine, because `ah` after a vowel has no digraph ambiguity (a is not an
aspiratable consonant).

### The ∀ font connection

In the xnglo font (`zawa8/pff/**/x*52*.ttf`), the ASCII `v` glyph is
replaced by **∀** (universal quantifier), which visually resembles both
व and ह. The xnglo convention assigns ∀ to **ह** (not व). व is `w`.

So users reading xi38 in a font-aware viewer see:

```
"kv" → rendered as "k∀" → visually "कह"
"kh" → rendered as composite glyph → visually "ख"
```

The glyph for ∀ (ह) is distinct from the glyph for the composite ख.

---

## The `A` / `x` alias for अ

Parallel to `h`/`v` for ह, the independent vowel अ has two spellings:

| xi38 | ux38 | Status |
|------|------|--------|
| `A` | अ | **legacy** — what `uL_to_xi38` emits today |
| `x` | अ | **canonical** — what `uL_to_xi38` will emit after Phase 1b |

Both are accepted as input to `xi38_to_ux38`. Examples:

```
"Anar" → अनaर  (A → अ)
"xnar" → अनaर  (x → अ)
"Ah"   → अह    (A → अ, h → ह)
"xh"   → अह    (x → अ, h → ह)
```

**Why change `A` → `x`?** Because the xnglo font's ∀-based design favors
lowercase throughout for the vowel/mark family (`a i u e o h`). `x` is
the natural lowercase companion to `h`.

---

## Worked examples

All examples are `xi38_to_ux38(input, "hindi")`:

### Aspirate digraphs

```
"kh"    → "ख"
"gh"    → "घ"
"ch"    → "छ"
"zh"    → "झ"
"ph"    → "फ"
"bh"    → "भ"
"sh"    → "श"
"th"    → "ठ"
"dh"    → "ढ"
"Th"    → "थ"
"Dh"    → "ध"
"K"     → "ख"       (single-char alias for kh)
"f"     → "फ"       (single-char alias for ph)
```

### `h` as letter ह

```
"yh"    → "यह"      (y → य, h → ह)
"yv"    → "यह"      (y → य, v → ह)
"yH"    → "यह"      (y → य, H → ह, legacy)
"rh"    → "रह"
"lh"    → "लह"
"wh"    → "वह"
"ah"    → "aह"      (a stays Latin, h → ह)
"h"     → "ह"       (standalone at start)
"nh"    → "नह"
"mh"    → "मह"
```

### `h`/`v` after aspiratable consonant (disambiguated)

```
"kv"    → "कह"      (k → क, v → ह; NOT ख)
"gv"    → "गह"      (NOT घ)
"cv"    → "चह"      (NOT छ)
"zv"    → "जह"      (z → ज via 0x1c; NOT झ)
"tv"    → "टह"      (NOT ठ)
"dv"    → "डह"      (NOT ढ)
"Tv"    → "तह"      (NOT थ)
"Dv"    → "दह"      (NOT ध)
"pv"    → "पह"      (NOT फ)
"bv"    → "बह"      (NOT भ)
"sv"    → "सह"      (NOT श)
```

⚠ **`zv` note:** `z` = ज (`0x1c`), not ज़ (`0x5b`). ज़ is the nukta
form, which is dropped by design in ux38 (see "KNOWN LOSSY" in
`ux38.ts`). So `zv` → जह, not ज़ह. **If you want ज़ह specifically, the
nukta needs to be preserved** — a separate design question, not in
scope for Phase 1a.

### The `A`/`x` vowel

```
"Anar"  → "अनaर"    (legacy A)
"xnar"  → "अनaर"    (canonical x)
"Ah"    → "अह"
"xh"    → "अह"
```

### The `ri`/`li` disambiguation

```
"zari"    → "जaरi"   (z→ज, a passthrough, r→र, i passthrough)
"snskriTi"→ "सनसकriतi"  (r stays Latin because preceded by k, a consonant key)
```

---

## What this means for testing

Tests in `test-parts/xi38-to-ux38.ts` should cover:

1. **All 11 digraphs** (aspirate → precomposed native)
2. **`h` as letter ह** (after vowels, after non-aspiratable consonants, at start)
3. **`v` disambiguated** after each of the 11 aspiratable consonants
4. **`A`/`x` both → अ**
5. **`ri`/`li` disambiguation** (both readings)
6. **Unsupported scripts pass through** (bangla, tamil, sinhala, korean)

---

## Backward compatibility summary

| Old form | New form | Status |
|----------|----------|--------|
| `xi38_to_xLS38` function | `xi38_to_ux38` | Old name kept as alias export |
| `xi38_to_xLS38.ts` file | `ux38.ts` | Old file deleted |
| `xhs38` slot name | `xhs38` slot name | **Unchanged** in Phase 1a (slot rename is separate) |
| `A` → अ | `x` → अ | Both work; `x` is canonical going forward |
| `H` → ह | `h` → ह | Both work; `h` is canonical going forward |

---

## Related files

- **Implementation:** `src/hsciistr/ux38.ts`
- **Disambiguation rules:** `src/hsciistr/xnglo_post.ts`
- **Devanagari source data:** `src/hsciistr/dicts/u1_map.ts`
- **Test file:** `test-parts/xi38-to-ux38.ts` (Phase 1a will create this)
- **Spec:** `CLAUDE_htrlib_api.md`