import { hsciistr } from "../src/hsciistr_file";

describe("constructor validation / fallback", () => {
  test("invalid phrom/tu falls back to uL / xi38 defaults", () => {
    const h = new hsciistr("bogus", "bogxs");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.uL);
    expect(h.tu).toBe(hsciistr.tu_dikt.xi38);
  });

  test("set_phrom / set_tu also fall back on invalid values", () => {
    const h = new hsciistr();
    h.set_phrom("bogus");
    expect(h.phrom).toBe(hsciistr.phrom_dikt.uL);
    h.set_tu("bogus");
    expect(h.tu).toBe(hsciistr.tu_dikt.xi38);
  });
});
