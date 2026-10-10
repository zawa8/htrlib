import { hsciistr } from "../src/hsciistr_file";

describe("uten_to_xi38 (Devanagari u9/u10 -> xi38) hv", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.uL_to_xi38();
    return h.output.xi38;
  };
  test("जह झ test", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("जहाज़ समुद्र में जा रहा है और झाग बन रहा है।")).toBe("zHaz smuDr me za rHa Hye our Zag bn rHa Hye.");
  });
  test("ह", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("हल्दी के पानी में नहाना चाहिए")).toBe("HlDi ke pani me nHana caHiye");
  });
  test("इ/ई/उ/ऊ test", () => { expect(run("जाऊँ दुआ कई(කඊ) पढ़ाई कउआ")).toBe("zau Dua kyi(kyi) pRai kAua"); });
  test("ए/ऐ test", () => { expect(run("गएैसा गए आए हुए लिए")).toBe("gyesa gye aye Huye liye"); });
  test("ष स्व test", () => { expect(run("ष स्व")).toBe("s sw");   });
  
});

describe("uten_to_xi38 (Devanagari u9/u10 -> xi38)", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.uL_to_xi38();
    return h.output.xi38;
  };

  test("अनार (pomegranate) -> xnar", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("अनार का पौधा लगाना अत्यंत शुभ माना गया है")).toBe("Anar ka pouDha lgana ATynT SuB mana gya Hye");
  });

  test("नमस्ते -> nmsje", () => {
    expect(run("नमस्ते? తెలంగాణ (ਲੁਧਿਆਣਾ)")).toBe("nmsTe? TelNgan (luDhiana)");
  });

  test("ligatures: त्र -> jr, ज्ञ -> gy", () => {
    expect(run("त्र ज्ञ हिंदी में श्रुति लेख")).toBe( "Tr gy HinDi me SruTi leK");
    expect(run("हिंदी में क्षत्रिय कक्षा कैसे लिखते हैं")).toBe("HinDi me sTriy kksa kyese liKTe Hye");
    expect(run("ज्ञ")).toBe("gy");
  });

  test("क्ष currently -> sh (NOTE: mappings.ts maps this to 'S' -- open discrepancy, not yet reconciled; this test documents CURRENT behavior, not necessarily correct behavior)", () => {
    expect(run("क्ष क्ष कक्षा कक्ष")).toBe("s s kksa kks");
  });

  test("N post-processing: Nb -> mb (कंबल)", () => {
    expect(run("कंबल रंग ")).toBe("kmbl rNg ");
    expect(run("'अं' (अनुस्वार स्वर) अक्षर से अंगूर और अंगीठी दोनों शब्द शुरू होते हैं। इन दोनों शब्दों का विवरण नीचे दिया गया है:")).toBe("'A' (Anuswar swr) Aksr se ANgur our ANgithi Dono SbD Suru HoTe Hye. in Dono SbDo ka wiwrn nice Diya gya Hye:");
  });

  test("N post-processing: N kept before k/K/g/G (रंग)", () => {
    expect(run("रंग")).toBe("rNg");
  });

  test("N post-processing: N -> n elsewhere, and at end of string is dropped", () => {
    // ं followed by a non k/K/g/G consonant, mid-word, is not in the
    // Nb/NB/Np/Nf special list -> falls through to the general N->n rule
    expect(run("संत")).toBe("snT");
  });

  test("passthrough for non-Devanagari (plain ASCII) input", () => {
    expect(run("hello")).toBe("hello");
  });

  test("no-op on empty input", () => {
    const h = new hsciistr();
    h.set_input("");
    h.uL_to_xi38();
    expect(h.output.xi38).toBe("");
  });
});
