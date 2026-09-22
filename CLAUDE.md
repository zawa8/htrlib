e52 is English (26+26)
e23 is English(abcdefghi klmnop rstu wxyz)
xe38 : xnglo_english 38 alphabets ( 26 a-z + 11 soft konsonants K G C Z T D J Q B S + velar nasal N always has 1 k/K/g/G next like kiNg , riNg etc)
u9 : 9 indian writing scripts
u10 : 9 indian writing scripts + 1 srilanka writing script

## dicts/ file layout (updated)
u9_map.ts used to be ONE shared table for all 9 ISCII-aligned scripts
(devanagari/bengali/gurmukhi/gujarati/oriya/tamil/telugu/kannada/malayalam
all route through the same offset-indexed array). That mostly worked
because those 9 scripts share ISCII's common code-point layout within
their own 0x80-wide block, so "offset 0x15 = ka sound" holds across all
of them -- but each script still has its own gaps/extra letters that a
single Devanagari-seeded table can't capture correctly.

Split into src/hsciistr/dicts/u1_map.ts .. u9_map.ts (one file per script,
same numbering as li 0x12..0x1a) + the pre-existing u10_map.ts (sinhala,
li 0x1b, NOT ISCII-aligned -- see its own top-of-file note). u1..u9 are
currently a STRUCTURAL split only: each file still holds the same
Devanagari-derived values as the old shared table (see the scaffold
notice at the top of each file), so there's no behavior change yet.
Populating each with its own script's real Unicode-chart data (the way
u10_map.ts/sinhala was done: unicodedata name-matching per letter, not
raw offset-copying -- see the u10_map.ts commit history) is still TODO,
script by script.
  u1 devanagari(hindi/marathi) u2 bengali u3 gurmukhi(punjabi) u4 gujarati
  u5 oriya(odia) u6 tamil u7 telugu u8 kannada u9 malayalam u10 sinhala
Dispatch table lives in src/hsciistr/u10_to_xi52.ts (LI_TO_MAP).

list of xnglo languages :
xe38(xnglo_english_in_38_chars)
xv38(xnglo_hindi) , xb38(xnglo_bengali), xmr38(xnglo_mrathi) , xg38(xnglo_guzrati),
xp38(xnglo_pnzabi) , xo38(xnglo_odia) , xj38(xnglo_telugu) , xt38(xnglo_tamil),
xm38(xnglo_malayalam) , xk38(xnglo_kannada)  , xs38(xnglo_sinhala),
xi38(xnglo_india=xv38/xb38/xmr38/xp38/xo38/xj38/xt38/xm38/xk38/xg38/xs38 is xnglo script for all 10 indian/srilankan languages.)

csv for xnglo phonetics (phonemes/graphemes) is ./xNglo_phoneme_grapheme.csv
xnglo script for all xnglo langauges is made up from albhabets present in ./xNglo_phoneme_grapheme.csv
these are 38 : a-z K G C Z T Q J Q N P B R S

this project is to create npmjs typescript library for transformation phrom/tu :
phrom(e52/u10/e52_u10) -> tu(e23/xe/xi/xv/xb/xp/xo/xj/xt/xm/xk/xs/xmr)

for e52->e23 there should be function e52_tu_e23. it should do transliterate as
replace("lover", "lwxr"). replace("never", "nxwxr"). replace("vest", "weist"). replace("vine", "wayin"). replace("vary", "wxyri"). replace("vet", "wyt"). replace("v", "w"). replace("j", "z"). replace("q", "k")

for u9 to xi38:
u9_to_xi38 character wise transliteration function based on mappings in ./u9_to_xi38.csv

for unicode_sinhala to xi38:
unicode_sinhala_to_xi38 character wise transliteration function based on mappings in ./u9_to_xi38.csv

for u10 to xi38:
u10_to_xi38  will call u9_to_xi38/unicode_sinhala_to_xi38 character wise transliteration function

for e52->xe38 :
1. e52->transliterate->punjabi('pa')->u10_to_xi->xe38

for e52 to xv38/xb38/xp38/xo38/xj38/xt38/xm38/xk38/xs38/xmr38
1. e52 to hindi/bengali/punzabi/odia/telugu/tamil/kannada/sinhala/marathi google translation.
2. translated text -> u10_to_xi -> xv/xb/xp/xo/xj/xt/xm/xk/xs/xmr
