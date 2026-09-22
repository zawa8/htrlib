// u3_map.ts: gurmukhi (punjabi), block U+0A00-U+0A7F. Gurmukhi is
// ISCII-aligned with devanagari (same phoneme at the same block-relative
// offset -- क and ਕ are both KA at offset 0x15), so entries at offsets
// gurmukhi actually assigns a letter to keep the devanagari-derived xi38
// value; offsets unassigned in gurmukhi's own Unicode chart are blanked
// (not silently kept as devanagari's value). Digits and the handful of
// gurmukhi-only signs (tippi, addak, iri, ura, ek onkar, yakash,
// abbreviation sign) were checked/fixed individually -- see their comments.
// xi52 convention: aspirated stops use two-letter digraphs (Dh, dh, Th, th),
// unaspirated stops use single letters (D, d, T, t).
// ह → H (font draws H with an extra dot).
// व → w.
// See xi38_xi52_table.md at repo root for the full mapping and rationale.
export const U3_MAP = {
  unicode_hindi_array: [
    '', // g00 (unassigned in gurmukhi)
    'N', // ਁ g01 gurmukhi sign adak bindi  [devanagari: ँ 901 2305 anunasika (candrabindu)]
    'N', // ਂ g02 gurmukhi sign bindi  [devanagari: ं 902 2306 anusvara bindu]
    ':', // ਃ g03 gurmukhi sign visarga  [devanagari: ः 903 2307 visarga]
    '', // g04 (unassigned in gurmukhi)
    'A', // ਅ g05 gurmukhi a  [devanagari: अ 905 2309]
    'a', // ਆ g06 gurmukhi aa  [devanagari: आ 906 2310]
    '_i', // ਇ g07 gurmukhi i  [devanagari: इ 907 2311]
    '_i', // ਈ g08 gurmukhi ii  [devanagari: ई 908 2312]
    '_u', // ਉ g09 gurmukhi u  [devanagari: उ 909 2313]
    '_u', // ਊ g0a gurmukhi uu  [devanagari: ऊ 90A 2314]
    '', // g0b (unassigned in gurmukhi)
    '', // g0c (unassigned in gurmukhi)
    '', // g0d (unassigned in gurmukhi)
    '', // g0e (unassigned in gurmukhi)
    '_e', // ਏ g0f gurmukhi ee  [devanagari: ए 90F 2319]
    '_e', // ਐ g10 gurmukhi ai  [devanagari: ऐ 910 2320]
    '', // g11 (unassigned in gurmukhi)
    '', // g12 (unassigned in gurmukhi)
    'o', // ਓ g13 gurmukhi oo  [devanagari: ओ 913 2323]
    'ou', // ਔ g14 gurmukhi au  [devanagari: औ 914 2324]
    'k', // ਕ g15 gurmukhi ka  [devanagari: क 915 2325]
    'K', // ਖ g16 gurmukhi kha  [devanagari: ख 916 2326]
    'g', // ਗ g17 gurmukhi ga  [devanagari: ग 917 2327]
    'G', // ਘ g18 gurmukhi gha  [devanagari: घ 918 2328]
    'N', // ਙ g19 gurmukhi nga  [devanagari: ङ 919 2329]
    'c', // ਚ g1a gurmukhi ca  [devanagari: च 91A 2330]
    'C', // ਛ g1b gurmukhi cha  [devanagari: छ 91B 2331]
    'z', // ਜ g1c gurmukhi ja  [devanagari: ज 91C 2332]
    'Z', // ਝ g1d gurmukhi jha  [devanagari: झ 91D 2333]
    'n', // ਞ g1e gurmukhi nya  [devanagari: ञ 91E 2334]
    't', // ਟ g1f gurmukhi tta  [devanagari: ट 91F 2335]
    'th', // ਠ g20 gurmukhi ttha  [devanagari: ठ 920 2336   (xi52 aspirated retroflex)]
    'd', // ਡ g21 gurmukhi dda  [devanagari: ड 921 2337]
    'dh', // ਢ g22 gurmukhi ddha  [devanagari: ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)]
    'n', // ਣ g23 gurmukhi nna  [devanagari: ण 923 2339]
    'T', // ਤ g24 gurmukhi ta  [devanagari: त 924 2340   (xi52 unaspirated dental)]
    'Th', // ਥ g25 gurmukhi tha  [devanagari: थ 925 2341   (xi52 aspirated dental)]
    'D', // ਦ g26 gurmukhi da  [devanagari: द 926 2342]
    'Dh', // ਧ g27 gurmukhi dha  [devanagari: ध 927 2343   (xi52 aspirated dental, capital Dh)]
    'n', // ਨ g28 gurmukhi na  [devanagari: न 928 2344]
    '', // g29 (unassigned in gurmukhi)
    'p', // ਪ g2a gurmukhi pa  [devanagari: प 92A 2346]
    'f', // ਫ g2b gurmukhi pha  [devanagari: फ 92B 2347]
    'b', // ਬ g2c gurmukhi ba  [devanagari: ब 92C 2348]
    'B', // ਭ g2d gurmukhi bha  [devanagari: भ 92D 2349]
    'm', // ਮ g2e gurmukhi ma  [devanagari: म 92E 2350]
    'y', // ਯ g2f gurmukhi ya  [devanagari: य 92F 2351]
    'r', // ਰ g30 gurmukhi ra  [devanagari: र 930 2352]
    '', // g31 (unassigned in gurmukhi)
    'l', // ਲ g32 gurmukhi la  [devanagari: ल 932 2354]
    'l', // ਲ਼ g33 gurmukhi lla  [devanagari: ळ 933 2355]
    '', // g34 (unassigned in gurmukhi)
    'w', // ਵ g35 gurmukhi va  [devanagari: व 935 2357]
    'S', // ਸ਼ g36 gurmukhi sha  [devanagari: श 936 2358]
    '', // g37 (unassigned in gurmukhi)
    's', // ਸ g38 gurmukhi sa  [devanagari: स 938 2360]
    'H', // ਹ g39 gurmukhi ha  [devanagari: ह 939 2361   (xi52; font draws H with a dot on top)]
    '', // g3a (unassigned in gurmukhi)
    '', // g3b (unassigned in gurmukhi)
    '', // ਼ g3c gurmukhi sign nukta  [devanagari: ़ 93C 2364 nukta]
    '', // g3d (unassigned in gurmukhi)
    'a', // ਾ g3e gurmukhi vs aa  [devanagari: ा 93E 2366]
    'i', // ਿ g3f gurmukhi vs i  [devanagari: ि 93F 2367]
    'i', // ੀ g40 gurmukhi vs ii  [devanagari: ी 940 2368]
    'u', // ੁ g41 gurmukhi vs u  [devanagari: ु 941 2369]
    'u', // ੂ g42 gurmukhi vs uu  [devanagari: ू 942 2370]
    '', // g43 (unassigned in gurmukhi)
    '', // g44 (unassigned in gurmukhi)
    '', // g45 (unassigned in gurmukhi)
    '', // g46 (unassigned in gurmukhi)
    'e', // ੇ g47 gurmukhi vs ee  [devanagari: े 947 2375]
    'ye', // ੈ g48 gurmukhi vs ai  [devanagari: ै 948 2376]
    '', // g49 (unassigned in gurmukhi)
    '', // g4a (unassigned in gurmukhi)
    'o', // ੋ g4b gurmukhi vs oo  [devanagari: ो 94B 2379]
    'ou', // ੌ g4c gurmukhi vs au  [devanagari: ौ 94C 2380]
    '', // ੍ g4d gurmukhi sign virama  [devanagari: ् 94D 2381 virama]
    '', // g4e (unassigned in gurmukhi)
    '', // g4f (unassigned in gurmukhi)
    '', // g50 (unassigned in gurmukhi)
    '', // ੑ g51 gurmukhi sign udaat  [devanagari: ॑ 951 2385]
    '', // g52 (unassigned in gurmukhi)
    '', // g53 (unassigned in gurmukhi)
    '', // g54 (unassigned in gurmukhi)
    '', // g55 (unassigned in gurmukhi)
    '', // g56 (unassigned in gurmukhi)
    '', // g57 (unassigned in gurmukhi)
    '', // g58 (unassigned in gurmukhi)
    'K', // ਖ਼ g59 gurmukhi khha  [devanagari: ख़ 959 2393]
    'g', // ਗ਼ g5a gurmukhi ghha  [devanagari: ग़ 95A 2394]
    'z', // ਜ਼ g5b gurmukhi za  [devanagari: ज़ 95B 2395]
    'R', // ੜ g5c gurmukhi rra  [devanagari: ड़ 95C 2396   (xi52: ड़ = ढ़ = R)]
    '', // g5d (unassigned in gurmukhi)
    'f', // ਫ਼ g5e gurmukhi fa  [devanagari: फ़ 95E 2398]
    '', // g5f (unassigned in gurmukhi)
    '', // g60 (unassigned in gurmukhi)
    '', // g61 (unassigned in gurmukhi)
    '', // g62 (unassigned in gurmukhi)
    '', // g63 (unassigned in gurmukhi)
    '', // g64 (unassigned in gurmukhi)
    '', // g65 (unassigned in gurmukhi)
    '0', // ੦ g66 gurmukhi digit zero  [devanagari: ० 966 2406]
    '1', // ੧ g67 gurmukhi digit one  [devanagari: १ 967 2407]
    '2', // ੨ g68 gurmukhi digit two  [devanagari: २ 968 2408]
    '3', // ੩ g69 gurmukhi digit three  [devanagari: ३ 969 2409]
    '4', // ੪ g6a gurmukhi digit four  [devanagari: ४ 96A 2410]
    '5', // ੫ g6b gurmukhi digit five  [devanagari: ५ 96B 2411]
    '6', // ੬ g6c gurmukhi digit six  [devanagari: ६ 96C 2412]
    '7', // ੭ g6d gurmukhi digit seven  [devanagari: ७ 96D 2413]
    '8', // ੮ g6e gurmukhi digit eight  [devanagari: ८ 96E 2414]
    '9', // ੯ g6f gurmukhi digit nine  [devanagari: ९ 96F 2415]
    'N', // ੰ g70 gurmukhi tippi (nasalization, same token as bindi/anusvara)
    '', // ੱ g71 gurmukhi addak (doubles the following consonant -- no single-token equivalent, left blank)
    '', // ੲ g72 gurmukhi iri (historical vowel-bearer letter, rare in modern text, left blank)
    '', // ੳ g73 gurmukhi ura (historical vowel-bearer letter, rare in modern text, left blank)
    '', // ੴ g74 gurmukhi ek onkar (religious symbol "ik onkar", not phonetic -- left blank rather than mistransliterated)
    '', // ੵ g75 gurmukhi sign yakash (rare sign, left blank)
    '', // ੶ g76 gurmukhi abbreviation sign (punctuation-like, not phonetic -- left blank)
    '', // g77 (unassigned in gurmukhi)
    '', // g78 (unassigned in gurmukhi)
    '', // g79 (unassigned in gurmukhi)
    '', // g7a (unassigned in gurmukhi)
    '', // g7b (unassigned in gurmukhi)
    '', // g7c (unassigned in gurmukhi)
    '', // g7d (unassigned in gurmukhi)
    '', // g7e (unassigned in gurmukhi)
    '' // g7f (unassigned in gurmukhi)
  ],
  // NOTE: inherited unchanged from the devanagari table this file was
  // seeded from -- not verified against gurmukhi, and (like in u10_map.ts)
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
