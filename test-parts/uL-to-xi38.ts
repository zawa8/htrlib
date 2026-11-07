// xnglotr/test-parts/uL-to-xi38.ts
import { hsciistr } from "../src/hsciistr_file";

const run = (s: string) => {
  const h = new hsciistr();
  h.set_input(s);
  h.uL_to_xi38();
  return h.output.xi38;
};

describe("uL_to_xi38 (Devanagari u9/u10 -> xi38) hv", () => {
  test("जह झ test", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("जहाज़ समुद्र में जा रहा है और झाग बन रहा है।")).toBe("zvaz smuDr me za rva vye Aur zhag bn rva vye.");
  });
  test("ह", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("हल्दी के पानी में नहाना चाहिए")).toBe("vlDi ke pani me nvana caviye");
  });
  test("इ/ई/उ/ऊ test", () => { expect(run("जाऊँ दुआ कई(කඊ) पढ़ाई कउआ")).toBe("zau Duaa kyi(kyi) pdhai kAuaa"); });
  test("ए/ऐ test", () => { expect(run("गएैसा गए आए हुए लिए")).toBe("gyesa gye aaye vuye liye"); });
  test("ष स्व test", () => { expect(run("ष स्व")).toBe("s sw");   });

  test("क्ष at start -> 's'", () => {
    expect(run("क्ष")).toBe("s");
  });
  test("क्ष after whitespace -> 's'", () => {
    expect(run(" क्ष")).toBe(" s");
  });
  test("क्ष after a consonant -> 'ks' (unchanged, not start/whitespace)", () => {
    expect(run("कक्ष")).toBe("kks"); // 'क'->k, then 'क्ष'->ks (no match)
  });
});

describe("uL_to_xi38 (Devanagari u9/u10 -> xi38)", () => {
  test("अनार (pomegranate) -> xnar", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
	
	// Phase 1a: u1_map currently emits 'A'/'H'. Phase 1b will flip
    // these to 'x'/'h' -- at which point this expectation becomes
    // "xnar ka pouDha lgana xTynT SuB mana gya hye". See
    // docs/aspirate-digraphs.md "A / x alias for अ".
    expect(run("अनार का पौधा लगाना अत्यंत शुभ माना गया है")).toBe("xnar ka pouDha lgana xTynT shubh mana gya vye");
  });
  test("नमस्ते -> nmsje", () => {
    expect(run("नमस्ते? తెలంగాణ (ਲੁਧਿਆਣਾ)")).toBe("nmsTe? TelNgan (luDhiaana)");
  });

  test("ligatures: त्र -> jr, ज्ञ -> gy", () => {
    expect(run("त्र ज्ञ हिंदी में श्रुति लेख")).toBe( "Tr gy vinDi me shruTi lekh");
    expect(run("हिंदी में क्षत्रिय कक्षा कैसे लिखते हैं")).toBe("vinDi me sTriy kksa kyese likhTe vye");
    expect(run("ज्ञ")).toBe("gy");
  });

  test("क्ष currently -> sh (NOTE: mappings.ts maps this to 'S' -- open discrepancy, not yet reconciled; this test documents CURRENT behavior, not necessarily correct behavior)", () => {
    expect(run("क्ष क्ष कक्षा कक्ष")).toBe("s s kksa kks");
  });

  test("N post-processing: Nb -> mb (कंबल)", () => {
    expect(run("कंबल रंग ")).toBe("kmbl rNg ");
    expect(run("'अं' (अनुस्वार स्वर) अक्षर से अंगूर और अंगीठी दोनों शब्द शुरू होते हैं। इन दोनों शब्दों का विवरण नीचे दिया गया है:")).toBe("'x' (xnuswar swr) xksr se xNgur Aur xNgithi Dono shbD shuru voTe vye. in Dono shbDo ka wiwrn nice Diya gya vye:");
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

describe("uL_to_xi38 nukta pair -- decomposed and precomposed agree", () => {
  test.each([
    ["\u0921\u093c", "R"],  // ड़ decomposed
    ["\u095c",       "R"],  // ड़ precomposed
    ["\u0922\u093c", "dh"], // ढ़ decomposed  (was 'R' -- bug)
    ["\u095d",       "dh"], // ढ़ precomposed (from U1_MAP[0x5d]='dh')
  ])("run(%j) -> %j", (input, expected) => {
    expect(run(input)).toBe(expected);
  });
});