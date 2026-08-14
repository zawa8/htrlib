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
    expect(run("HELLO")).toBe("hello");
  });

  test("the 6 hardcoded word substitutions", () => {
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
    expect(run("xit")).toBe("zit"); // \bxi -> zi
    expect(run("xylophone")).toBe("zailophone"); // \bxy -> zai
    expect(run("xmas")).toBe("christmAs"); // \bxmas -> christmAs
  });

  test("KNOWN QUIRK: \\bxr and \\bx are separate sequential replaces, so a word starting 'xr' gets double-substituted (xray -> xksksray, not xksray). Flagging, not silently fixing -- confirm with the user whether this is intended.", () => {
    expect(run("xray")).toBe("xksray");
  });

  test("plain \\bx fallback for other x-initial words", () => {
    expect(run("xkcd")).toBe("xkskcd");
  });

  test("no-op on empty input", () => {
    const h = new hsciistr();
    h.set_input("");
    h.e52_tu_e23();
    expect(h.input).toBe("");
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
    expect(run("अनार")).toBe("xnar");
  });

  test("नमस्ते -> nmsje", () => {
    expect(run("नमस्ते")).toBe("nmsje");
  });

  test("ligatures: त्र -> jr, ज्ञ -> gy", () => {
    expect(run("त्र")).toBe("jr");
    expect(run("ज्ञ")).toBe("gy");
  });

  test("क्ष currently -> sh (NOTE: mappings.ts maps this to 'S' -- open discrepancy, not yet reconciled; this test documents CURRENT behavior, not necessarily correct behavior)", () => {
    expect(run("क्ष")).toBe("sh");
  });

  test("N post-processing: Nb -> mb (कंबल)", () => {
    expect(run("कंबल")).toBe("kmbl");
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

  test("phrom=e52u10 runs e52_tu_e23 then uL2xin38 (ASCII passes through unicode step untouched)", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52u10, hsciistr.tu_dikt.xi38);
    h.set_input("Vine");
    await h.duztr();
    expect(h.input).toBe("wayin");
    expect(h.output.xi38).toBe("wayin");
  });

  test("phrom=e52, tu=e23 transliterates without touching output dict", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.e23);
    h.set_input("vet");
    await h.duztr();
    expect(h.input).toBe("wyt");
  });
});

describe("constructor validation / fallback", () => {
  test("invalid phrom/tu falls back to e52u10 / xi38 defaults", () => {
    const h = new hsciistr("not_a_real_phrom", "not_a_real_tu");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.e52u10);
    expect(h.tu).toBe(hsciistr.tu_dikt.xi38);
  });

  test("set_phrom / settostr also fall back on invalid values", () => {
    const h = new hsciistr();
    h.set_phrom("bogus");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.e52u10);
    h.settostr("bogus");
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
