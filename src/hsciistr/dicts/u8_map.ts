// u8_map.ts: kannada, block U+0C80-U+0CFF. ISCII-aligned with devanagari
// (same phoneme at the same block-relative offset -- क and ಕ are both KA
// at offset 0x15), including kannada's separate short/long e and o
// (offsets 0x0e/0x0f and 0x12/0x13 line up with devanagari's own
// short-e/e and short-o/o slots there). Entries at offsets kannada
// assigns a letter keep the devanagari-derived xi38 value; offsets
// unassigned in kannada's own Unicode chart are blanked. Kannada-specific
// signs (siddham, length marks, nakaara pollu, jihvamuliya, upadhmaniya)
// checked/fixed individually -- see their comments.
// xi52 convention: aspirated stops use two-letter digraphs (Dh, dh, Th, th),
// unaspirated stops use single letters (D, d, T, t).
// ह → H (font draws H with an extra dot).
// व → w.
// See xi38_xi52_table.md at repo root for the full mapping and rationale.
export const U8_MAP = {
  unicode_hindi_array: [
    'N', // ಀ kn00 kannada sign spacing candrabindu (nasalization, same token as candrabindu/anusvara)
    'N', // ಁ kn01 kannada sign candrabindu  [devanagari: ँ 901 2305 anunasika (candrabindu)]
    'N', // ಂ kn02 kannada sign anusvara  [devanagari: ं 902 2306 anusvara bindu]
    ':', // ಃ kn03 kannada sign visarga  [devanagari: ः 903 2307 visarga]
    '', // ಄ kn04 kannada sign siddham (auspicious opening mark, not phonetic -- left blank)
    'A', // ಅ kn05 kannada a  [devanagari: अ 905 2309]
    'a', // ಆ kn06 kannada aa  [devanagari: आ 906 2310]
    '_i', // ಇ kn07 kannada i  [devanagari: इ 907 2311]
    '_i', // ಈ kn08 kannada ii  [devanagari: ई 908 2312]
    '_u', // ಉ kn09 kannada u  [devanagari: उ 909 2313]
    '_u', // ಊ kn0a kannada uu  [devanagari: ऊ 90A 2314]
    'ri', // ಋ kn0b kannada vocalic r  [devanagari: ऋ 90B 2315]
    'li', // ಌ kn0c kannada vocalic l  [devanagari: ऌ 90C 2316]
    '', // kn0d (unassigned in kannada)
    '_e', // ಎ kn0e kannada e  [devanagari: ऎ 90E 2318 short e]
    '_e', // ಏ kn0f kannada ee  [devanagari: ए 90F 2319]
    '_e', // ಐ kn10 kannada ai  [devanagari: ऐ 910 2320]
    '', // kn11 (unassigned in kannada)
    '_o', // ಒ kn12 kannada o  [devanagari: ऒ 912 2322 short o]
    'o', // ಓ kn13 kannada oo  [devanagari: ओ 913 2323]
    'ou', // ಔ kn14 kannada au  [devanagari: औ 914 2324]
    'k', // ಕ kn15 kannada ka  [devanagari: क 915 2325]
    'K', // ಖ kn16 kannada kha  [devanagari: ख 916 2326]
    'g', // ಗ kn17 kannada ga  [devanagari: ग 917 2327]
    'G', // ಘ kn18 kannada gha  [devanagari: घ 918 2328]
    'N', // ಙ kn19 kannada nga  [devanagari: ङ 919 2329]
    'c', // ಚ kn1a kannada ca  [devanagari: च 91A 2330]
    'C', // ಛ kn1b kannada cha  [devanagari: छ 91B 2331]
    'z', // ಜ kn1c kannada ja  [devanagari: ज 91C 2332]
    'Z', // ಝ kn1d kannada jha  [devanagari: झ 91D 2333]
    'n', // ಞ kn1e kannada nya  [devanagari: ञ 91E 2334]
    't', // ಟ kn1f kannada tta  [devanagari: ट 91F 2335]
    'th', // ಠ kn20 kannada ttha  [devanagari: ठ 920 2336   (xi52 aspirated retroflex)]
    'd', // ಡ kn21 kannada dda  [devanagari: ड 921 2337]
    'dh', // ಢ kn22 kannada ddha  [devanagari: ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)]
    'n', // ಣ kn23 kannada nna  [devanagari: ण 923 2339]
    'T', // ತ kn24 kannada ta  [devanagari: त 924 2340   (xi52 unaspirated dental)]
    'Th', // ಥ kn25 kannada tha  [devanagari: थ 925 2341   (xi52 aspirated dental)]
    'D', // ದ kn26 kannada da  [devanagari: द 926 2342]
    'Dh', // ಧ kn27 kannada dha  [devanagari: ध 927 2343   (xi52 aspirated dental, capital Dh)]
    'n', // ನ kn28 kannada na  [devanagari: न 928 2344]
    '', // kn29 (unassigned in kannada)
    'p', // ಪ kn2a kannada pa  [devanagari: प 92A 2346]
    'f', // ಫ kn2b kannada pha  [devanagari: फ 92B 2347]
    'b', // ಬ kn2c kannada ba  [devanagari: ब 92C 2348]
    'B', // ಭ kn2d kannada bha  [devanagari: भ 92D 2349]
    'm', // ಮ kn2e kannada ma  [devanagari: म 92E 2350]
    'y', // ಯ kn2f kannada ya  [devanagari: य 92F 2351]
    'r', // ರ kn30 kannada ra  [devanagari: र 930 2352]
    'r', // ಱ kn31 kannada rra  [devanagari: ऱ 931 2353]
    'l', // ಲ kn32 kannada la  [devanagari: ल 932 2354]
    'l', // ಳ kn33 kannada lla  [devanagari: ळ 933 2355]
    '', // kn34 (unassigned in kannada)
    'w', // ವ kn35 kannada va  [devanagari: व 935 2357]
    'S', // ಶ kn36 kannada sha  [devanagari: श 936 2358]
    's', // ಷ kn37 kannada ssa  [devanagari: ष 937 2359]
    's', // ಸ kn38 kannada sa  [devanagari: स 938 2360]
    'H', // ಹ kn39 kannada ha  [devanagari: ह 939 2361   (xi52; font draws H with a dot on top)]
    '', // kn3a (unassigned in kannada)
    '', // kn3b (unassigned in kannada)
    '', // ಼ kn3c kannada sign nukta  [devanagari: ़ 93C 2364 nukta]
    '!', // ಽ kn3d kannada sign avagraha  [devanagari: ऽ 93D 2365 avagraha]
    'a', // ಾ kn3e kannada vs aa  [devanagari: ा 93E 2366]
    'i', // ಿ kn3f kannada vs i  [devanagari: ि 93F 2367]
    'i', // ೀ kn40 kannada vs ii  [devanagari: ी 940 2368]
    'u', // ು kn41 kannada vs u  [devanagari: ु 941 2369]
    'u', // ೂ kn42 kannada vs uu  [devanagari: ू 942 2370]
    'ri', // ೃ kn43 kannada vs vocalic r  [devanagari: ृ 943 2371]
    'r', // ೄ kn44 kannada vs vocalic rr  [devanagari: ॄ 944 2372]
    '', // kn45 (unassigned in kannada)
    'e', // ೆ kn46 kannada vs e  [devanagari: ॆ 946 2374]
    'e', // ೇ kn47 kannada vs ee  [devanagari: े 947 2375]
    'ye', // ೈ kn48 kannada vs ai  [devanagari: ै 948 2376]
    '', // kn49 (unassigned in kannada)
    'oe', // ೊ kn4a kannada vs o  [devanagari: ॊ 94A 2378]
    'o', // ೋ kn4b kannada vs oo  [devanagari: ो 94B 2379]
    'ou', // ೌ kn4c kannada vs au  [devanagari: ौ 94C 2380]
    '', // ್ kn4d kannada sign virama  [devanagari: ् 94D 2381 virama]
    '', // kn4e (unassigned in kannada)
    '', // kn4f (unassigned in kannada)
    '', // kn50 (unassigned in kannada)
    '', // kn51 (unassigned in kannada)
    '', // kn52 (unassigned in kannada)
    '', // kn53 (unassigned in kannada)
    '', // kn54 (unassigned in kannada)
    '', // ೕ kn55 kannada length mark (used with loanwords to lengthen the preceding vowel -- no single-token equivalent, left blank)
    '', // ೖ kn56 kannada ai length mark (used with loanwords -- no single-token equivalent, left blank)
    '', // kn57 (unassigned in kannada)
    '', // kn58 (unassigned in kannada)
    '', // kn59 (unassigned in kannada)
    '', // kn5a (unassigned in kannada)
    '', // kn5b (unassigned in kannada)
    '', // kn5c (unassigned in kannada)
    'n', // ೝ kn5d kannada nakaara pollu (dialectal n allophone, mapped to the base n sound)
    'f', // ೞ kn5e kannada fa  [devanagari: फ़ 95E 2398]
    '', // kn5f (unassigned in kannada)
    'ri', // ೠ kn60 kannada vocalic rr  [devanagari: ॠ 960 2400]
    'li', // ೡ kn61 kannada vocalic ll  [devanagari: ॡ 961 2401]
    'li', // ೢ kn62 kannada vs vocalic l  [devanagari: ॢ 962 2402]
    'li', // ೣ kn63 kannada vs vocalic ll  [devanagari: ॣ 963 2403]
    '', // kn64 (unassigned in kannada)
    '', // kn65 (unassigned in kannada)
    '0', // ೦ kn66 kannada digit zero  [devanagari: ० 966 2406]
    '1', // ೧ kn67 kannada digit one  [devanagari: १ 967 2407]
    '2', // ೨ kn68 kannada digit two  [devanagari: २ 968 2408]
    '3', // ೩ kn69 kannada digit three  [devanagari: ३ 969 2409]
    '4', // ೪ kn6a kannada digit four  [devanagari: ४ 96A 2410]
    '5', // ೫ kn6b kannada digit five  [devanagari: ५ 96B 2411]
    '6', // ೬ kn6c kannada digit six  [devanagari: ६ 96C 2412]
    '7', // ೭ kn6d kannada digit seven  [devanagari: ७ 96D 2413]
    '8', // ೮ kn6e kannada digit eight  [devanagari: ८ 96E 2414]
    '9', // ೯ kn6f kannada digit nine  [devanagari: ९ 96F 2415]
    '', // kn70 (unassigned in kannada)
    '', // ೱ kn71 kannada sign jihvamuliya (vedic voiceless velar fricative before k/kh -- no ascii equivalent, left blank)
    '', // ೲ kn72 kannada sign upadhmaniya (vedic voiceless bilabial fricative before p/ph -- no ascii equivalent, left blank)
    'N', // ೳ kn73 kannada sign combining anusvara above right (nasalization variant, same token as anusvara)
    '', // kn74 (unassigned in kannada)
    '', // kn75 (unassigned in kannada)
    '', // kn76 (unassigned in kannada)
    '', // kn77 (unassigned in kannada)
    '', // kn78 (unassigned in kannada)
    '', // kn79 (unassigned in kannada)
    '', // kn7a (unassigned in kannada)
    '', // kn7b (unassigned in kannada)
    '', // kn7c (unassigned in kannada)
    '', // kn7d (unassigned in kannada)
    '', // kn7e (unassigned in kannada)
    '' // kn7f (unassigned in kannada)
  ],
  // NOTE: inherited unchanged from the devanagari table this file was
  // seeded from -- not verified against kannada, and (like in u10_map.ts)
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
