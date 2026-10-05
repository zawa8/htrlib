// xi38 -> xLS38 (semi-native, per SCRIPT -- "LS" because one script can
// represent more than one language, e.g. devanagari = hindi AND
// marathi; see CLAUDE_htrlib_api.md): the reverse direction from
// uten_to_xi38.ts's uL_to_xi38(). Here the input is already xi38 (fully
// romanized xnglo-english SCRIPT, e.g. "zari"), and the output replaces
// each recognized CONSONANT letter with the corresponding native
// character for the target script, leaving vowels (a i u e o), digits,
// spaces and punctuation as Latin -- e.g. hindi/devanagari:
// "zari" -> "जaरi".
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
// (punjabi), gujarati, oriya, kannada. bangla/telugu/malayalam/tamil are
// NOT supported here -- htrlib doesn't have verified per-script
// consonant data for them yet (u2/u6/u7/u9_map.ts are still
// devanagari-derived placeholders). sinhala also isn't included -- it
// isn't ISCII-aligned, so this offset table wouldn't apply; it would
// need its own mapping the way u10_map.ts's xi38 direction does.

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

function native_char(argLS: string, offset: number): string {
  return String.fromCodePoint(SCRIPT_BASE[argLS] + offset);
}

export function xi38_to_xLS38(input: string, argLS: string): string {
  if (!input) return '';
  if (!(argLS in SCRIPT_BASE)) {
    // Unsupported script (see file header SCOPE note) -- pass through
    // unchanged rather than silently emit wrong/incomplete output.
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
      const precededByConsonant = prev in SINGLE_CHAR_KEY_OFFSET;
      if (precededByConsonant) {
        out += two;
        i += 2;
        continue;
      }
      // else: fall through to normal single-char handling of 'r'/'l'
      // below, which promotes it; the 'i' gets picked up on the next
      // loop iteration as its own ordinary (non-key) passthrough char.
    }
    if (two in DIGRAPH_KEY_OFFSET) {
      out += native_char(argLS, DIGRAPH_KEY_OFFSET[two]);
      i += 2;
      continue;
    }
    const one = input[i];
    if (one in SINGLE_CHAR_KEY_OFFSET) {
      out += native_char(argLS, SINGLE_CHAR_KEY_OFFSET[one]);
    } else {
      out += one;
    }
    i += 1;
  }
  return out;
}
