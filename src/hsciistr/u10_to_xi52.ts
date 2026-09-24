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

export function unicode_india_to_xnglo_india_xi52(input: string): string {
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
export function unicode_india_to_u38(input: string): string {
  if (!input) return '';
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

  const LETTER = /\p{L}/u;
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
    if (LETTER.test(ch)) out += ch; // keep letters as the native character
    else out += map.unicode_hindi_array[ki]; // marks -> their xi38 value
  }
  return out;
}