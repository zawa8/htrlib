import { U1_MAP } from './dicts/u1_map';
import { U2_MAP } from './dicts/u2_map';
import { U3_MAP } from './dicts/u3_map';
import { U4_MAP } from './dicts/u4_map';
import { U5_MAP } from './dicts/u5_map';
import { U6_MAP } from './dicts/u6_map';
import { U7_MAP } from './dicts/u7_map';
import { U8_MAP } from './dicts/u8_map';
import { U9_MAP } from './dicts/u9_map';
import { U10_MAP } from './dicts/u10_map';
import { xnglo_india_post } from './xnglo_post';

// li -> which per-script map, one block (0x80 codepoints) each:
// 0x12 devanagari(u1) 0x13 bengali(u2) 0x14 gurmukhi(u3) 0x15 gujarati(u4)
// 0x16 oriya(u5) 0x17 tamil(u6) 0x18 telugu(u7) 0x19 kannada(u8)
// 0x1a malayalam(u9) 0x1b sinhala(u10, the only one actually verified
// against its own script's Unicode chart so far -- see u10_map.ts's note).
const LI_TO_MAP: Record<number, typeof U1_MAP> = {
  0x12: U1_MAP, 0x13: U2_MAP, 0x14: U3_MAP, 0x15: U4_MAP, 0x16: U5_MAP,
  0x17: U6_MAP, 0x18: U7_MAP, 0x19: U8_MAP, 0x1a: U9_MAP,
};

export function uten2xi38(input: string): string {
  if (!input) return '';
  // Some input methods produce nukta consonants (ड़ ढ़ क़ ख़ ग़ ज़ फ़ य़) as a
  // decomposed base-letter + combining nukta sign (U+093C) instead of the
  // single precomposed codepoint. These aren't a canonical decomposition
  // in the Unicode sense, so String.prototype.normalize('NFC') does NOT
  // compose them -- has to be done by hand. U9_MAP only has an entry for
  // the precomposed form, so decomposed input silently fell through as
  // the plain base consonant (e.g. ढ़ read as just ढ).
  // An independent vowel letter directly followed by a dependent matra
  // (e.g. ए immediately before ै in "गएैसा") is malformed -- a matra can
  // only attach to a consonant, never to another vowel letter -- and in
  // practice happens when someone types an extra vowel letter by mistake
  // right before the matra they meant (गएैसा for गैसा). Drop the spurious
  // independent vowel and keep the matra.
  input = input.replace(/[\u0904-\u0914][\u093e-\u094c]/g, (m) => m[1]);
  let s = input
    .replace(/\u0915\u093c/g, '\u0958') // क़
    .replace(/\u0916\u093c/g, '\u0959') // ख़
    .replace(/\u0917\u093c/g, '\u095a') // ग़
    .replace(/\u091c\u093c/g, '\u095b') // ज़
    .replace(/\u0921\u093c/g, '\u095c') // ड़
    .replace(/\u0922\u093c/g, '\u095d') // ढ़
    .replace(/\u092b\u093c/g, '\u095e') // फ़
    .replace(/\u092f\u093c/g, '\u095f'); // य़
  s = s
    .replace(/([\b\s])क्ष/g, '$1s').replace(/^क्ष/g, 's')
    .replace(/ज्ञ/g, 'gy');

  let out = '';
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    const u  = ch.charCodeAt(0);
    const li = (u / 0x80) >> 0;
    const ki = u % 0x80;
    const map = LI_TO_MAP[li];
    if (map)                        out += map.unicode_hindi_array[ki];
    else if (li === 0x1b)           out += U10_MAP.unicode_hindi_array[ki];
    else                             out += ch;
  }
  return xnglo_india_post(out);
}

// Virama/virama-equivalent offset within each script's own block -- 0x4d
// for the 9 ISCII-aligned scripts (u1..u9), but sinhala's AL-LAKUNA sits
// at 0x4a instead (sinhala isn't ISCII-aligned -- see u10_map.ts's note).
const VIRAMA_OFFSET: Record<number, number> = {
  0x12: 0x4d, 0x13: 0x4d, 0x14: 0x4d, 0x15: 0x4d, 0x16: 0x4d,
  0x17: 0x4d, 0x18: 0x4d, 0x19: 0x4d, 0x1a: 0x4d, 0x1b: 0x4a,
};

// Semi-transliteration for the u*38 family (uh38/ub38/../us38): unlike
// xi38 (full romanization of every character), this keeps LETTERS
// (consonants, independent vowels) as their original native-script
// character and only converts MARKS -- matras/vowel-signs, anusvara,
// candrabindu, visarga, nukta, etc (anything that isn't its own letter,
// per Unicode's general category) -- to their xi38 raw value, and drops
// the virama/virama-equivalent entirely. E.g. नमस्ते (न+म+स+्+त+े) ->
// नमसते's न/म/स/त kept as Devanagari, ् dropped, े -> "e": "नमसतe".
// uh38's actual native-letter alphabet is a SMALL WHITELIST, not "any
// devanagari letter" -- confirmed by the repo owner's test data: even
// genuine LETTERS (not just anusvara/candrabindu marks) outside this set
// get normalized to the nearest letter that IS in it: ङ/ञ/ण -> न (उह्38
// only keeps one dental nasal, not one per varga), ष -> स (only one
// dental sibilant kept, not both). Independent vowels other than अ
// aren't in the alphabet either and get special-cased below.
const kBlockBase = 0x0900; // devanagari block base (li === 0x12)
const DEVA_LETTER_WHITELIST_OFFSETS = new Set<number>([
  0x05, // अ
  0x15, 0x16, 0x17, 0x18, // क ख ग घ
  0x1a, 0x1b, 0x1c, 0x1d, // च छ ज झ
  0x1f, 0x20, 0x21, 0x22, // ट ठ ड ढ
  0x24, 0x25, 0x26, 0x27, 0x28, // त थ द ध न
  0x2a, 0x2b, 0x2c, 0x2d, 0x2e, // प फ ब भ म
  0x2f, 0x30, // य र
  0x32, // ल
  0x35, // व
  0x36, // श
  0x38, // स
  0x39, // ह
  0x5c, // ड़
]);
const DEVA_NORMALIZE_OFFSET: Record<number, number> = {
  0x19: 0x28, // ङ -> न
  0x1e: 0x28, // ञ -> न
  0x23: 0x28, // ण -> न
  0x37: 0x38, // ष -> स
};
// Independent vowels other than अ (offset 0x06-0x14): not in the
// alphabet, so represented as their xi38 raw value, itself further
// split so the CONSONANT-shaped part (if any) still renders native --
// ऋ/ऌ's raw "ri"/"li" become र/ल (native) + i (Latin). Raw values that
// were underscore-marked for glide handling (इ ई उ ऊ ए ऐ etc) are used
// bare, no अ prefix -- e.g. ए -> "e", not "अe" (glide marking is about
// mid-word vs word-initial romanization, moot here since the letter
// itself, not a glide consonant, is what's being represented).
// Everything else without underscore whose raw doesn't start with a
// consonant either (just आ, raw "a") falls back to "अ" + its raw value.
// The SAME "raw value starts with a consonant-key letter -> promote
// that letter to native, keep the rest Latin" rule also applies to
// MARKS below, not just these independent-vowel letters -- e.g. matra
// ai (ै, raw "ye") -> "य" + "e", confirmed by बैठकर -> बयeठकर.
const CONSONANT_FIRST_CHAR_OFFSET: Record<string, number> = { r: 0x30, l: 0x32, y: 0x2f };

// Promotes a raw xi38 value's leading consonant-key letter (if any) to
// its native devanagari character, leaving the rest as-is. Used both
// for independent vowels (deva_letter_text) and for marks (the main
// loop's else branch) -- see the CONSONANT_FIRST_CHAR_OFFSET comment.
function promote_leading_consonant(raw: string): string {
  const first = raw[0];
  if (first in CONSONANT_FIRST_CHAR_OFFSET) {
    return String.fromCodePoint(kBlockBase + CONSONANT_FIRST_CHAR_OFFSET[first]) + raw.slice(1);
  }
  return raw;
}

function deva_letter_text(offset: number, map: { unicode_hindi_array: string[] }): string {
  if (DEVA_LETTER_WHITELIST_OFFSETS.has(offset)) {
    return String.fromCodePoint(kBlockBase + offset); // devanagari-only helper; see below for other scripts
  }
  if (offset in DEVA_NORMALIZE_OFFSET) {
    return String.fromCodePoint(kBlockBase + DEVA_NORMALIZE_OFFSET[offset]);
  }
  if (offset >= 0x06 && offset <= 0x14) {
    const raw = map.unicode_hindi_array[offset];
    if (raw.startsWith('_')) return raw.slice(1); // glide-marked -> bare, no अ prefix
    const promoted = promote_leading_consonant(raw);
    if (promoted !== raw) return promoted; // ऋ/ऌ
    return String.fromCodePoint(kBlockBase + 0x05) + raw; // just आ -> अ + raw
  }
  // Not in the alphabet and not one of the cases above (e.g. a rare
  // Not in the alphabet and not one of the cases above (e.g. a rare
  // extra letter) -- fall back to the plain xi38 value rather than
  // guessing a normalization target with no evidence for it.
  return map.unicode_hindi_array[offset];
}

// "और" ("and") is common enough, and different enough from what the
// general rule above would produce (अ + ौ's raw "ou", neither part
// promotable -> "अou"), that it's handled as a literal whole-word
// exception instead -- same kind of hardcode as चाहिए elsewhere in this
// codebase's history. Matched on word boundaries so it doesn't fire
// inside a longer word that happens to contain और as a substring.
const WHOLE_WORD_HARDCODES: Record<string, string> = {
  'और': 'और',
};

export function uten2u38(input: string): string {
  if (!input) return '';
  // Whole-word hardcodes (see WHOLE_WORD_HARDCODES) are protected with a
  // PUA placeholder before any other processing, then restored verbatim
  // at the end, so nothing below (nukta composition, the main loop's
  // rules) can touch them.
  const hardcodeStash: string[] = [];
  input = input.replace(
    new RegExp(Object.keys(WHOLE_WORD_HARDCODES).map((w) =>
      `(?<![\\u0900-\\u097F])${w}(?![\\u0900-\\u097F])`).join('|'), 'g'),
    (m) => {
      hardcodeStash.push(WHOLE_WORD_HARDCODES[m]);
      return `\uE010${hardcodeStash.length - 1}\uE011`;
    }
  );
  input = input.replace(/[\u0904-\u0914][\u093e-\u094c]/g, (m) => m[1]);
  let s = input
    .replace(/\u0915\u093c/g, '\u0958') // क़
    .replace(/\u0916\u093c/g, '\u0959') // ख़
    .replace(/\u0917\u093c/g, '\u095a') // ग़
    .replace(/\u091c\u093c/g, '\u095b') // ज़
    .replace(/\u0921\u093c/g, '\u095c') // ड़
    .replace(/\u0922\u093c/g, '\u095d') // ढ़
    .replace(/\u092b\u093c/g, '\u095e') // फ़
    .replace(/\u092f\u093c/g, '\u095f'); // य़
  s = s
    .replace(/([\b\s])क्ष/g, '$1s').replace(/^क्ष/g, 's')
    .replace(/ज्ञ/g, 'gy');

  let out = '';
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    const u  = ch.charCodeAt(0);
    const li = (u / 0x80) >> 0;
    const ki = u % 0x80;
    const map = LI_TO_MAP[li] ?? (li === 0x1b ? U10_MAP : undefined);
    if (!map) { out += ch; continue; }
    if (ki === VIRAMA_OFFSET[li]) continue; // drop virama entirely
    if (li !== 0x12) {
      // Only devanagari has the confirmed whitelist/normalization rules
      // above -- other scripts fall back to the old simple letter/mark
      // split until they have their own confirmed test data.
      out += /\p{L}/u.test(ch) ? ch : map.unicode_hindi_array[ki];
      continue;
    }
    if (ki === 0x01 || ki === 0x02) {
      // Anusvara/candrabindu: dropped at a true word boundary (not
      // followed by a devanagari letter at all), न otherwise -- except
      // before a labial (प वर्ग), where it stays म. (Simplified from
      // full 5-way sandhi: ङ/ञ/ण aren't in uh38's alphabet anyway, so
      // there's nothing to assimilate TO for velar/palatal/retroflex
      // context other than the same fallback न. Confirmed by गंगा's
      // अनुस्वार, before ग/velar, resolving to न not ङ.)
      const nu = i + 1 < n ? s.charCodeAt(i + 1) : -1;
      const noffset = nu - kBlockBase;
      const nextIsLetter = nu >= kBlockBase && noffset >= 0x04 && noffset <= 0x39;
      if (!nextIsLetter) continue;
      const target = (noffset >= 0x2a && noffset <= 0x2e) ? 0x2e : 0x28; // labial->म, else->न
      out += String.fromCodePoint(kBlockBase + target);
      continue;
    }
    if (/\p{L}/u.test(ch)) {
      out += deva_letter_text(ki, map);
    } else if (ki === 0x64 || ki === 0x65) {
      // danda / double danda (।॥) -- dropped, not shown as Latin "."
      continue;
    } else {
      const raw = map.unicode_hindi_array[ki];
      // Vocalic-R/L MATRAS (offsets 0x43, 0x62, 0x63 -- raw "ri"/"li",
      // same text as the independent ऋ/ऌ LETTERS' raw value at 0x0b/0x0c)
      // are deliberately NOT promoted, staying fully Latin -- confirmed
      // by संस्कृति's matra ऋ staying "ri", not "रi" (contrast with the
      // independent-letter ऋ in ऋषि, which DOES promote via
      // deva_letter_text -- letters and marks are allowed to differ
      // here since they're visually/positionally distinguishable in the
      // original text even though their raw xi38 value collides).
      const isVocalicMatra = ki === 0x43 || ki === 0x62 || ki === 0x63;
      out += isVocalicMatra ? raw : promote_leading_consonant(raw);
    }
  }
  if (hardcodeStash.length) {
    out = out.replace(/\uE010(\d+)\uE011/g, (_m, idx) => hardcodeStash[Number(idx)]);
  }
  return out;
}