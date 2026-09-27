import { hsciistr } from "../src/hsciistr_file";

describe("static dictionaries (shape sanity)", () => {
  test("e52_x38_translatecode_dict covers all 11 xnglo indic scripts, x* and u* families", () => {
    const keys = Object.keys(hsciistr.e52_x38_translatecode_dict).sort();
    const x = ["xb38", "xg38", "xj38", "xm38", "xmr38", "xo38", "xp38", "xs38", "xt38", "xh38", "xk38"];
    const u = ["ub38", "ug38", "uj38", "um38", "umr38", "uo38", "up38", "us38", "ut38", "uh38", "uk38"];
    expect(keys).toEqual([...x, ...u].sort());
  });

  test("itc_code_dict entries all end in -t-i0-und", () => {
    for (const code of Object.values(hsciistr.itc_code_dict) as string[]) {
      expect(code.endsWith("-t-i0-und")).toBe(true);
    }
  });
});
