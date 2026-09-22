export const U10_MAP = {
  // devanagari char in comments is matched by OFFICIAL UNICODE CHARACTER NAME
  // (e.g. sinhala "ALPAPRAANA KAYANNA" == devanagari "KA"), not by raw block
  // offset — sinhala has 7 extra independent-vowel codepoints devanagari
  // doesn't, so offset-based alignment breaks starting at the consonants
  // (sinhala d9a=ka aligns to devanagari 0915=क, NOT to whatever sits at the
  // same relative offset in u9_map.ts). blank devanagari comment = sinhala
  // letter has no single-character devanagari equivalent (mostly the
  // "sanyaka" prenasalized consonants: ṅga, ñja, ṇḍa, nda, mba — these are
  // conjuncts in devanagari, not single letters) or devanagari doesn't
  // distinguish a short/long vowel pair sinhala does.
  ///////kKzZtTdDjJqQnpfbBmyrlwSsɦ
  unicode_hindi_array: [
    '', //   d80
    'N', // ँ d81 CANDRABINDU
    'N', // ं d82 nbindu
    ':', // ः d83 visarga
    'e', //   d84
    'A', // अ d85 letter a
    'Aa', // आ d86 letter aa
    'AE', // ऍ d87 letter ae
    'ae', // ऍ d88 letter aae
    '_i', // इ d89 letter i
    '_i', // ई d8a letter ii
    '_u', // उ d8b = sinhala letter u
    '_u', // ऊ d8c = sinhala letter uu
    'r', // ऋ d8d volalic r
    'ri', // ॠ d8e vocalic rr
    'l', // ऌ d8f volalic l
    'li', // ॡ d90 volalic ll
    '_e', // ऎ d91 letter e
    '_e', // ए d92 letter ee
    '_e', // ऐ d93 = sinhala letter ai
    '_o', // ऒ d94 = sinhala letter o
    '_o', // ओ d95 = sinhala letter oo
    '_o', // औ d96 = sinhala letter au
    '', //   d97 null
    '', //   d98 null
    '', //   d99 null
    'k', // क d9a ka
    'K', // ख d9b kha
    'g', // ग d9c ga
    'gh', // घ d9d gha
    'N', // ङ d9e nga
    'N', //   d9f nnga
    'ch', // च da0 ch
    'Ch', // छ da1 chh
    'z', // ज da2 za
    'Z', // झ da3 zha
    'n', // ञ da4 = sinhala letter nya
    'n', //   da5 = sinhala letter jnya
    'n', //   da6 = sinhala letter nyja
    't', // ट da7 = sinhala letter tta
    'th', // ठ da8 = sinhala letter ttha
    'd', // ड da9 = sinhala letter dda
    'dh', // ढ daa = sinhala letter ddha
    'n', // ण dab = sinhala letter nna
    'n', //   dac = sinhala letter nndda
    'T', // त dad = sinhala letter тa
    'Th', // थ dae = sinhala letter тha
    'D', // द daf = sinhala letter ԃa
    'Dh', // ध db0 = sinhala letter ԃha
    'n', // न db1 = sinhala letter na
    '', //   db2 =null
    'nq', //   db3 = sinhala letter nԃa
    'p', // प db4 = sinhala letter pa
    'f', // फ db5 = sinhala letter pha
    'b', // ब db6 = sinhala letter ba
    'B', // भ db7 = sinhala letter bha
    'm', // म db8 = sinhala letter ma
    'mb', //   db9 = sinhala letter mba
    'y', // य dba = sinhala letter ya
    'r', // र dbb = sinhala letter ra
    '', //   dbc =null
    'l', // ल dbd = sinhala letter la (dental)
    '', //   dbe =null
    '', //   dbf =null
    'w', // व dc0 = sinhala letter va
    'S', // श dc1 = sinhala letter sha
    's', // ष dc2 = sinhala letter ssa
    's', // स dc3 = sinhala letter sa (dental)
    'H', // ह dc4 = sinhala letter ha
    'l', // ळ dc5 = sinhala letter lla
    'f', // फ़ dc6 = sinhala letter fa
    '', //   dc7 =null
    '', //   dc8 =null
    '', //   dc9 =null
    '', // ् dca = virama
    '', //   dcb =null
    '', //   dcc =null
    '', //   dcd =null
    '', //   dce =null
    'a', // ा dcf = sinhala vowel sign aa
    'e', //   dd0 = sinhala vowel sign ae
    'ae', //   dd1 = sinhala vowel sign aae
    'i', // ि dd2 = sinhala vowel sign i
    'i', // ी dd3 = sinhala vowel sign ii
    'u', // ु dd4 = sinhala vowel sign u
    '', //   dd5 =null
    'u', // ू dd6 = sinhala vowel sign uu
    '', //   dd7 =null
    'ri', // ृ dd8 = sinhala vowel sign vocalic r
    'e', // ॆ dd9 = sinhala vowel sign e
    'e', // े dda = sinhala vowel sign ee
    'ye', // ै ddb = sinhala vowel sign ai
    'o', // ॊ ddc = sinhala vowel sign o
    'o', // ो ddd = sinhala vowel sign oo
    'o', // ौ dde = sinhala vowel sign au
    'l', // ॢ ddf = sinhala vowel sign vocalic l
    '', //   de0 =null
    '', //   de1 =null
    '', //   de2 =null
    '', //   de3 =null
    '', //   de4 =null
    '', //   de5 =null
    '0', // ० de6
    '1', // १ de7
    '2', // २ de8
    '3', // ३ de9
    '4', // ४ dea
    '5', // ५ deb
    '6', // ६ dec
    '7', // ७ ded
    '8', // ८ dee
    '9', // ९ def
    '', //   df0 =null
    '', //   df1 =null
    'ri', // ॄ df2 = sinhala vowel sign vocalic rr
    'li', // ॣ df3 = sinhala vowel sign vocalic ll
    '.', //   df4 eotext
    '', //   df5
    '', //   df6
    '', //   df7
    '', //   df8
    '', //   df9
    '', //   dfa
    '', //   dfb
    '', //   dfc
    '', //   dfd
    '', //   dfe
    '' //   dff
  ],
  // NOTE: these two lists were carried over positionally from u9_map.ts
  // (devanagari). Devanagari's implicit-schwa / modulo-based
  // hard-consonant & vowel detection formula does not carry over to
  // sinhala as-is (sinhala has no inherent schwa and its letter
  // ordering doesn't line up semantically with devanagari at the same
  // offsets). Currently unused by any consumer in src/ (only referenced
  // here in dicts/) — needs a sinhala-specific derivation before any
  // schwa/modulo logic is written against U10_MAP. Do not reuse the
  // u9 modulo formula for sinhala.
  hard_consonants_modulo_list: [
    0x1a, 0x1c, 0x20, 0x22, 0x27, 0x29, 0x2d, 0x2f, 0x33, 0x34, 0x36, 0x39,
    0x42, 0x43
  ],
  vovli_modulo_list: [
    0x6, 0x8, 0x9, 0xa, 0xb, 0xc, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
  ]
};
