##### steps to chnage this library, update version and publish
1. du changes and test
    1. write tests to test chages in sometest.test.ts file and sAve in __tests__ tree.
    2. npm install ; npm run test
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


##### hsciistr => open hsciistr.md 
1. [about hsciistr](https://github.com/zawa8/hsciistr/blob/typescript/hsciistr.md)

[martinpersson article][article1]

[article1]: https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a