export const ITC_CODE_DICT: Record<string, string> = {
  hi: "hi-t-i0-und", bn: "bn-t-i0-und", pa: "pa-t-i0-und", gu: "gu-t-i0-und",
  or: "or-t-i0-und", ta: "ta-t-i0-und", te: "te-t-i0-und", kn: "kn-t-i0-und",
  ml: "ml-t-i0-und",
};

export const PHROM_DIKT = { e52: 'e52', uL: 'uL' } as const;

export const TU_DIKT = {
  e23: 'e23', xe38: 'xe38', xi38: 'xi38',
  xih38: 'xih38', xib38: 'xib38', xip38: 'xip38', xig38: 'xig38', xio38: 'xio38',
  xit38: 'xit38', xij38: 'xij38', xim38: 'xim38', xik38: 'xik38', xis38: 'xis38',
  xhs38: 'xhs38', xbs38: 'xbs38', xps38: 'xps38', xgs38: 'xgs38', xos38: 'xos38',
  xts38: 'xts38', xjs38: 'xjs38', xms38: 'xms38', xks38: 'xks38', xss38: 'xss38',
} as const;

export type PhromCode = typeof PHROM_DIKT[keyof typeof PHROM_DIKT];
export type TuCode   = typeof TU_DIKT[keyof typeof TU_DIKT];
