// SCAFFOLD NOTICE: this file currently holds the SAME table as the
// original shared u9_map.ts (Devanagari-derived), seeded here as a
// placeholder while u1..u9 were split out one-per-script (previously
// all 9 ISCII-aligned scripts -- Devanagari, Bengali, Gurmukhi, Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam --
// shared one table, per CLAUDE.md's original "u9: 9 indian writing
// scripts" design). This split is structural only so far: NO behavior
// change yet (still Devanagari values for every script). u4_map.ts is
// for Gujarati (gujarati, block U+0A80-U+0AFF) and its
// entries need verifying/rewriting against Gujarati's own Unicode chart
// (letters, matras, digits) the same way u10_map.ts (sinhala) was done --
// see u10_map.ts's own top-of-file note and the commit history around it
// for the method (unicodedata name-matching, not raw offset-copying).

// xi52 convention: aspirated stops use two-letter digraphs (Dh, dh, Th, th),
// unaspirated stops use single letters (D, d, T, t).
// ह → H (font draws H with an extra dot).
// व → w.
// See xi38_xi52_table.md at repo root for the full mapping and rationale.
export const U4_MAP = {
  unicode_hindi_array: [
    '',   // ऀ 900 2304 inverted candrabindu
    'N',  // ँ 901 2305 anunasika (candrabindu)
    'N',  // ं 902 2306 anusvara bindu
    ':',  // ः 903 2307 visarga
    'Ae', // ऄ 904 2308 short a
    'A',  // अ 905 2309
    'a',  // आ 906 2310
    '_i', // इ 907 2311
    '_i', // ई 908 2312
    '_u', // उ 909 2313
    '_u', // ऊ 90A 2314
    'ri', // ऋ 90B 2315
    'li', // ऌ 90C 2316
    '_e', // ऍ 90D 2317 candra e
    '_e', // ऎ 90E 2318 short e
    '_e', // ए 90F 2319
    '_e', // ऐ 910 2320
    'ao', // ऑ 911 2321 candra o
    '_o', // ऒ 912 2322 short o
    'o',  // ओ 913 2323
    'ou', // औ 914 2324
    'k',  // क 915 2325
    'K',  // ख 916 2326
    'g',  // ग 917 2327
    'G',  // घ 918 2328
    'N',  // ङ 919 2329
    'c',  // च 91A 2330
    'C',  // छ 91B 2331
    'z',  // ज 91C 2332
    'Z',  // झ 91D 2333
    'n',  // ञ 91E 2334
    't',  // ट 91F 2335
    'th',  // ठ 920 2336   (xi52 aspirated retroflex)
    'd',  // ड 921 2337
    'dh', // ढ 922 2338   (xi52 aspirated retroflex, lowercase dh)
    'n',  // ण 923 2339
    'T',  // त 924 2340   (xi52 unaspirated dental)
    'Th',  // थ 925 2341   (xi52 aspirated dental)
    'D',  // द 926 2342
    'Dh', // ध 927 2343   (xi52 aspirated dental, capital Dh)
    'n',  // न 928 2344
    'n',  // ऩ 929 2345
    'p',  // प 92A 2346
    'f',  // फ 92B 2347
    'b',  // ब 92C 2348
    'B',  // भ 92D 2349
    'm',  // म 92E 2350
    'y',  // य 92F 2351
    'r',  // र 930 2352
    'r',  // ऱ 931 2353
    'l',  // ल 932 2354
    'l',  // ळ 933 2355
    'l',  // ऴ 934 2356
    'w',  // व 935 2357
    'S',  // श 936 2358
    's',  // ष 937 2359
    's',  // स 938 2360
    'H',  // ह 939 2361   (xi52; font draws H with a dot on top)
    'oe', // ऺ 93A 2362
    'ui', // ऻ 93B 2363
    '',   // ़ 93C 2364 nukta
    '!',  // ऽ 93D 2365 avagraha
    'a',  // ा 93E 2366
    'i',  // ि 93F 2367
    'i',  // ी 940 2368
    'u',  // ु 941 2369
    'u',  // ू 942 2370
    'ri', // ृ 943 2371
    'r',  // ॄ 944 2372
    'e',  // ॅ 945 2373
    'e',  // ॆ 946 2374
    'e',  // े 947 2375
    'ye', // ै 948 2376
    'o',  // ॉ 949 2377
    'oe', // ॊ 94A 2378
    'o',  // ो 94B 2379
    'ou', // ौ 94C 2380
    '',   // ् 94D 2381 virama
    '',   // ॎ 94E 2382
    'ou', // ॏ 94F 2383
    'om', // ॐ 950 2384
    '',   // ॑ 951 2385
    '',   // ॒ 952 2386
    '`',  // ॓ 953 2387
    "'",  // ॔ 954 2388
    'eei',// ॕ 955 2389
    'ui', // ॖ 956 2390
    'uui',// ॗ 957 2391
    'k',  // क़ 958 2392
    'K',  // ख़ 959 2393
    'g',  // ग़ 95A 2394
    'z',  // ज़ 95B 2395
    'R',  // ड़ 95C 2396   (xi52: ड़ = ढ़ = R)
    'R',  // ढ़ 95D 2397   (xi52: ढ़ = ड़ = R)
    'f',  // फ़ 95E 2398
    'y',  // य़ 95F 2399
    'ri', // ॠ 960 2400
    'li', // ॡ 961 2401
    'li', // ॢ 962 2402
    'li', // ॣ 963 2403
    '.',  // । 964 2404
    '.',  // ॥ 965 2405
    '0',  // ० 966 2406
    '1',  // १ 967 2407
    '2',  // २ 968 2408
    '3',  // ३ 969 2409
    '4',  // ४ 96A 2410
    '5',  // ५ 96B 2411
    '6',  // ६ 96C 2412
    '7',  // ७ 96D 2413
    '8',  // ८ 96E 2414
    '9',  // ९ 96F 2415
    '_',  // ॰ 970 2416
    '__', // ॱ 971 2417
    'A',  // ॲ 972 2418
    'Ao', // ॳ 973 2419
    'Ao', // ॴ 974 2420
    'Ao', // ॵ 975 2421
    'ui', // ॶ 976 2422
    'ui', // ॷ 977 2423
    'D',  // ॸ 978 2424
    'Z',  // ॹ 979 2425
    'y',  // ॺ 97A 2426
    'n',  // ॻ 97B 2427
    'z',  // ॼ 97C 2428
    '?',  // ॽ 97D 2429
    'd',  // ॾ 97E 2430
    'b'   // ॿ 97F 2431
  ],
  hard_consonants_modulo_list: [
    0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
    0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
  ],
  vovli_modulo_list: [
    0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
    0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
  ]
};
