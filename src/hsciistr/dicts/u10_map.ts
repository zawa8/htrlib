export const U10_MAP = {
  ///////kKzZtTdDjJqQnpfbBmyrlwSsɦ
  unicode_hindi_array: [
    '', // ऀ d80
    'N', // ँ d81 CANDRABINDU
    'N', // ं d82 nbindu
    ':', // ः d83 visarga
    'e', // ऄ d84
    'A', // अ d85 letter a
    'Aa', // आ d86 letter aa
    'AE', // इ d87 letter ae
    'ae', // ई d88 letter aae
    'AI', // उ d89 letter i
    'AI', // ऊ d8a letter ii
    'AU', // ऋ d8b = sinhala letter u
    'AU', // ऌ d8c = sinhala letter uu
    'r', // ऍ d8d volalic r
    'ri', // ऎ d8e vocalic rr
    'l', // ए d8f volalic l
    'li', // ऐ d90 volalic ll
    'AE', // ऑ d91 letter e
    'AE', // ऒ d92 letter ee
    'AE', // ओ d93 = sinhala letter ai
    'AO', // औ d94 = sinhala letter o
    'AO', // क d95 = sinhala letter oo
    'AO', // ख d96 = sinhala letter au
    '', // ग d97 null
    '', // घ d98 null
    '', // ङ d99 null
    'k', // च d9a ka
    'K', // छ d9b kha
    'g', // ज d9c ga
    'gh', // झ d9d gha
    'N', // ञ d9e nga
    'N', // ट d9f nnga
    'ch', // ठ da0 ch
    'Ch', // ड da1 chh
    'z', // ढ da2 za
    'Z', // ण da3 zha
    'n', // त da4 = sinhala letter nya
    'n', // थ da5 = sinhala letter jnya
    'n', // द da6 = sinhala letter nyja
    't', // ध da7 = sinhala letter tta
    'T', // न da8 = sinhala letter ttha
    'd', // ऩ da9 = sinhala letter dda
    'D', // प daa = sinhala letter ddha
    'n', // फ dab = sinhala letter nna
    'n', // ब dac = sinhala letter nndda
    'j', // भ dad = sinhala letter тa
    'J', // म dae = sinhala letter тha
    'q', // य daf = sinhala letter ԃa
    'Q', // र db0 = sinhala letter ԃha
    'n', // ऱ db1 = sinhala letter na
    '', // ल db2 =null
    'nq', // ळ db3 = sinhala letter nԃa
    'p', // ऴ db4 = sinhala letter pa
    'f', // व db5 = sinhala letter pha
    'b', // श db6 = sinhala letter ba
    'B', // ष db7 = sinhala letter bha
    'm', // स db8 = sinhala letter ma
    'mb', // ह db9 = sinhala letter mba
    'y', // ऺ dba = sinhala letter ya
    'r', // ऻ dbb = sinhala letter ra
    '', // ़ dbc =null
    'l', // ऽ dbd = sinhala letter la (dental)
    '', // ा dbe =null
    '', // ि dbf =null
    'w', // ी dc0 = sinhala letter va
    'S', // ु dc1 = sinhala letter sha
    's', // ू dc2 = sinhala letter ssa
    's', // ृ dc3 = sinhala letter sa (dental)
    'H', // ॄ dc4 = sinhala letter ha
    'l', // ॅ dc5 = sinhala letter lla
    'f', // ॆ dc6 = sinhala letter fa
    '', // े dc7 =null
    '', // ै dc8 =null
    '', // ॉ dc9 =null
    '', // ॊ dca = virama
    '', // ो dcb =null
    '', // ौ dcc =null
    '', // ् dcd =null
    '', // ॎ dce =null
    'a', // ॏ dcf = sinhala vowel sign aa
    'e', // ॐ dd0 = sinhala vowel sign ae
    'ae', // ॑ dd1 = sinhala vowel sign aae
    'i', // ॒ dd2 = sinhala vowel sign i
    'i', // ॓ dd3 = sinhala vowel sign ii
    'u', // ॔ dd4 = sinhala vowel sign u
    '', // ॕ dd5 =null
    'u', // ॖ dd6 = sinhala vowel sign uu
    '', // ॗ dd7 =null
    'ri', // क़ dd8 = sinhala vowel sign vocalic r
    'e', // ख़ dd9 = sinhala vowel sign e
    'e', // ग़ dda = sinhala vowel sign ee
    'ye', // ज़ ddb = sinhala vowel sign ai
    'o', // ड़ ddc = sinhala vowel sign o
    'o', // ढ़ ddd = sinhala vowel sign oo
    'o', // फ़ dde = sinhala vowel sign au
    'l', // य़ ddf = sinhala vowel sign vocalic l
    '', // ॠ de0 =null
    '', // ॡ de1 =null
    '', // ॢ de2 =null
    '', // ॣ de3 =null
    '', // । de4 =null
    '', // ॥ de5 =null
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
    '', // ॰ df0 =null
    '', // ॱ df1 =null
    'ri', // ॲ df2 = sinhala vowel sign vocalic rr
    'li', // ॳ df3 = sinhala vowel sign vocalic ll
    '.', // ॴ df4 eotext
    '', // ॵ df5
    '', // ॶ df6
    '', // ॷ df7
    '', // ॸ df8
    '', // ॹ df9
    '', // ॺ dfa
    '', // ॻ dfb
    '', // ॼ dfc
    '', // ॽ dfd
    '', // ॾ dfe
    '' // ॿ dff
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
