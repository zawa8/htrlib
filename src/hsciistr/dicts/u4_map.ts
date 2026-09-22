// u4_map.ts: gujarati, block U+0A80-U+0AFF. ISCII-aligned with devanagari
// (same phoneme at the same block-relative offset -- क and ક are both KA
// at offset 0x15), so entries at offsets gujarati assigns a letter keep
// the devanagari-derived xi38 value; offsets unassigned in gujarati's own
// Unicode chart are blanked. Gujarati has no separate nukta-letter
// codepoints for क़/ख़/ग़/etc (offsets 0x51-0x5f unassigned), but does have
// 6 Unicode 14+ arabic-loan diacritics (sukun/shadda/maddah/nukta
// variants, offsets 0x7a-0x7f) and a rupee sign/abbreviation sign
// (0x70-0x71) -- none phonetic, all left blank rather than mistranslated.
// xi52 convention: aspirated stops use two-letter digraphs (Dh, dh, Th, th),
// unaspirated stops use single letters (D, d, T, t).
// ह → H (font draws H with an extra dot).
// व → w.
// See xi38_xi52_table.md at repo root for the full mapping and rationale.
export const U4_MAP = {
  unicode_hindi_array: [
    '', // gj00 (unassigned in gujarati)
    'N', // ઁ gj01 gujarati sign candrabindu  [devanagari: ँ 901 2305 anunasika (candrabindu)]
    'N', // ં gj02 gujarati sign anusvara  [devanagari: ं 902 2306 anusvara bindu]
    ':', // ઃ gj03 gujarati sign visarga  [devanagari: ः 903 2307 visarga]
    '', // gj04 (unassigned in gujarati)
    'A', // અ gj05 gujarati a  [devanagari: अ 905 2309]
    'a', // આ gj06 gujarati aa  [devanagari: आ 906 2310]
    '_i', // ઇ gj07 gujarati i  [devanagari: इ 907 2311]
    '_i', // ઈ gj08 gujarati ii  [devanagari: ई 908 2312]
    '_u', // ઉ gj09 gujarati u  [devanagari: उ 909 2313]
    '_u', // ઊ gj0a gujarati uu  [devanagari: ऊ 90A 2314]
    'ri', // ઋ gj0b gujarati vocalic r  [devanagari: ऋ 90B 2315]
    'li', // ઌ gj0c gujarati vocalic l  [devanagari: ऌ 90C 2316]
    '_e', // ઍ gj0d gujarati vowel candra e  [devanagari: ऍ 90D 2317 candra e]
    '', // gj0e (unassigned in gujarati)
    '_e', // એ gj0f gujarati e  [devanagari: ए 90F 2319]
    '_e', // ઐ gj10 gujarati ai  [devanagari: ऐ 910 2320]
    'ao', // ઑ gj11 gujarati vowel candra o  [devanagari: ऑ 911 2321 candra o]
    '', // gj12 (unassigned in gujarati)
    'o', // ઓ gj13 gujarati o  [devanagari: ओ 913 2323]
    'ou', // ઔ gj14 gujarati au  [devanagari: औ 914 2324]
    'k', // ક gj15 gujarati ka  [devanagari: क 915 2325]
    'K', // ખ gj16 gujarati kha  [devanagari: ख 916 2326]
    'g', // ગ gj17 gujarati ga  [devanagari: ग 917 2327]
    'G', // ઘ gj18 gujarati gha  [devanagari: घ 918 2328]
    'N', // ઙ gj19 gujarati nga  [devanagari: ङ 919 2329]
    'c', // ચ gj1a gujarati ca  [devanagari: च 91A 2330]
    'C', // છ gj1b gujarati cha  [devanagari: छ 91B 2331]
    'z', // જ gj1c gujarati ja  [devanagari: ज 91C 2332]
    'Z', // ઝ gj1d gujarati jha  [devanagari: झ 91D 2333]
    'n', // ઞ gj1e gujarati nya  [devanagari: ञ 91E 2334]
    't', // ટ gj1f gujarati tta  [devanagari: ट 91F 2335]
    'th', // ઠ gj20 gujarati ttha  [devanagari: ठ 920 2336   (xi52 aspirated retroflex)]
    'd', // ડ gj21 gujarati dda  [devanagari: ड 921 2337]
    'dh', // ઢ gj22 gujarati ddha  [devanagari: ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)]
    'n', // ણ gj23 gujarati nna  [devanagari: ण 923 2339]
    'T', // ત gj24 gujarati ta  [devanagari: त 924 2340   (xi52 unaspirated dental)]
    'Th', // થ gj25 gujarati tha  [devanagari: थ 925 2341   (xi52 aspirated dental)]
    'D', // દ gj26 gujarati da  [devanagari: द 926 2342]
    'Dh', // ધ gj27 gujarati dha  [devanagari: ध 927 2343   (xi52 aspirated dental, capital Dh)]
    'n', // ન gj28 gujarati na  [devanagari: न 928 2344]
    '', // gj29 (unassigned in gujarati)
    'p', // પ gj2a gujarati pa  [devanagari: प 92A 2346]
    'f', // ફ gj2b gujarati pha  [devanagari: फ 92B 2347]
    'b', // બ gj2c gujarati ba  [devanagari: ब 92C 2348]
    'B', // ભ gj2d gujarati bha  [devanagari: भ 92D 2349]
    'm', // મ gj2e gujarati ma  [devanagari: म 92E 2350]
    'y', // ય gj2f gujarati ya  [devanagari: य 92F 2351]
    'r', // ર gj30 gujarati ra  [devanagari: र 930 2352]
    '', // gj31 (unassigned in gujarati)
    'l', // લ gj32 gujarati la  [devanagari: ल 932 2354]
    'l', // ળ gj33 gujarati lla  [devanagari: ळ 933 2355]
    '', // gj34 (unassigned in gujarati)
    'w', // વ gj35 gujarati va  [devanagari: व 935 2357]
    'S', // શ gj36 gujarati sha  [devanagari: श 936 2358]
    's', // ષ gj37 gujarati ssa  [devanagari: ष 937 2359]
    's', // સ gj38 gujarati sa  [devanagari: स 938 2360]
    'H', // હ gj39 gujarati ha  [devanagari: ह 939 2361   (xi52; font draws H with a dot on top)]
    '', // gj3a (unassigned in gujarati)
    '', // gj3b (unassigned in gujarati)
    '', // ઼ gj3c gujarati sign nukta  [devanagari: ़ 93C 2364 nukta]
    '!', // ઽ gj3d gujarati sign avagraha  [devanagari: ऽ 93D 2365 avagraha]
    'a', // ા gj3e gujarati vs aa  [devanagari: ा 93E 2366]
    'i', // િ gj3f gujarati vs i  [devanagari: ि 93F 2367]
    'i', // ી gj40 gujarati vs ii  [devanagari: ी 940 2368]
    'u', // ુ gj41 gujarati vs u  [devanagari: ु 941 2369]
    'u', // ૂ gj42 gujarati vs uu  [devanagari: ू 942 2370]
    'ri', // ૃ gj43 gujarati vs vocalic r  [devanagari: ृ 943 2371]
    'r', // ૄ gj44 gujarati vs vocalic rr  [devanagari: ॄ 944 2372]
    'e', // ૅ gj45 gujarati vs candra e  [devanagari: ॅ 945 2373]
    '', // gj46 (unassigned in gujarati)
    'e', // ે gj47 gujarati vs e  [devanagari: े 947 2375]
    'ye', // ૈ gj48 gujarati vs ai  [devanagari: ै 948 2376]
    'o', // ૉ gj49 gujarati vs candra o  [devanagari: ॉ 949 2377]
    '', // gj4a (unassigned in gujarati)
    'o', // ો gj4b gujarati vs o  [devanagari: ो 94B 2379]
    'ou', // ૌ gj4c gujarati vs au  [devanagari: ौ 94C 2380]
    '', // ્ gj4d gujarati sign virama  [devanagari: ् 94D 2381 virama]
    '', // gj4e (unassigned in gujarati)
    '', // gj4f (unassigned in gujarati)
    'om', // ૐ gj50 gujarati om  [devanagari: ॐ 950 2384]
    '', // gj51 (unassigned in gujarati)
    '', // gj52 (unassigned in gujarati)
    '', // gj53 (unassigned in gujarati)
    '', // gj54 (unassigned in gujarati)
    '', // gj55 (unassigned in gujarati)
    '', // gj56 (unassigned in gujarati)
    '', // gj57 (unassigned in gujarati)
    '', // gj58 (unassigned in gujarati)
    '', // gj59 (unassigned in gujarati)
    '', // gj5a (unassigned in gujarati)
    '', // gj5b (unassigned in gujarati)
    '', // gj5c (unassigned in gujarati)
    '', // gj5d (unassigned in gujarati)
    '', // gj5e (unassigned in gujarati)
    '', // gj5f (unassigned in gujarati)
    'ri', // ૠ gj60 gujarati vocalic rr  [devanagari: ॠ 960 2400]
    'li', // ૡ gj61 gujarati vocalic ll  [devanagari: ॡ 961 2401]
    'li', // ૢ gj62 gujarati vs vocalic l  [devanagari: ॢ 962 2402]
    'li', // ૣ gj63 gujarati vs vocalic ll  [devanagari: ॣ 963 2403]
    '', // gj64 (unassigned in gujarati)
    '', // gj65 (unassigned in gujarati)
    '0', // ૦ gj66 gujarati digit zero  [devanagari: ० 966 2406]
    '1', // ૧ gj67 gujarati digit one  [devanagari: १ 967 2407]
    '2', // ૨ gj68 gujarati digit two  [devanagari: २ 968 2408]
    '3', // ૩ gj69 gujarati digit three  [devanagari: ३ 969 2409]
    '4', // ૪ gj6a gujarati digit four  [devanagari: ४ 96A 2410]
    '5', // ૫ gj6b gujarati digit five  [devanagari: ५ 96B 2411]
    '6', // ૬ gj6c gujarati digit six  [devanagari: ६ 96C 2412]
    '7', // ૭ gj6d gujarati digit seven  [devanagari: ७ 96D 2413]
    '8', // ૮ gj6e gujarati digit eight  [devanagari: ८ 96E 2414]
    '9', // ૯ gj6f gujarati digit nine  [devanagari: ९ 96F 2415]
    '', // ૰ gj70 gujarati abbreviation sign (punctuation-like, not phonetic -- left blank)
    '', // ૱ gj71 gujarati rupee sign (currency symbol, not phonetic -- left blank)
    '', // gj72 (unassigned in gujarati)
    '', // gj73 (unassigned in gujarati)
    '', // gj74 (unassigned in gujarati)
    '', // gj75 (unassigned in gujarati)
    '', // gj76 (unassigned in gujarati)
    '', // gj77 (unassigned in gujarati)
    '', // gj78 (unassigned in gujarati)
    'Z', // ૹ gj79 gujarati zha  [devanagari: ॹ 979 2425]
    '', // ૺ gj7a gujarati sign sukun (arabic-loan diacritic, not a gujarati phoneme -- left blank)
    '', // ૻ gj7b gujarati sign shadda (arabic-loan diacritic, not a gujarati phoneme -- left blank)
    '', // ૼ gj7c gujarati sign maddah (arabic-loan diacritic, not a gujarati phoneme -- left blank)
    '', // ૽ gj7d gujarati sign three-dot nukta above (arabic-loan nukta variant, not a phoneme itself -- left blank)
    '', // ૾ gj7e gujarati sign circle nukta above (arabic-loan nukta variant, not a phoneme itself -- left blank)
    '' // ૿ gj7f gujarati sign two-circle nukta above (arabic-loan nukta variant, not a phoneme itself -- left blank)
  ],
  // NOTE: inherited unchanged from the devanagari table this file was
  // seeded from -- not verified against gujarati, and (like in u10_map.ts)
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
