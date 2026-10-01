/* in uh below are there :
    Vowels: अ आ इ ई उ ऊ ऋ ए ऐ ओ औ | Consonants: क ख ग घ ङ | च छ ज झ ञ | ट ठ ड ढ ण | त थ द ध न | प फ ब भ म | य र ल व | श ष स ह | Special/Modified: क्ष त्र ज्ञ श्र | ड़ ढ़ | क़ ख़ ग़ ज़ फ़ |
   but in uh38 below are there :
  vowels अ a i u e o h | Consonants: क ख ग घ  | च छ ज झ | ट ठ ड ढ | त थ द ध न | प फ ब भ म | य र ल व | श स ह ड़
*/
import { hsciistr } from "../src/hsciistr_file";

describe("uten_to_u38 testcases", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.uten_to_u38();
    return h.output.u38;
  };
  test("uten_to_u38 testcase5", () => {
    expect( run("आज के कंप्यूटर युग में कंप्यूटर, सॉफ्टवेयर और डॉट्स (dots) जैसी आधुनिक तकनीकों के माध्यम से इन दुर्लभ प्रतीकों को अक्षुण्ण रखने का प्रयास जारी है।") )
	.toBe("अaज कe कमपयuटर यuग मe कमपयuटर, सaफटवeयर अuर डaटस (dots) जयeसi अaधuनiक तकनiकo कe मaधयम सe इन दuरलभ परतiकo कo अकशuनन रखनe कa परयaस जaरi हयe.");
  });
	
  test("uten_to_u38 testcase4", () => {
    expect( run("क़ ख़ ग़ ज़ फ़।") ).toBe("क ख ग ज फ.");
  });

  test("uten_to_u38 testcase4", () => {
    expect( run("जाऊँ दुआ कई(කඊ) पढ़ाई कउआ") ).toBe("जau दua कयi(කයi) पड़ai कअua");
  });
  
  test("uten_to_u38 testcase1", () => {
    expect(
      run(
        "ऋषि के आश्रम में (गंगा) किनारे बैठकर शिष्यों ने वाङ्गमय और चञ्चल मन को एकाग्र करने का पाठ सीखा।"
      )
    ).toBe("रiसi कe अaशरम मe (गनगa) कiनaरe बयeठकर शiसयo नe वaनगमय ouर चनचल मन कo eकaगर करनe कa पaठ सiखa");
  });

  test("uten_to_u38 testcase2", () => {
    expect(run("अनार")).toBe("अनaर");
  });

  test("uten_to_u38 testcase3", () => {
    expect(run("नमस्ते")).toBe("नमसतe");
  });
});
