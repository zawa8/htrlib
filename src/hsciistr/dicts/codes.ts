export const ITC_CODE_DICT: Record<string, string> = {
  hi: "hi-t-i0-und", bn: "bn-t-i0-und", pa: "pa-t-i0-und", gu: "gu-t-i0-und",
  or: "or-t-i0-und", ta: "ta-t-i0-und", te: "te-t-i0-und", kn: "kn-t-i0-und",
  ml: "ml-t-i0-und",
};

export const E52_X38_TRANSLATE_CODE_DICT: Record<string, string> = {
  xv38: 'hi', xb38: 'bn', xp38: 'pa', xg38: 'gu', xo38: 'or', xt38: 'ta',
  xj38: 'te', xm38: 'ml', xk38: 'kn', xs38: 'si', xmr38: 'mr',
};

export const PHROM_DIKT = { e52: 'e52', u10: 'u10', e52u10: 'e52u10' } as const;

export const TU_DIKT = {
  e23: 'e23', xe38: 'xe38',
  xi38: 'xi38', xv38: 'xv38', xb38: 'xb38',
  xp38: 'xp38', xg38: 'xg38', xo38: 'xo38', xj38: 'xj38', xt38: 'xt38', xm38: 'xm38',
  xk38: 'xk38', xs38: 'xs38', xmr38: 'xmr38',
} as const;

export type PhromCode = typeof PHROM_DIKT[keyof typeof PHROM_DIKT];
export type TuCode   = typeof TU_DIKT[keyof typeof TU_DIKT];
