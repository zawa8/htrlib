// htrlib/src/hsciistr/ux38.ts
// xi38 -> ux38 (semi-native, per SCRIPT -- "ux38" = unicode + xnglo + 38:
// the output keeps xi38's Latin vowels/marks (a i u e o h N) but renders
// every consonant in the target script's own native unicode -- e.g.
// hindi/devanagari: "zari" -> "जaरi". Renamed from xi38_to_xLS38 in
// Phase 1a; the "xLS38" name is retired in favor of "ux38".
//
// Phase 1c redesign (aspirates): all 10 aspirated stops are rendered as
// BASE CONSONANT + LATIN 'h', not as a precomposed single codepoint.
// This is consistent with the xnglo principle "power of x and h":
// x = schwa/अ, h = aspiration/ह. So:
//   kh -> कh, gh -> गh, ch -> चh, zh -> जh
//   th -> टh, dh -> डh, Th -> तh, Dh -> दh
//   bh -> बh, sh -> सh
// The precomposed forms (ख, घ, छ, झ, ठ, ढ, थ, ध, भ, श) are NOT used.
//
// फ is special: English `f` is unique (not /pʰ/), so फ is preserved
// precomposed -- `f` -> फ, not ph -> पh.
//
// H AND V (confirmed by repo owner): `H`, `h`, and `v` are three
// spellings of the SAME letter ह (0x39). After Phase 1c, uL_to_xi38
// emits `v` canonically (v = ∀ in xh52.ttf, font-consistent); `H` and
// `h` remain accepted as input for backward compatibility.
//
// SCOPE: only the 5 ISCII-aligned scripts with verified per-script data
// are CONFIRMED correct: hindi, gurmukhi, gujarati, oriya, kannada.
// bangla/tamil/telugu/malayalam/sinhala pass through unchanged.

const skript_base: Record<string, number> = {
  hindi:    0x0900, // Devanagari
  gurmukhi: 0x0a00, // Gurmukhi  (ISCII-aligned)
  gujarati: 0x0a80, // Gujarati  (ISCII-aligned)
  oriya:    0x0b00, // Oriya     (ISCII-aligned)
  kannada:  0x0c80, // Kannada   (ISCII-aligned)
};

// Non-aspirate, non-special single-char consonants (offsets from the
// Devanagari base). Aspirates are NO LONGER here -- they come from
// digraf_base_ofset below (base + Latin h).
const singl_char_key_ofset: Record<string, number> = {
  k: 0x15, g: 0x17,
  c: 0x1a, z: 0x1c,
  t: 0x1f, d: 0x21, T: 0x24, D: 0x26,
  n: 0x28, N: 0x28, // both collapse to न
  p: 0x2a, f: 0x2b, b: 0x2c, m: 0x2e,
  y: 0x2f, r: 0x30, l: 0x32, w: 0x35,
  s: 0x38, // स (not ष) is canonical for 's'
  A: 0x05, // अ (legacy spelling)
  x: 0x05, // अ (canonical, Phase 1b-a)
  H: 0x39, // ह (legacy capital, backward compat)
  h: 0x39, // ह (legacy lowercase, backward compat)
  v: 0x39, // ह (canonical Phase 1c, v = ∀)
  R: 0x5c, // ड़ (canonical target for ड़ nukta letter)
};

// Aspirate digraphs: base consonant offset + Latin 'h' suffix.
// Phase 1c: all 10 aspirates use this (no precomposed aspirate codepoints).
// फ is NOT here -- it's special (see singl_char_key_ofset.f = 0x2b).
const digraf_base_ofset: Record<string, number> = {
  kh: 0x15, // base क + h -> कh (NOT ख)
  gh: 0x17, // base ग + h -> गh
  ch: 0x1a, // base च + h -> चh
  zh: 0x1c, // base ज + h -> जh
  ph: 0x2a, // base प + h  ← NEW (like "phone")
  th: 0x1f, // base ट + h -> टh
  dh: 0x21, // base ड + h -> डh
  Th: 0x24, // base त + h -> तh
  Dh: 0x26, // base द + h -> दh
  bh: 0x2c, // base ब + h -> बh
  sh: 0x38, // base स + h -> सh (NOT श)
};

function native_char(argLS: string, offset: number): string {
  return String.fromCodePoint(skript_base[argLS] + offset);
}

export function xi38_to_ux38(input: string, argLS: string): string {
  if (!input) return '';
  if (!(argLS in skript_base)) {
    return input;
  }
  let out = '';
  let i = 0;
  while (i < input.length) {
    const two = input.slice(i, i + 2);
    // "ri"/"li" disambiguation (unchanged from Phase 1a)
    if (two === 'ri' || two === 'li') {
      const prev = i > 0 ? input[i - 1] : '';
      const precededByConsonant = prev in singl_char_key_ofset;
      if (precededByConsonant) {
        out += two;
        i += 2;
        continue;
      }
    }
    if (two in digraf_base_ofset) {
      out += native_char(argLS, digraf_base_ofset[two]) + 'h';
      i += 2;
      continue;
    }
    const one = input[i];
    if (one in singl_char_key_ofset) {
      out += native_char(argLS, singl_char_key_ofset[one]);
    } else {
      out += one;
    }
    i += 1;
  }
  return out;
}

// Backward-compatible alias
export { xi38_to_ux38 as xi38_to_xLS38 };
