/* in uh below are there :
    Vowels: अ आ इ ई उ ऊ ऋ ए ऐ ओ औ | Consonants: क ख ग घ ङ | च छ ज झ ञ | ट ठ ड ढ ण | त थ द ध न | प फ ब भ म | य र ल व | श ष स ह | Special/Modified: क्ष त्र ज्ञ श्र | ड़ ढ़ | क़ ख़ ग़ ज़ फ़ |
   but in uh38 below are there :
  vowels अ a i u e o h | Consonants: क ख ग घ  | च छ ज झ | ट ठ ड ढ | त थ द ध न | प फ ब भ म | य र ल व | श स ह ड़
    */
import { uten2u38 } from "../src/hsciistr/uten_to_u38";

describe("uten2u38 testcases", () => {
  test("uten2u38 testcase1", () => {
    expect(
      uten2u38(
        "ऋषि के आश्रम में (गंगा) किनारे बैठकर शिष्यों ने वाङ्गमय और चञ्चल मन को एकाग्र करने का पाठ सीखा।"
      )
    ).toBe("रiसi कe अaशरम मe (गनगa) कiनaरe बयeठकर शiसयo नe वaनगमय और चनचल मन कo eकaगर करनe कa पaठ सiखa");
  });

  test("uten2u38 testcase2", () => {
    expect(uten2u38("अनार")).toBe("अनaर");
  });

  test("uten2u38 testcase3", () => {
    expect(uten2u38("नमस्ते")).toBe("नमसतe");
  });
});
