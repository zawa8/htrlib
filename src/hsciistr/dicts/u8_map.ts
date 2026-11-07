// u8_map.ts: kannada, block U+0C80-U+0CFF. ISCII-aligned with Dewnagri
// (same phoneme at the same block-relative offset -- क and ಕ are both KA
// at offset 0x15), including kannada's separate short/long e and o
// (offsets 0x0e/0x0f and 0x12/0x13 line up with Dewnagri's own
// short-e/e and short-o/o slots there). Entries at offsets kannada
// assigns a letter keep the Dewnagri-derived xi38 value; offsets
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
    'N', // ಁ kn01 kannada sign candrabindu  [Dewnagri: ँ 901 2305 anunasika (candrabindu)]
    'N', // ಂ kn02 kannada sign anusvara  [Dewnagri: ं 902 2306 anusvara bindu]
    ':', // ಃ kn03 kannada sign visarga  [Dewnagri: ः 903 2307 visarga]
    '', // ಄ kn04 kannada sign siddham (auspicious opening mark, not phonetic -- left blank)
    'A', // ಅ kn05 kannada a  [Dewnagri: अ 905 2309]
    'aa', // ಆ kn06 kannada aa  [Dewnagri: आ 906 2310]
    '_i', // ಇ kn07 kannada i  [Dewnagri: इ 907 2311]
    '_i', // ಈ kn08 kannada ii  [Dewnagri: ई 908 2312]
    '_u', // ಉ kn09 kannada u  [Dewnagri: उ 909 2313]
    '_u', // ಊ kn0a kannada uu  [Dewnagri: ऊ 90A 2314]
    'ri', // ಋ kn0b kannada vocalic r  [Dewnagri: ऋ 90B 2315]
    'li', // ಌ kn0c kannada vocalic l  [Dewnagri: ऌ 90C 2316]
    '', // kn0d (unassigned in kannada)
    '_e', // ಎ kn0e kannada e  [Dewnagri: ऎ 90E 2318 short e]
    '_e', // ಏ kn0f kannada ee  [Dewnagri: ए 90F 2319]
    '_e', // ಐ kn10 kannada ai  [Dewnagri: ऐ 910 2320]
    '', // kn11 (unassigned in kannada)
    '_o', // ಒ kn12 kannada o  [Dewnagri: ऒ 912 2322 short o]
    'o', // ಓ kn13 kannada oo  [Dewnagri: ओ 913 2323]
    'Au', // ಔ kn14 kannada au  [Dewnagri: औ 914 2324]
    'k', // ಕ kn15 kannada ka  [Dewnagri: क 915 2325]
    'kh', // ಖ kn16 kannada kha  [Dewnagri: ख 916 2326]
    'g', // ಗ kn17 kannada ga  [Dewnagri: ग 917 2327]
    'gh', // ಘ kn18 kannada gha  [Dewnagri: घ 918 2328]
    'N', // ಙ kn19 kannada nga  [Dewnagri: ङ 919 2329]
    'c', // ಚ kn1a kannada ca  [Dewnagri: च 91A 2330]
    'ch', // ಛ kn1b kannada cha  [Dewnagri: छ 91B 2331]
    'z', // ಜ kn1c kannada ja  [Dewnagri: ज 91C 2332]
    'zh', // ಝ kn1d kannada jha  [Dewnagri: झ 91D 2333]
    'n', // ಞ kn1e kannada nya  [Dewnagri: ञ 91E 2334]
    't', // ಟ kn1f kannada tta  [Dewnagri: ट 91F 2335]
    'th', // ಠ kn20 kannada ttha  [Dewnagri: ठ 920 2336   (xi52 aspirated retroflex)]
    'd', // ಡ kn21 kannada dda  [Dewnagri: ड 921 2337]
    'dh', // ಢ kn22 kannada ddha  [Dewnagri: ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)]
    'n', // ಣ kn23 kannada nna  [Dewnagri: ण 923 2339]
    'T', // ತ kn24 kannada ta  [Dewnagri: त 924 2340   (xi52 unaspirated dental)]
    'Th', // ಥ kn25 kannada tha  [Dewnagri: थ 925 2341   (xi52 aspirated dental)]
    'D', // ದ kn26 kannada da  [Dewnagri: द 926 2342]
    'Dh', // ಧ kn27 kannada dha  [Dewnagri: ध 927 2343   (xi52 aspirated dental, capital Dh)]
    'n', // ನ kn28 kannada na  [Dewnagri: न 928 2344]
    '', // kn29 (unassigned in kannada)
    'p', // ಪ kn2a kannada pa  [Dewnagri: प 92A 2346]
    'f', // ಫ kn2b kannada pha  [Dewnagri: फ 92B 2347]
    'b', // ಬ kn2c kannada ba  [Dewnagri: ब 92C 2348]
    'bh', // ಭ kn2d kannada bha  [Dewnagri: भ 92D 2349]
    'm', // ಮ kn2e kannada ma  [Dewnagri: म 92E 2350]
    'y', // ಯ kn2f kannada ya  [Dewnagri: य 92F 2351]
    'r', // ರ kn30 kannada ra  [Dewnagri: र 930 2352]
    'r', // ಱ kn31 kannada rra  [Dewnagri: ऱ 931 2353]
    'l', // ಲ kn32 kannada la  [Dewnagri: ल 932 2354]
    'l', // ಳ kn33 kannada lla  [Dewnagri: ळ 933 2355]
    '', // kn34 (unassigned in kannada)
    'w', // ವ kn35 kannada va  [Dewnagri: व 935 2357]
    'sh', // ಶ kn36 kannada sha  [Dewnagri: श 936 2358]
    's', // ಷ kn37 kannada ssa  [Dewnagri: ष 937 2359]
    's', // ಸ kn38 kannada sa  [Dewnagri: स 938 2360]
    'v', // kn39 ಹ=v=∀=ಹ dewanagri: ह 939 2361
    '', // kn3a (unassigned in kannada)
    '', // kn3b (unassigned in kannada)
    '', // ಼ kn3c kannada sign nukta  [Dewnagri: ़ 93C 2364 nukta]
    '!', // ಽ kn3d kannada sign avagraha  [Dewnagri: ऽ 93D 2365 avagraha]
    'a', // ಾ kn3e kannada vs aa  [Dewnagri: ा 93E 2366]
    'i', // ಿ kn3f kannada vs i  [Dewnagri: ि 93F 2367]
    'i', // ೀ kn40 kannada vs ii  [Dewnagri: ी 940 2368]
    'u', // ು kn41 kannada vs u  [Dewnagri: ु 941 2369]
    'u', // ೂ kn42 kannada vs uu  [Dewnagri: ू 942 2370]
    'ri', // ೃ kn43 kannada vs vocalic r  [Dewnagri: ृ 943 2371]
    'r', // ೄ kn44 kannada vs vocalic rr  [Dewnagri: ॄ 944 2372]
    '', // kn45 (unassigned in kannada)
    'e', // ೆ kn46 kannada vs e  [Dewnagri: ॆ 946 2374]
    'e', // ೇ kn47 kannada vs ee  [Dewnagri: े 947 2375]
    'ye', // ೈ kn48 kannada vs ai  [Dewnagri: ै 948 2376]
    '', // kn49 (unassigned in kannada)
    'oe', // ೊ kn4a kannada vs o  [Dewnagri: ॊ 94A 2378]
    'o', // ೋ kn4b kannada vs oo  [Dewnagri: ो 94B 2379]
    'ou', // ೌ kn4c kannada vs au  [Dewnagri: ौ 94C 2380]
    '', // ್ kn4d kannada sign virama  [Dewnagri: ् 94D 2381 virama]
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
    'f', // ೞ kn5e kannada fa  [Dewnagri: फ़ 95E 2398]
    '', // kn5f (unassigned in kannada)
    'ri', // ೠ kn60 kannada vocalic rr  [Dewnagri: ॠ 960 2400]
    'li', // ೡ kn61 kannada vocalic ll  [Dewnagri: ॡ 961 2401]
    'li', // ೢ kn62 kannada vs vocalic l  [Dewnagri: ॢ 962 2402]
    'li', // ೣ kn63 kannada vs vocalic ll  [Dewnagri: ॣ 963 2403]
    '', // kn64 (unassigned in kannada)
    '', // kn65 (unassigned in kannada)
    '0', // ೦ kn66 kannada digit zero  [Dewnagri: ० 966 2406]
    '1', // ೧ kn67 kannada digit one  [Dewnagri: १ 967 2407]
    '2', // ೨ kn68 kannada digit two  [Dewnagri: २ 968 2408]
    '3', // ೩ kn69 kannada digit three  [Dewnagri: ३ 969 2409]
    '4', // ೪ kn6a kannada digit four  [Dewnagri: ४ 96A 2410]
    '5', // ೫ kn6b kannada digit five  [Dewnagri: ५ 96B 2411]
    '6', // ೬ kn6c kannada digit six  [Dewnagri: ६ 96C 2412]
    '7', // ೭ kn6d kannada digit seven  [Dewnagri: ७ 96D 2413]
    '8', // ೮ kn6e kannada digit eight  [Dewnagri: ८ 96E 2414]
    '9', // ೯ kn6f kannada digit nine  [Dewnagri: ९ 96F 2415]
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
  // NOTE: inherited unchanged from the Dewnagri table this file was
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
