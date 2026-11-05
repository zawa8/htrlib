// htrlib/src/hsciistr/ux38.ts
// xi38 -> ux38 (semi-native, per SCRIPT -- "ux38" = unicode + xnglo + 38:
// the output keeps xi38's Latin vowels/marks (a i u e o h N) but renders
// every consonant in the target script's own native unicode -- e.g.
// hindi/devanagari: "zari" -> "जaरi". Renamed from xi38_to_xLS38; the
// "xLS38" name is retired in favor of "ux38" (all-lowercase, consistent
// with the other xi38-family names like xe38, xiL38).
//
// Reverse direction from uL_to_xi38.ts's uL_to_xi38(). Here the input is
// already xi38 (fully romanized xnglo-english SCRIPT, e.g. "zari"), and
// the output replaces each recognized CONSONANT letter with the
// corresponding native character for the target script, leaving vowels
// (a i u e o), digits, spaces and punctuation as Latin.
//
// Modeled on zawa8/hsciistr's i2l() (a flat positional lookup: a fixed
// "hinchars" key string + one native-character string per language, same
// index = same consonant) -- but keyed against htrlib's OWN xi38 scheme
// (see dicts/u1_map.ts). Confirmed with the repo owner: both "n" and "N"
// collapse to the single dental न (real xi38 output uses lowercase n for
// ञ/ण/न and uppercase N for both anusvara and ङ depending on context --
// unrecoverable without the original native text, so this picks one
// canonical target rather than guessing).
//
// ASPIRATE DIGRAPHS (confirmed by repo owner): there are 11 aspirated
// stops in Devanagari, each rendered as ONE PRECOMPOSED native letter,
// NOT base+Latin-h:
//   kh -> ख (0x16), gh -> घ (0x18), ch -> छ (0x1b), zh -> झ (0x1d)
//   ph -> फ (0x2b), bh -> भ (0x2d), sh -> श (0x36)
//   th -> ठ (0x20), dh -> ढ (0x22), Th -> थ (0x25), Dh -> ध (0x27)
// So `kh` = `K` = ख, NOT कह. Digraphs are matched BEFORE single chars,
// so `kh` never falls through to `k`+`h`. Note: `zh` (not `jh`) is the
// correct digraph for झ -- `j` isn't a real xi38 token, `z` is.
//
// H AND V (confirmed by repo owner): `H`, `h`, and `v` are three
// spellings of the SAME letter ह (0x39):
//   - `H` (capital)   = ह  (legacy; uL_to_xi38 may emit this pre-Phase-1b)
//   - `h` (lowercase) = ह  when NOT part of an aspirate digraph (see above)
//   - `v` (lowercase) = ह  in the xnglo font (zawa8/pff/**/x*52*.ttf),
//                         the ASCII `v` glyph is replaced by ∀ which
//                         visually reads as both व and ह; xnglo
//                         convention assigns ∀ to ह (व is `w`, not `v`).
//                         `v` is also what uL_to_xi38 emits for ह after
//                         an aspiratable consonant (k/g/c/z/t/d/T/D/p/b/s)
//                         to avoid the digraph reading -- e.g. कह -> "kv"
//                         (NOT "kh", which would read as ख).
//
// TOKEN MODEL (confirmed by repo owner):
// - PUBLIC / user-facing xi38 tokens: `kh gh ch zh ph bh sh th dh Th Dh`
//   (digraphs) + `A`/`x` for अ (both accepted; `x` is canonical going
//   forward, `A` is legacy) + `h`/`v`/`H` for ह + all other single-char
//   consonants. These are what uL_to_xi38 emits, what tests use, and what
//   callers pass in.
// - INTERNAL / font-only tokens: `J Q j q` (single chars) are NOT accepted
//   as input to this function and NEVER appear in output. If a caller
//   passes `J Q j q` here, they pass through as unrecognized Latin
//   characters (a signal that the caller is using the wrong token set).
//
// KNOWN LOSSY (by design, consistent with the n/N collapse above): the
// nukta consonants all collapse onto their base consonant here, because
// xi38 has only one token per base sound and the nukta sign has no xi38
// representation. Specifically:
//   क़ ख़ ग़ ज़ फ़ य़  ->  क  ख  ग  ज  फ  य   (nukta dropped)
//   ड़  ->  'R'  ->  ड़   (preserved, R = 0x5c is ड़'s own precomposed offset)
//   ढ़  ->  'dh' ->  ढ    (nukta dropped: 'dh' == the plain ढ digraph)
// So uL("ढ़") -> xi38("dh") -> ux38("ढ") is expected, not a bug. If nukta
// preservation is ever required end-to-end, xi38 needs a distinct token
// for ढ़ (a CLAUDE_htrlib_api.md spec change, not a code fix here).
//
// SCOPE (per CLAUDE_htrlib_api.md, unchanged for now): only the 5
// ISCII-aligned scripts with verified per-script data are CONFIRMED
// correct: hindi (devanagari), gurmukhi (punjabi), gujarati, oriya,
// kannada. bangla/tamil/telugu/malayalam do NOT have verified per-script
// letter data yet (their uN_map.ts are still devanagari-derived
// placeholders), and sinhala is not ISCII-aligned at all. For all of
// those not-yet-supported languages this function passes the xi38-stage
// text through unchanged rather than guess.
//
// NAMING NOTE: `xnglo` is the project's house spelling of "Anglo" (the
// `x` there is just the first letter of the house spelling, NOT the
// schwa marker). `x` (bare, from xnglo_post.ts / e52_tu_e23.ts) is the
// schwa marker. `A`/`x` (uppercase A or lowercase x) is the independent
// vowel letter अ/ਅ/அ etc -- see singl_char_key_ofset below. All three
// are distinct.

// NOTE: `skript` (not `script`) is the project's house spelling -- used
// throughout htrlib to avoid any parser/keyword collision with the word
// "script" (e.g. HTML <script>, TS build terminology) and to match the
// existing snake_case naming convention in dicts/*.ts.
const skript_base: Record<string, number> = {
  hindi:    0x0900, // Devanagari
  gurmukhi: 0x0a00, // Gurmukhi  (ISCII-aligned)
  gujarati: 0x0a80, // Gujarati  (ISCII-aligned)
  oriya:    0x0b00, // Oriya     (ISCII-aligned)
  kannada:  0x0c80, // Kannada   (ISCII-aligned)
  // NOT included (see SCOPE in header):
  //   bangla   0x0980,  -- unverified placeholder map
  //   tamil    0x0b80,  -- unverified placeholder map
  //   telugu   0x0c00,  -- unverified placeholder map
  //   malayalam 0x0d00, -- unverified placeholder map
  //   sinhala  0x0d80,  -- not ISCII-aligned; needs its own table
};

// xi38 token -> devanagari-relative offset (0x00-0x7f) of the consonant
// it represents. Multi-character aspirate digraphs are listed separately
// in digraf_key_ofset below and matched greedily (longest first) so e.g.
// "kh" isn't read as bare "k" followed by a stray "h".
//
// `A` and `x` both -> अ (0x05): `A` is the legacy spelling, `x` is the
// canonical going forward (Phase 1b will make uL_to_xi38 emit `x`).
// `H`, `h`, `v` all -> ह (0x39): see H AND V in header.
const singl_char_key_ofset: Record<string, number> = {
  k: 0x15, K: 0x16, g: 0x17, G: 0x18,
  c: 0x1a, C: 0x1b, z: 0x1c, Z: 0x1d,
  t: 0x1f, d: 0x21, T: 0x24, D: 0x26,
  n: 0x28, N: 0x28, // both collapse to न -- see file header note
  p: 0x2a, f: 0x2b, b: 0x2c, B: 0x2d, m: 0x2e,
  y: 0x2f, r: 0x30, l: 0x32, w: 0x35,
  S: 0x36, s: 0x38, // स (not ष) is the canonical target for 's'
  A: 0x05, // अ (legacy spelling; see header)
  x: 0x05, // अ (canonical spelling going forward)
  H: 0x39, // ह (legacy spelling)
  h: 0x39, // ह (canonical, when not part of an aspirate digraph)
  v: 0x39, // ह (xnglo font ∀; also disambiguator after aspiratable consonant)
  R: 0x5c, // ड़ (canonical target for the ड़ nukta letter; note ढ़ -> 'dh' -> ढ, see header)
};

// Aspirate digraphs -> devanagari-relative offset of the PRECOMPOSED
// native aspirate letter. Single codepoints, not base+h. Matched before
// single-char lookup, so `kh` -> ख never becomes क+ह. All 11 aspirated
// stops that have a distinct precomposed codepoint in ISCII scripts.
// Internal/font-only tokens `J Q j q` are NOT listed here on purpose.
const digraf_key_ofset: Record<string, number> = {
  kh: 0x16, gh: 0x18, ch: 0x1b, zh: 0x1d,
  ph: 0x2b, bh: 0x2d, sh: 0x36,
  th: 0x20, dh: 0x22, Th: 0x25, Dh: 0x27,
};

function native_char(argLS: string, offset: number): string {
  return String.fromCodePoint(skript_base[argLS] + offset);
}

export function xi38_to_ux38(input: string, argLS: string): string {
  if (!input) return '';
  if (!(argLS in skript_base)) {
    // Unsupported script (see SCOPE in header) -- pass through unchanged
    // rather than silently emit wrong/incomplete output.
    return input;
  }
  let out = '';
  let i = 0;
  while (i < input.length) {
    const two = input.slice(i, i + 2);
    // "ri"/"li" are AMBIGUOUS in xi38's flat output: they're also the
    // tokens for the vocalic-R/L MATRAS (u1_map offsets 0x43/0x62ish),
    // which should stay fully Latin (matras do, under "letters native,
    // marks convert") -- but "r"/"l" immediately followed by "i" can
    // just as easily be a REAL र/ल CONSONANT followed by its own
    // separate ी/ि matra (an extremely common pattern -- जारी, तारीख,
    // सारी, etc), where र/ल SHOULD promote to native and the "i" is its
    // own ordinary bare matra, unrelated to the "r"/"l" before it.
    //
    // Disambiguated by what precedes the "r"/"l": if it's a
    // CONSONANT-KEY letter (meaning "r"/"l" is continuing THAT
    // consonant's own vowel sound with no break -- i.e. genuinely the
    // vocalic matra attached to it, e.g. क+ृ = "kri"), the whole "ri"/
    // "li" stays Latin. If it's anything else (a vowel, start of
    // string, punctuation/space) -- meaning "r"/"l" is starting a NEW
    // syllable of its own -- it's a real consonant and promotes
    // normally, with "i" handled separately as an ordinary bare matra.
    // Confirmed by the repo owner: संस्कृति's xi38 "snskriTi" -> xhs38
    // "सनसकriति" [ri stays Latin, preceded by consonant-key 'k'], but
    // जारी's xi38 "zari" -> xhs38 "जaरi" [र promotes, preceded by
    // vowel 'a'].
    if (two === 'ri' || two === 'li') {
      const prev = i > 0 ? input[i - 1] : '';
      const precededByConsonant = prev in singl_char_key_ofset;
      if (precededByConsonant) {
        out += two;
        i += 2;
        continue;
      }
      // else: fall through to normal single-char handling of 'r'/'l'
      // below, which promotes it; the 'i' gets picked up on the next
      // loop iteration as its own ordinary (non-key) passthrough char.
    }
    if (two in digraf_key_ofset) {
      out += native_char(argLS, digraf_key_ofset[two]);
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

// Backward-compatible alias -- the function was renamed xi38_to_xLS38
// -> xi38_to_ux38 (see CLAUDE_htrlib_api.md); kept so any external code
// still importing the old name doesn't break outright. Prefer
// xi38_to_ux38 in new code.
export { xi38_to_ux38 as xi38_to_xLS38 };