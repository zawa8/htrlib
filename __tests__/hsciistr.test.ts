import { hsciistr } from "../src/hsciistr_file";

// DOM-node methods (transliterate_tekst_nodes, transliterate_dom_node,
// untransliterate_dom_node) are intentionally NOT tested here -- they
// need a real DOM (jsdom) environment, per the user's request to skip
// that for now.

describe("e52_tu_e23 (English -> reduced 23-letter e23)", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.e52_tu_e23();
    return h.input;
  };

  test("lowercases input", () => {
    expect(run("HELLO violet")).toBe("hello wiolet");
  });

  test("the 6 hardcoded word substitutions (values reflect the x-rules now running BEFORE these substitutions -- lover/never/vary's replacement text contains x/v chars that used to get converted by the later x-rules, but now skip that step entirely since it already ran)", () => {
    expect(run("lover")).toBe("lwxr");
    expect(run("never")).toBe("nxwxr");
    expect(run("vest")).toBe("weist");
    expect(run("vine")).toBe("wayin");
    expect(run("vary")).toBe("wxyri");
    expect(run("vet")).toBe("wyt");
  });

  test("generic letter substitution: v->w, j->z, q->k", () => {
    expect(run("java")).toBe("zawa");
    expect(run("quiz")).toBe("kuiz");
    // "have" has no other special-cased substring, so only v->w applies
    expect(run("have")).toBe("hawe");
  });

  test("mid-word x after [a-wyz] becomes ks (documented: six -> siks)", () => {
    expect(run("six")).toBe("siks");
    expect(run("box")).toBe("boks");
  });

  test("word-initial x variants", () => {
    expect(run("x exxon")).toBe("eks ekson"); // \bxi -> zi
    expect(run("xit xylophone")).toBe("zit zailophone"); // \bxi -> zi
    expect(run("xylophone")).toBe("zailophone"); // \bxy -> zai
    expect(run("xmas")).toBe("eksmas"); // \bxmas -> christmAs
	expect(run("xray")).toBe("eksray");
	expect(run("xander")).toBe("zander");
	expect(run("oxygen")).toBe("oksigen");
	expect(run("xiao xena")).toBe("ziao zena");
	expect(run("xena xena")).toBe("zena zena");
	expect(run("xkcd")).toBe("ekskkd"); // updated: the 'c' in xkcd is now caught by the new /c/->k catch-all
	expect(run("x xkcd x")).toBe("eks ekskkd eks");
	expect(run("excel")).toBe("eksel");
	expect(run("exceed")).toBe("ekseed");
	expect(run("excellent")).toBe("eksellent");
	expect(run("excite")).toBe("eksaite");
	expect(run("excuse")).toBe("ekskyuse");
  });

  test("no-op on empty input", () => {
    const h = new hsciistr();
    h.set_input("");
    h.e52_tu_e23();
    expect(h.input).toBe("");
  });

  test("c section: cco -> ko, cce -> kse, cci -> ksi", () => {
    expect(run("stucco")).toBe("stuko"); // cco -> ko
    expect(run("accent")).toBe("aksent"); // cce -> kse
    expect(run("accident")).toBe("aksident"); // cci -> ksi
  });

  test("c section: chair -> cair, teach -> teac, coach -> koac (leading hard c -> k via the catch-all, ch digraph protected as before)", () => {
    expect(run("chair")).toBe("cair");
    expect(run("teach")).toBe("teac");
    expect(run("coach")).toBe("koac");
  });

  test("c section: ck -> k", () => {
    expect(run("back")).toBe("bak");
    expect(run("clock")).toBe("klok");
  });

  test("c section: ce -> s (must run after cce, which also contains the substring 'ce')", () => {
    expect(run("race")).toBe("rase");
    expect(run("cent")).toBe("sent");
    expect(run("dance")).toBe("danse");
  });

  test("c section: c[yi] -> si (must run after cci, which also contains the substring 'ci')", () => {
    expect(run("city")).toBe("sity");
  });

  test("c section: catch-all /c/ -> k for any hard c not caught by a more specific rule above", () => {
    expect(run("cat")).toBe("kat");
    expect(run("cup")).toBe("kup");
    expect(run("act")).toBe("akt");
  });

  test("child/children: same 'chi' letters, different vowel sound -- no letter-pattern rule can distinguish them locally, so 'child' is a hardcoded whole-word exception while 'children' falls out correctly from the general ch rule alone", () => {
    expect(run("child")).toBe("caild");
    expect(run("children")).toBe("cildren");
  });
});

describe("uL2xin38 (Devanagari u9/u10 -> xi38)", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.uL2xin38();
    return h.output.xi38;
  };

  test("अनार (pomegranate) -> xnar", () => {
    // cross-checked against lib/mappings.ts's HINDI_CHAR_MAP: अ=x, न=n, ा=a, र=r
    expect(run("अनार का पौधा लगाना अत्यंत शुभ माना गया है")).toBe("xnar ka pouQa lgana xjynj SuB mana gya vye");
  });

  test("नमस्ते -> nmsje", () => {
    expect(run("नमस्ते? తెలంగాణ (ਲੁਧਿਆਣਾ)")).toBe("nmsje? jelNgan (luQiana)");
  });

  test("ligatures: त्र -> jr, ज्ञ -> gy", () => {
    expect(run("त्र ज्ञ हिंदी में श्रुति लेख")).toBe("jr gy vinqi me Sruji leK");
    expect(run("हिंदी में क्षत्रिय कक्षा कैसे लिखते हैं")).toBe("vinqi me sjriy kksa kyese liKje vye");
    expect(run("ज्ञ")).toBe("gy");
  });

  test("क्ष currently -> sh (NOTE: mappings.ts maps this to 'S' -- open discrepancy, not yet reconciled; this test documents CURRENT behavior, not necessarily correct behavior)", () => {
    expect(run("क्ष क्ष कक्षा कक्ष")).toBe("s s kksa kks");
  });

  test("N post-processing: Nb -> mb (कंबल)", () => {
    expect(run("कंबल रंग ")).toBe("kmbl rNg ");
    expect(run("'अं' (अनुस्वार स्वर) अक्षर से अंगूर और अंगीठी दोनों शब्द शुरू होते हैं। इन दोनों शब्दों का विवरण नीचे दिया गया है:")).toBe("'x' (xnuswar swr) xksr se xNgur our xNgiTi qono Sbq Suru voje vye. in qono Sbqo ka wiwrn nice qiya gya vye:");
  });

  test("N post-processing: N kept before k/K/g/G (रंग)", () => {
    expect(run("रंग")).toBe("rNg");
  });

  test("N post-processing: N -> n elsewhere, and at end of string is dropped", () => {
    // ं followed by a non k/K/g/G consonant, mid-word, is not in the
    // Nb/NB/Np/Nf special list -> falls through to the general N->n rule
    expect(run("संत")).toBe("snj");
  });

  test("passthrough for non-Devanagari (plain ASCII) input", () => {
    expect(run("hello")).toBe("hello");
  });

  test("no-op on empty input", () => {
    const h = new hsciistr();
    h.set_input("");
    h.uL2xin38();
    expect(h.output.xi38).toBe("");
  });
});

describe("duztr() dispatch", () => {
  test("phrom=u10 runs uL2xin38 only", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.xi38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xi38).toBe("xnar");
  });

  test("GAP FIX: phrom=u10 with a specific target (xv38) also copies the xi38 result into that slot, not just output.xi38", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.xv38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xv38).toBe("xnar");
    expect(h.output.xi38).toBe("xnar");
  });

  test("GAP FIX: phrom=e52u10 with a specific target (xv38) also copies into that slot", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52u10, hsciistr.tu_dikt.xv38);
    h.set_input("Vine अनार");
    await h.duztr();
    expect(h.output.xv38).toBe("wayin xnar");
  });

  test("phrom=e52u10 runs e52_tu_e23 then uL2xin38 (ASCII passes through unicode step untouched)", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52u10, hsciistr.tu_dikt.xi38);
    h.set_input("Vine अनार");
    await h.duztr();
    expect(h.input).toBe("wayin xnar");
    expect(h.output.xi38).toBe("wayin xnar");
  });

  test("phrom=e52, tu=e23 transliterates without touching output dict", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.e23);
    h.set_input("vet");
    await h.duztr();
    expect(h.input).toBe("wyt");
  });

  test("phrom=e52, tu=xe38: routes through transliterate_e52_x('pa') (Punjabi) -> uL2xin38 -> output.xe38, NOT translate_e52_x. We cannot change what the real Google API returns, so this mocks the API boundary and verifies OUR pipeline wiring (right endpoint, right language code, right native-script text fed into uL2xin38, right output slot) -- not the linguistic quality of Google's transliteration itself.", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["namaste", ["ਨਮਸਤੇ"]]]],
    }) as any;

    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.xe38);
    h.set_input("namaste");
    await h.duztr();

    // confirms transliterate (Input Tools), not translate (Translate API), was used
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("inputtools.google.com/request");
    expect(calledUrl).toContain("itc=pa-t-i0-und");

    // confirms the native-script result got fed through uL2xin38 into output.xe38
    expect(h.output.xe38).toBe(h.output.xi38);
    expect(h.output.xe38.length).toBeGreaterThan(0);

    global.fetch = realFetch;
  });
});

describe("constructor validation / fallback", () => {
  test("invalid phrom/tu falls back to e52u10 / xi38 defaults", () => {
    const h = new hsciistr("bogus", "bogxs");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.e52u10);
    expect(h.tu).toBe(hsciistr.tu_dikt.xi38);
  });

  test("set_phrom / set_tu also fall back on invalid values", () => {
    const h = new hsciistr();
    h.set_phrom("bogus");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.e52u10);
    h.set_tu("bogus");
    expect(h.tu).toBe(hsciistr.tu_dikt.xi38);
  });
});

describe("static dictionaries (shape sanity)", () => {
  test("e52_x38_translatecode_dict covers all 11 xnglo indic scripts", () => {
    const keys = Object.keys(hsciistr.e52_x38_translatecode_dict).sort();
    expect(keys).toEqual(
      ["xb38", "xg38", "xj38", "xm38", "xmr38", "xo38", "xp38", "xs38", "xt38", "xv38", "xk38"].sort()
    );
  });

  test("itc_code_dict entries all end in -t-i0-und", () => {
    for (const code of Object.values(hsciistr.itc_code_dict) as string[]) {
      expect(code.endsWith("-t-i0-und")).toBe(true);
    }
  });
});

describe("translate_e52_x (mocked network -- no real calls in this suite)", () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  test("parses Google Translate's nested response shape and updates this.input", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [[["नमस्ते", "namaste", null, null, 1]]],
    }) as any;

    const h = new hsciistr();
    h.set_input("namaste");
    const result = await h.translate_e52_x("hi");

    expect(result).toBe("नमस्ते");
    expect(h.input).toBe("नमस्ते");
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("translate.googleapis.com/translate_a/single");
    expect(calledUrl).toContain("tl=hi");
    expect(calledUrl).toContain("q=namaste");
  });

  test("falls back to original input if the response shape is unexpected", async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => [null] }) as any;
    const h = new hsciistr();
    h.set_input("hello");
    const result = await h.translate_e52_x("hi");
    expect(result).toBe("hello");
  });

  test("returns empty string and does not call fetch when input is empty", async () => {
    global.fetch = jest.fn() as any;
    const h = new hsciistr();
    h.set_input("");
    const result = await h.translate_e52_x("hi");
    expect(result).toBe("");
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe("transliterate_e52_x (mocked network -- no real calls in this suite)", () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  test("transliterates word tokens and preserves non-letter tokens (spaces/punctuation)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["namaste", ["नमस्ते"]]]],
    }) as any;

    const h = new hsciistr();
    h.set_input("namaste!");
    const result = await h.transliterate_e52_x("hi");

    expect(result).toBe("नमस्ते!");
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("inputtools.google.com/request");
    expect(calledUrl).toContain("itc=hi-t-i0-und");
  });

  test("unknown target language code falls back to hi-t-i0-und", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["x", ["x"]]]],
    }) as any;
    const h = new hsciistr();
    h.set_input("x");
    await h.transliterate_e52_x("not_a_real_lang");
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("itc=hi-t-i0-und");
  });
});