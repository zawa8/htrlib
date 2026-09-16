import { U9_MAP } from './dicts/u9_map';
import { U10_MAP } from './dicts/u10_map';
import { xnglo_india_post } from './xnglo_post';

export function unicode_india_to_xnglo_india(input: string): string {
  if (!input) return '';
  // pre
  let s = input
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
