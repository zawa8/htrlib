import { ITC_CODE_DICT } from '../dicts/codes';

export async function transliterate_e52_x(input: string, target: string): Promise<string> {
  if (!input) return "";
  const itcCode = ITC_CODE_DICT[target] ?? "hi-t-i0-und";
  const tokens = input.match(/([a-zA-Z]+|[^a-zA-Z]+)/g) || [input];
  const out: string[] = [];
  for (const token of tokens) {
    if (/^[a-zA-Z]+$/.test(token)) {
      try {
        const url = `https://inputtools.google.com/request?text=${encodeURIComponent(token)}&itc=${itcCode}&num=1`;
        const response = await fetch(url);
        const data = await response.json();
        out.push(data[1]?.[0]?.[1]?.[0] || token);
      } catch {
        out.push(token);
      }
    } else {
      out.push(token);
    }
  }
  return out.join("");
}
