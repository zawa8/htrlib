import { U9_MAP } from './dicts/u9_map';
import { U10_MAP } from './dicts/u10_map';
import { xnglo_india_post } from './xnglo_post';

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
    if (li > 0x11 && li < 0x1b)      out += U9_MAP.unicode_hindi_array[ki];
    else if (li === 0x1b)           out += U10_MAP.unicode_hindi_array[ki];
    else                             out += ch;
  }
  return xnglo_india_post(out);
}