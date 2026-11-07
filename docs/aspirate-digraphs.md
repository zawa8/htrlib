# xi38 aspirate digraphs + the dual role of `h` / `v`

This documents how htrlib's xi38 handles the 10 aspirated stops of
Devanagari (and their ISCII-aligned counterparts), the special role of
`v` for ह, and the `x` for अ. Updated through Phase 1c.

See also:
- `CLAUDE_htrlib_api.md` — overall naming + pipeline spec
- `src/hsciistr/ux38.ts` — `xi38_to_ux38` implementation
- `src/hsciistr/xnglo_post.ts` — `xnglo_india_post` post-processor
- `src/hsciistr/dicts/u1_map.ts` — Devanagari codepoint → xi38 token
- `src/hsciistr/uL_to_xi38.ts` — uL → xi38 pipeline

---

## xnglo principle: power of x and h

Two letters carry the whole phonology:

- **`x`** = schwa marker / independent vowel अ
- **`h`** = aspiration mark (part of a digraph) — but NOT standalone ह (see below)
- **`v`** = the letter ह (v = ∀ in xh52.ttf, font-consistent)

Everything else is either a native consonant or a Latin vowel/mark.

---

## The 10 aspirate digraphs

There are 10 aspirated stops in Devanagari. Each is rendered in xi38 as
a **two-character digraph** (base consonant + `h`), and each renders in
`ux38` as **BASE CONSONANT (native) + LATIN `h`** — NOT a precomposed
single codepoint:

| xi38 digraph | base xi38 | ux38 output | Notes |
|--------------|-----------|-------------|-------|
| `kh` | `k` (क) | `कh` | aspirated ka |
| `gh` | `g` (ग) | `गh` | aspirated ga |
| `ch` | `c` (च) | `चh` | aspirated ca |
| `zh` | `z` (ज) | `जh` | aspirated ja — NOT `jh` (j isn't a xi38 token) |
| `th` | `t` (ट) | `टh` | aspirated retroflex ṭa |
| `dh` | `d` (ड) | `डh` | aspirated retroflex ḍa |
| `Th` | `T` (त) | `तh` | aspirated dental ta |
| `Dh` | `D` (द) | `दh` | aspirated dental da |
| `bh` | `b` (ब) | `बh` | aspirated ba |
| `sh` | `s` (स) | `सh` | sha — `s` (स), NOT `S` (श) |

### Conventions

- **`t`/`T` distinction:** lowercase `t` = retroflex ट, uppercase `T` =
  dental त. So `th` = ठ (aspirate of ट), `Th` = थ (aspirate of त).
  This is htrlib's own convention — differs from common Sanskrit
  transliteration.
- **`zh`, not `jh`:** ज is `z` (not `j`) in xi38, so its aspirate झ is
  `zh`. `j` isn't a real xi38 consonant token; it's only used internally
  in the font/CSV representation. Same for `q` (internal for ध).
  **`J Q j q` never appear in user-facing xi38.**
- **`sh` is phonetically motivated:** श (śa) is not linguistically
  aspirated, but `sh` is the standard English digraph for the ś sound.
  So `sh → सh` — the base is `स` (sa), NOT `श` (śa). This is because
  the xnglo principle treats aspiration `h` as a Latin mark on top of
  the plain consonant, not as a distinct letter.

### Precomposed forms NOT used

The precomposed aspirate codepoints (ख, घ, छ, झ, ठ, ढ, थ, ध, भ, श) are
**never emitted** by Phase 1c onwards. They're always rendered as
base + Latin `h`.

### Capital single-char aspirates REMOVED

`K G C Z B S` (capital single-char aspirates) are **NOT accepted** as
xi38 input. Users must use the digraphs (`kh`, `gh`, etc.). If a legacy
xi38 string contains `K`, it passes through unchanged (unrecognized).

This was a **user-rejected** design: "user will never accept K = ख".

---

## फ is special: `f → फ`

**फ is the exception.** Unlike other aspirates, फ is rendered as a
**precomposed single codepoint** (U+092B), not `प` + `h`:

| xi38 | ux38 | Why |
|------|------|-----|
| `f` | `फ` (precomposed U+092B) | English `f` (as in "fan", "phone") is a labiodental fricative /f/, not an aspirated stop /pʰ/. So the closest Devanagari letter is फ preserved as a single codepoint. |

**`ph`** (digraph) is **also accepted** as an alternate spelling of फ,
rendering as `पh` (base प + Latin h). Both are valid:

| input | ux38 output | Note |
|-------|-------------|------|
| `f` | `फ` | canonical (precomposed) |
| `ph` | `पh` | alternate (base + Latin h) |

`uL_to_xi38("फ")` emits `f` (not `ph`) — the canonical form.

---

## The `v` alias for ह

ह (ha) is rendered in xi38 as **`v`** (canonical, Phase 1c onwards):

```
uL:   ह
xi38: v
ux38: ह   (via singl_char_key_ofset.v = 0x39, native U+0939)
```

**Why `v`?** In the xnglo font (`zawa8/pff/**/x*52*.ttf`), the ASCII `v`
glyph is replaced by **∀** (universal quantifier), which visually reads
as ह. So `v` in xi38 is visually ∀ = ह when rendered in the font.

**Backward compatibility:** `H` (capital) and `h` (lowercase) are still
**accepted as input** to `xi38_to_ux38` for legacy xi38 strings — both
map to ह. But `uL_to_xi38` now emits `v` canonically, never `H`/`h`.

### Why `h` is NOT used for ह standalone

`h` is already used as the **aspiration mark** in digraphs (kh, gh, etc.).
If `h` also meant ह standalone, `कह` (k + h as two separate letters)
would be ambiguous with `ख` (k + h as aspiration). Using `v` for
standalone ह eliminates this ambiguity.

**Examples:**

| uL input | xi38 | ux38 |
|----------|------|------|
| `ह` | `v` | `ह` |
| `है` | `vye` | `हye` |
| `यह` | `yv` | `यह` |
| `जह` | `zv` | `जह` |
| `कह` | `kv` | `कह` |
| `अह` | `xv` | `अह` |
| `हल्दी` | `vlDi` | `हलदi` |

---

## The `A` / `x` alias for अ

The independent vowel अ has two spellings in xi38:

| xi38 | ux38 | Status |
|------|------|--------|
| `A` | `अ` | **legacy** (Phase 1a behavior) |
| `x` | `अ` | **canonical** (Phase 1b-a onwards) |

Both accepted as input. `uL_to_xi38` emits `x` (canonical).

**Examples:**

| uL input | xi38 | ux38 |
|----------|------|------|
| `अनार` | `xnar` | `अनaर` |
| `अह` | `xv` | `अह` |

### ॲ (candra-a) also folds to x

ॲ (U+0972, candra-a) also emits `x` (Phase 1b-a). Nukta/candra is lost,
base `अ` preserved — deliberate lossy, consistent with nukta dropping
policy.

---

## Lookup order in `xi38_to_ux38`

```
1. ri / li disambiguation  (context-sensitive)
2. digraf_base_ofset        (kh/gh/ch/zh/ph/th/dh/Th/Dh/bh/sh → base + Latin h)
3. singl_char_key_ofset     (single chars: k g c z ... + v/h/H + f etc)
4. passthrough              (anything unrecognized)
```

Digraphs are matched **before** single chars, so `kh → कh` never becomes
`k` + `h` = क + ह.

---

## Worked examples

All examples are `xi38_to_ux38(input, "hindi")`:

### Aspirate digraphs (base + Latin h)

```
"kh"    → "कh"
"gh"    → "गh"
"ch"    → "चh"
"zh"    → "जh"
"ph"    → "पh"
"th"    → "टh"
"dh"    → "डh"
"Th"    → "तh"
"Dh"    → "दh"
"bh"    → "बh"
"sh"    → "सh"
```

### फ special (precomposed)

```
"f"     → "फ"       (single codepoint U+092B)
```

### Capital singles removed

```
"K"     → "K"       (passthrough, not recognized)
"G"     → "G"
"C"     → "C"
"Z"     → "Z"
"B"     → "B"
"S"     → "S"
```

### ह (ha) via v / h / H

```
"v"     → "ह"       (canonical)
"h"     → "ह"       (legacy, backward compat)
"H"     → "ह"       (legacy, backward compat)
"yv"    → "यह"
"zv"    → "जह"
"kv"    → "कह"
```

### अ via x / A

```
"x"     → "अ"
"A"     → "अ"
"xnar"  → "अनaर"
"Anar"  → "अनaर"
```

### ri / li disambiguation

```
"zari"    → "जaरi"   (r promotes; preceded by vowel)
"snskriTi"→ "सनसकriतi"  (r stays Latin; preceded by consonant key k)
```

---

## What this means for testing

Tests in `test-parts/xi38-to-ux38.ts` cover:

1. **All 10 digraphs** (aspirate → base + Latin h)
2. **फ special** (`f` → `फ` precomposed, `ph` → `पh`)
3. **`v` canonical for ह**, `h`/`H` legacy accepted
4. **`x` canonical for अ**, `A` legacy accepted
5. **`ri`/`li` disambiguation**
6. **Unsupported scripts pass through** (only korean + truly unknown script names; all 10 Indic scripts are now supported as of Phase 1d)
7. **Capital singles passthrough** (`K`, `G`, etc.)

---

## Backward compatibility summary

| Old form (pre-1c) | New form (1c+) | Status |
|-------------------|----------------|--------|
| `K` → ख | removed | **K passthrough** |
| `kh` → ख (precomposed) | `kh` → कh | **base + Latin h** |
| `H` → ह | `v` → ह | **H legacy, v canonical** |
| `h` → ह | `v` → ह | **h legacy, v canonical** |
| `A` → अ | `x` → अ | **A legacy, x canonical** |
| `f` → फ | `f` → फ | **unchanged (special)** |

---

## Related files

- **Implementation:** `src/hsciistr/ux38.ts`
- **Post-processor:** `src/hsciistr/xnglo_post.ts`
- **Native → xi38:** `src/hsciistr/uL_to_xi38.ts`
- **Devanagari source data:** `src/hsciistr/dicts/u1_map.ts`
- **Test file:** `test-parts/xi38-to-ux38.ts`
- **Spec:** `CLAUDE_htrlib_api.md`

---

## Phase history

- **Phase 1a** (`199148a`): `xi38_to_xLS38` → `xi38_to_ux38` rename, 11 digraphs, h/v/x aliases, R fix
- **Phase 1b-a** (`9088bcc`): `u1_map.A → 'x'` (अ and ॲ both fold to x)
- **Phase 1c** (`bea27fb`): aspirates = base + Latin h, ह → v, ph → पh, K/G/C/Z/B/S removed, v→h rule removed