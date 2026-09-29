// xi38 -> ui38: the reverse direction from u10_to_xi52.ts's to_xi38/to_u38
// (which both start from NATIVE-script input). Here the input is already
// xi38 (fully romanized, e.g. "snskriTi"), and the output replaces each
// recognized CONSONANT letter with the corresponding native character
// for the target script, leaving vowels (a i u e o), digits, spaces and
// punctuation as Latin -- e.g. hindi: "snskriTi" -> "सनसकriतi".
//
// Modeled on zawa8/hsciistr's i2l() (a flat positional lookup: a fixed
// "hinchars" key string + one native-character string per language, same
// index = same consonant) -- but keyed against htrlib's OWN xi38 scheme
// (see dicts/u1_map.ts), which differs from that older repo's scheme
// (e.g. htrlib's aspirated stops are 2-letter digraphs th/dh/Th/Dh;
// zawa8/hsciistr uses single letters T/D/J/Q for some of the same
// sounds). Confirmed with the repo owner: both "n" and "N" collapse to
// the single dental न (real xi38 output uses lowercase n for ञ/ण/न and
// uppercase N for both anusvara and ङ depending on context --
// unrecoverable without the original native text, so this picks one
// canonical target rather than guessing).
//
// SCOPE: only the 5 scripts htrlib has actual verified per-script data
// for so far (see u1/u3/u4/u5/u8_map.ts) -- hindi (devanagari), gurmukhi
// (punjabi), gujarati, oriya, kannada. All 5 are ISCII-aligned with
// devanagari (same consonant at the same block-relative offset), so one
// offset table drives all 5. bangla/telugu/malayalam/tamil/korean/
// russian are NOT supported here -- htrlib doesn't have verified
// per-script consonant data for the Indic ones yet (u2/u6/u7/u9_map.ts
// are still devanagari-derived placeholders), and korean/russian aren't
// Indic scripts at all (no ISCII-offset table to reuse). sinhala also
// isn't included -- it isn't ISCII-aligned, so this offset table
// wouldn't apply; it would need its own mapping the way u10_map.ts's
// xi38 direction does.

const SCRIPT_BASE: Record<string, number> = {
  hindi: 0x0900,
  gurmukhi: 0x0a00,
  gujarati: 0x0a80,
  oriya: 0x0b00,
  kannada: 0x0c80,
};

// xi38 token -> devanagari-relative offset (0x00-0x7f) of the consonant
// it represents. Multi-character tokens (the aspirated digraphs) are
// listed separately and matched greedily (longest first) so e.g. "th"
// isn't read as bare "t" followed by a stray "h".
const SINGLE_CHAR_KEY_OFFSET: Record<string, number> = {
  k: 0x15, K: 0x16, g: 0x17, G: 0x18,
  c: 0x1a, C: 0x1b, z: 0x1c, Z: 0x1d,
  t: 0x1f, d: 0x21, T: 0x24, D: 0x26,
  n: 0x28, N: 0x28, // both collapse to न -- see file header note
  p: 0x2a, f: 0x2b, b: 0x2c, B: 0x2d, m: 0x2e,
  y: 0x2f, r: 0x30, l: 0x32, w: 0x35,
  S: 0x36, s: 0x38, // स (not ष) is the canonical target for 's'
  H: 0x39,
  A: 0x05, // अ
  R: 0x5c, // ड़ (canonical target for the ड़/ढ़ nukta pair)
};

const DIGRAPH_KEY_OFFSET: Record<string, number> = {
  th: 0x20, dh: 0x22, Th: 0x25, Dh: 0x27,
};

function native_char(script: string, offset: number): string {
  return String.fromCodePoint(SCRIPT_BASE[script] + offset);
}

export function xi38_to_ui38(input: string, script: string): string {
  if (!input) return '';
  if (!(script in SCRIPT_BASE)) {
    // Unsupported script (see file header SCOPE note) -- pass through
    // unchanged rather than silently emit wrong/incomplete output.
    return input;
  }
  let out = '';
  let i = 0;
  while (i < input.length) {
    const two = input.slice(i, i + 2);
    // "ri"/"li" are also xi38's tokens for the vocalic-R/L MATRAS (u1_map
    // offsets 0x43/0x44ish) -- matras stay Latin under u38's "letters
    // native, marks convert" rule (see to_u38() in u10_to_xi52.ts), so
    // this leaves "ri"/"li" untouched rather than reading them as
    // consonant r/l followed by the vowel i. Confirmed by the repo
    // owner's example: संस्कृति's xi38 "snskriTi" -> ui38 "सनसकriतi",
    // "ri" unconverted. This is a genuine ambiguity in xi38's own output
    // (a real consonant र/ल directly followed by an इ letter -- rather
    // than the ऋ/ऌ matra -- would look identical here); this picks the
    // matra reading as the common case rather than guessing per-word.
    if (two === 'ri' || two === 'li') {
      out += two;
      i += 2;
      continue;
    }
    if (two in DIGRAPH_KEY_OFFSET) {
      out += native_char(script, DIGRAPH_KEY_OFFSET[two]);
      i += 2;
      continue;
    }
    const one = input[i];
    if (one in SINGLE_CHAR_KEY_OFFSET) {
      out += native_char(script, SINGLE_CHAR_KEY_OFFSET[one]);
    } else {
      out += one;
    }
    i += 1;
  }
  return out;
}
