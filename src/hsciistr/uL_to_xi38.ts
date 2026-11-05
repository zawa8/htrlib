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

export function uL_to_xi38(input: string): string {
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
  // Replaces decomposed nukta consonants directly with their final xi38
  // Latin letter (same values u1_map.ts's own precomposed-nukta entries
  // give), instead of first composing to the precomposed codepoint (क़
  // etc) and letting the main loop look them up -- one step instead of
  // two, same result (repo owner's suggestion). The trailing catch-all
  // drops any standalone नुक्ता sign left over (one attached to a
  // consonant outside these 8, or a stray/malformed nukta) rather than
  // letting it reach the main loop, where u1_map's own entry for bare
  // नुक्ता (offset 0x3c) is already '' -- so this is a safety net, not
  // a behavior change.
  let s = input
    .replace(/\u0915\u093c/g, 'k')  // क़
    .replace(/\u0916\u093c/g, 'K')  // ख़
    .replace(/\u0917\u093c/g, 'g')  // ग़
    .replace(/\u091c\u093c/g, 'z')  // ज़
    .replace(/\u0921\u093c/g, 'R')  // ड़ (unaspirated retroflex flap)
    .replace(/\u0922\u093c/g, 'dh') // ढ़ (aspirated retroflex, per xi52)
    .replace(/\u092b\u093c/g, 'f')  // फ़
    .replace(/\u092f\u093c/g, 'y')  // य़
    .replace(/\u093c/g, '')
    .replace(/(^|\s)क्ष/g, '$1s')
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

