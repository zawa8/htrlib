const CH_MARK = '\u0001';

export function e52_tu_e23(input: string): string {
  if (!input) return '';
  let s = input.toLowerCase();

  s = s
    .replace(/ought/g, 'ot')
    .replace(/([^lhr])ough$/g, '$1f')
    .replace(/dge/g, 'ze')
    .replace(/([aiueo])xx/g, '$1ks');

  s = s
    .replace(/xce/g, 'kse')
    .replace(/xca/g, 'ksa')
    .replace(/xci/g, 'ksai')
    .replace(/xcu/g, 'kskyu')
    .replace(/\bxi/g, 'zi')
    .replace(/\bxy/g, 'zai')
    .replace(/xy/g, 'ksi')
    .replace(/\bx([aiueo])/g, 'z$1')
    .replace(/\bx/g, 'eks')
    .replace(/([a-wyz])x/g, '$1ks');

  s = s
    .replace(/ch/g, CH_MARK)
    .replace(/cco/g, 'ko')
    .replace(/cce/g, 'kse')
    .replace(/cci/g, 'ksi')
    .replace(/c([yei])/g, 's$1')
    .replace(/ck/g, 'k')
    .replace(/c/g, 'k')
    .replace(new RegExp(CH_MARK, 'g'), 'c');

  s = s.replace(/\bcild\b/g, 'caild');

  // x = Hindi schwa marker (matches uL2xin38 output convention)
  s = s
    .replace(/\blover\b/g, 'lwxr')
    .replace(/\bnever\b/g, 'nxwxr')
    .replace(/\bvary\b/g,  'wxyri')
    .replace(/\bvest\b/g,  'weist')
    .replace(/\bvine\b/g,  'wayin')
    .replace(/\bvet\b/g,   'wyt');

  s = s.replace(/j/g, 'z').replace(/q/g, 'k').replace(/v/g, 'w');
  return s;
}
