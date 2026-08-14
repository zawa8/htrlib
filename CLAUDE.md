e52 is English (26+26)
e23 is English(abcdefghi klmnop rstu wxyz)
xe38 : xnglo_english 38 alphabets ( 26 a-z + 11 soft konsonants K G C Z T D J Q B S + velar nasal N always has 1 k/K/g/G next like kiNg , riNg etc)
u9 : 9 indian writing scripts
u10 : 9 indian writing scripts + 1 srilanka writing script

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
