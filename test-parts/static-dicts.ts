import { h5str } from "../src/hsciistr_file";
import { ITC_CODE_DICT } from "../src/hsciistr/dicts/codes";

describe("static dictionaries (shape sanity)", () => {
  test("ITC_CODE_DICT entries all end in -t-i0-und", () => {
    for (const code of Object.values(ITC_CODE_DICT)) {
      expect(code.endsWith("-t-i0-und")).toBe(true);
    }
  });

  test("LANG_DIKT covers all 10 uL languages, each with code/xiL38/xLS38", () => {
    const langs = Object.keys(h5str.LANG_DIKT).sort();
    expect(langs).toEqual(
      ["bangla", "gujarati", "gurmukhi", "hindi", "kannada", "malayalam", "oriya", "sinhala", "tamil", "telugu"].sort()
    );
    for (const entry of Object.values(h5str.LANG_DIKT)) {
      expect(entry.code).toMatch(/^[a-z]{2}$/);
      expect(entry.xiL38).toMatch(/^xi[a-z]38$/);
      expect(entry.xLS38).toMatch(/^x[a-z]s38$/);
    }
  });

  test("tu_dikt has e23/xe38/xi38 plus the xiL38 and xLS38 families, no generic u38", () => {
    const keys = Object.keys(h5str.tu_dikt).sort();
    const xiL38 = ["xih38", "xib38", "xip38", "xig38", "xio38", "xit38", "xij38", "xim38", "xik38", "xis38"];
    const xLS38 = ["xhs38", "xbs38", "xps38", "xgs38", "xos38", "xts38", "xjs38", "xms38", "xks38", "xss38"];
    expect(keys).toEqual(["e23", "xe38", "xi38", ...xiL38, ...xLS38].sort());
    expect(keys).not.toContain("u38");
    expect(keys).not.toContain("ui38");
  });
});
