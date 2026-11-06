// u5_map.ts: oriya, block U+0B00-U+0B7F. ISCII-aligned with Dewnagri
// (same phoneme at the same block-relative offset -- क and କ are both KA
// at offset 0x15). Entries at offsets oriya assigns a letter keep the
// Dewnagri-derived xi38 value; offsets unassigned in oriya's own
// Unicode chart are blanked. Oriya's ड़/ढ़/य़-equivalent letters (rra/rha/
// yya) are actual precomposed letters here (not decomposed nukta forms
// like Dewnagri's), and a distinct WA letter (mapped to 'w', same
// token as व) -- both line up with the Dewnagri-derived offsets
// already. Oriya-only pronunciation/length marks and fraction digits
// checked/fixed individually -- see their comments.
// xi52 convention: aspirated stops use two-letter digraphs (Dh, dh, Th, th),
// unaspirated stops use single letters (D, d, T, t).
// ह → H (font draws H with an extra dot).
// व → w.
// See xi38_xi52_table.md at repo root for the full mapping and rationale.
export const U5_MAP = {
  unicode_hindi_array: [
    '', // or00 (unassigned in oriya)
    'N', // ଁ or01 oriya sign candrabindu  [Dewnagri: ँ 901 2305 anunasika (candrabindu)]
    'N', // ଂ or02 oriya sign anusvara  [Dewnagri: ं 902 2306 anusvara bindu]
    ':', // ଃ or03 oriya sign visarga  [Dewnagri: ः 903 2307 visarga]
    '', // or04 (unassigned in oriya)
    'A', // ଅ or05 oriya a  [Dewnagri: अ 905 2309]
    'aa', // ଆ or06 oriya aa  [Dewnagri: आ 906 2310]
    '_i', // ଇ or07 oriya i  [Dewnagri: इ 907 2311]
    '_i', // ଈ or08 oriya ii  [Dewnagri: ई 908 2312]
    '_u', // ଉ or09 oriya u  [Dewnagri: उ 909 2313]
    '_u', // ଊ or0a oriya uu  [Dewnagri: ऊ 90A 2314]
    'ri', // ଋ or0b oriya vocalic r  [Dewnagri: ऋ 90B 2315]
    'li', // ଌ or0c oriya vocalic l  [Dewnagri: ऌ 90C 2316]
    '', // or0d (unassigned in oriya)
    '', // or0e (unassigned in oriya)
    '_e', // ଏ or0f oriya e  [Dewnagri: ए 90F 2319]
    '_e', // ଐ or10 oriya ai  [Dewnagri: ऐ 910 2320]
    '', // or11 (unassigned in oriya)
    '', // or12 (unassigned in oriya)
    'o', // ଓ or13 oriya o  [Dewnagri: ओ 913 2323]
    'Au', // ଔ or14 oriya au  [Dewnagri: औ 914 2324]
    'k', // କ or15 oriya ka  [Dewnagri: क 915 2325]
    'K', // ଖ or16 oriya kha  [Dewnagri: ख 916 2326]
    'g', // ଗ or17 oriya ga  [Dewnagri: ग 917 2327]
    'G', // ଘ or18 oriya gha  [Dewnagri: घ 918 2328]
    'N', // ଙ or19 oriya nga  [Dewnagri: ङ 919 2329]
    'c', // ଚ or1a oriya ca  [Dewnagri: च 91A 2330]
    'C', // ଛ or1b oriya cha  [Dewnagri: छ 91B 2331]
    'z', // ଜ or1c oriya ja  [Dewnagri: ज 91C 2332]
    'Z', // ଝ or1d oriya jha  [Dewnagri: झ 91D 2333]
    'n', // ଞ or1e oriya nya  [Dewnagri: ञ 91E 2334]
    't', // ଟ or1f oriya tta  [Dewnagri: ट 91F 2335]
    'th', // ଠ or20 oriya ttha  [Dewnagri: ठ 920 2336   (xi52 aspirated retroflex)]
    'd', // ଡ or21 oriya dda  [Dewnagri: ड 921 2337]
    'dh', // ଢ or22 oriya ddha  [Dewnagri: ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)]
    'n', // ଣ or23 oriya nna  [Dewnagri: ण 923 2339]
    'T', // ତ or24 oriya ta  [Dewnagri: त 924 2340   (xi52 unaspirated dental)]
    'Th', // ଥ or25 oriya tha  [Dewnagri: थ 925 2341   (xi52 aspirated dental)]
    'D', // ଦ or26 oriya da  [Dewnagri: द 926 2342]
    'Dh', // ଧ or27 oriya dha  [Dewnagri: ध 927 2343   (xi52 aspirated dental, capital Dh)]
    'n', // ନ or28 oriya na  [Dewnagri: न 928 2344]
    '', // or29 (unassigned in oriya)
    'p', // ପ or2a oriya pa  [Dewnagri: प 92A 2346]
    'f', // ଫ or2b oriya pha  [Dewnagri: फ 92B 2347]
    'b', // ବ or2c oriya ba  [Dewnagri: ब 92C 2348]
    'B', // ଭ or2d oriya bha  [Dewnagri: भ 92D 2349]
    'm', // ମ or2e oriya ma  [Dewnagri: म 92E 2350]
    'y', // ଯ or2f oriya ya  [Dewnagri: य 92F 2351]
    'r', // ର or30 oriya ra  [Dewnagri: र 930 2352]
    '', // or31 (unassigned in oriya)
    'l', // ଲ or32 oriya la  [Dewnagri: ल 932 2354]
    'l', // ଳ or33 oriya lla  [Dewnagri: ळ 933 2355]
    '', // or34 (unassigned in oriya)
    'w', // ଵ or35 oriya va  [Dewnagri: व 935 2357]
    'S', // ଶ or36 oriya sha  [Dewnagri: श 936 2358]
    's', // ଷ or37 oriya ssa  [Dewnagri: ष 937 2359]
    's', // ସ or38 oriya sa  [Dewnagri: स 938 2360]
    'v',  // v = ∀ = ह 939 2361
    '', // or3a (unassigned in oriya)
    '', // or3b (unassigned in oriya)
    '', // ଼ or3c oriya sign nukta  [Dewnagri: ़ 93C 2364 nukta]
    '!', // ଽ or3d oriya sign avagraha  [Dewnagri: ऽ 93D 2365 avagraha]
    'a', // ା or3e oriya vs aa  [Dewnagri: ा 93E 2366]
    'i', // ି or3f oriya vs i  [Dewnagri: ि 93F 2367]
    'i', // ୀ or40 oriya vs ii  [Dewnagri: ी 940 2368]
    'u', // ୁ or41 oriya vs u  [Dewnagri: ु 941 2369]
    'u', // ୂ or42 oriya vs uu  [Dewnagri: ू 942 2370]
    'ri', // ୃ or43 oriya vs vocalic r  [Dewnagri: ृ 943 2371]
    'r', // ୄ or44 oriya vs vocalic rr  [Dewnagri: ॄ 944 2372]
    '', // or45 (unassigned in oriya)
    '', // or46 (unassigned in oriya)
    'e', // େ or47 oriya vs e  [Dewnagri: े 947 2375]
    'ye', // ୈ or48 oriya vs ai  [Dewnagri: ै 948 2376]
    '', // or49 (unassigned in oriya)
    '', // or4a (unassigned in oriya)
    'o', // ୋ or4b oriya vs o  [Dewnagri: ो 94B 2379]
    'ou', // ୌ or4c oriya vs au  [Dewnagri: ौ 94C 2380]
    '', // ୍ or4d oriya sign virama  [Dewnagri: ् 94D 2381 virama]
    '', // or4e (unassigned in oriya)
    '', // or4f (unassigned in oriya)
    '', // or50 (unassigned in oriya)
    '', // or51 (unassigned in oriya)
    '', // or52 (unassigned in oriya)
    '', // or53 (unassigned in oriya)
    '', // or54 (unassigned in oriya)
    '', // ୕ or55 oriya sign overline (pronunciation mark for loanwords -- no single-token equivalent, left blank)
    '', // ୖ or56 oriya ai length mark (used with loanwords -- no single-token equivalent, left blank)
    '', // ୗ or57 oriya au length mark (used with loanwords -- no single-token equivalent, left blank)
    '', // or58 (unassigned in oriya)
    '', // or59 (unassigned in oriya)
    '', // or5a (unassigned in oriya)
    '', // or5b (unassigned in oriya)
    'R', // ଡ଼ or5c oriya rra  [Dewnagri: ड़ 95C 2396   (xi52: ड़ = ढ़ = R)]
    'R', // ଢ଼ or5d oriya rha  [Dewnagri: ढ़ 95D 2397   (xi52: ढ़ = ड़ = R)]
    '', // or5e (unassigned in oriya)
    'y', // ୟ or5f oriya yya  [Dewnagri: य़ 95F 2399]
    'ri', // ୠ or60 oriya vocalic rr  [Dewnagri: ॠ 960 2400]
    'li', // ୡ or61 oriya vocalic ll  [Dewnagri: ॡ 961 2401]
    'li', // ୢ or62 oriya vs vocalic l  [Dewnagri: ॢ 962 2402]
    'li', // ୣ or63 oriya vs vocalic ll  [Dewnagri: ॣ 963 2403]
    '', // or64 (unassigned in oriya)
    '', // or65 (unassigned in oriya)
    '0', // ୦ or66 oriya digit zero  [Dewnagri: ० 966 2406]
    '1', // ୧ or67 oriya digit one  [Dewnagri: १ 967 2407]
    '2', // ୨ or68 oriya digit two  [Dewnagri: २ 968 2408]
    '3', // ୩ or69 oriya digit three  [Dewnagri: ३ 969 2409]
    '4', // ୪ or6a oriya digit four  [Dewnagri: ४ 96A 2410]
    '5', // ୫ or6b oriya digit five  [Dewnagri: ५ 96B 2411]
    '6', // ୬ or6c oriya digit six  [Dewnagri: ६ 96C 2412]
    '7', // ୭ or6d oriya digit seven  [Dewnagri: ७ 96D 2413]
    '8', // ୮ or6e oriya digit eight  [Dewnagri: ८ 96E 2414]
    '9', // ୯ or6f oriya digit nine  [Dewnagri: ९ 96F 2415]
    '', // ୰ or70 oriya isshar (auspicious opening symbol, not phonetic -- left blank)
    'w', // ୱ or71 oriya wa (distinct wa letter for the w sound, e.g. in loanwords -- same token as व/w elsewhere)
    '', // ୲ or72 oriya fraction one quarter (numeral, not phonetic -- left blank)
    '', // ୳ or73 oriya fraction one half (numeral, not phonetic -- left blank)
    '', // ୴ or74 oriya fraction three quarters (numeral, not phonetic -- left blank)
    '', // ୵ or75 oriya fraction one sixteenth (numeral, not phonetic -- left blank)
    '', // ୶ or76 oriya fraction one eighth (numeral, not phonetic -- left blank)
    '', // ୷ or77 oriya fraction three sixteenths (numeral, not phonetic -- left blank)
    '', // or78 (unassigned in oriya)
    '', // or79 (unassigned in oriya)
    '', // or7a (unassigned in oriya)
    '', // or7b (unassigned in oriya)
    '', // or7c (unassigned in oriya)
    '', // or7d (unassigned in oriya)
    '', // or7e (unassigned in oriya)
    '' // or7f (unassigned in oriya)
  ],
  // NOTE: inherited unchanged from the Dewnagri table this file was
  // seeded from -- not verified against oriya, and (like in u10_map.ts)
  // currently unused by any consumer in src/ outside dicts/.
  hard_consonants_modulo_list: [
    0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
    0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
  ],
  vovli_modulo_list: [
    0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
    0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
  ]
};
