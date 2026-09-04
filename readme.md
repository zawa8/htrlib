e52 is English (26+26)

u9 : 9 indian writing scripts
u10 : 9 indian writing scripts + 1 srilanka writing script

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

1. du changes and test
    1. write tests to test chages in sometest.test.ts file and sAve in __tests__ tree.
    2. npm install (after running qhis "htrlib\node_modules" dir gets created so gitignore node_modules
	3. npm run test (now __tests__  dir not present so skip qhis)
2. if tests passed then :
    1. npm login
    2. npm version patch  // --no-git-tag-version && npm publish --access public
(# Instead of patch, you can use 'minor' or 'major')
    3. npm publish

```
namespace hsciistr {
  export enum enum_from { ascii = 'ascii', indikunicode = 'indikunicode', ascii_and_indik = 'ascii_and_indik' };
  export enum enum_tu {
  all='all', inglish='inglish', korean='korean', russian='russian', hindi='hindi', bangla='bangla', gurmukhi='gurmukhi',
  guzrati='guzrati', oriya='oriya', tamil='tamil', kannada='kannada', telugu='telugu', malayalam='malayalam', sinhala='sinhala'
  };
}

class hsciistr {
  istr: string;
  
  ostrdict: { [key: string]: string } = {
    inglish: '', korean: '', russian: '', hindi: '', bangla: '', gurmukhi: '', guzrati: '', oriya: '', tamil: '', kannada: '', telugu: '', malayalam: '', sinhala: ''
  };
  
  constructor(from=hsciistr.enum_from.ascii_and_indik, tu=hsciistr.enum_tu.all) {
    this.from = from ;
    this.tu = tu ;
    this.istr = "";
  }
  from: hsciistr.enum_from;
  tu: hsciistr.enum_tu;

  setistr(istr: string): hsciistr { this.istr = istr; return this; }
  setfromstr(fromstr: hsciistr.enum_from): hsciistr { this.from = fromstr; return this; }
  settostr(tostr: hsciistr.enum_tu): hsciistr { this.tu = tostr; return this; }

  duztr(): hsciistr { /** transliteration code */ return this; }

```

npm login details : hscii / punxmrazxn=  . i will get otp also.
https://addons.mozilla.org/en-US/firefox/users/edit : v..g_atrate_gmail.com name is hscii
https://addons.mozilla.org/en-US/firefox/user/17735318/ extensions 
https://addons.mozilla.org/en-US/firefox/addon/linguist84/

##### hsciistr => open hsciistr.md 
1. [about hsciistr](https://github.com/zawa8/hsciistr/blob/typescript/hsciistr.md)

2. hscii npmjs packages url : https://www.npmjs.com/settings/hscii/packages htrlib libhsciifp

[martinpersson article][article1]

[article1]: https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a
