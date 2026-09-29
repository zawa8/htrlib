import { hsciistr } from "../src/hsciistr_file";

describe("duztr() dispatch", () => {
  test("phrom=u10 runs uL2xi52 only", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.xi38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xi38).toBe("Anar");
  });

  test("GAP FIX: phrom=u10 with a specific target (xh38) also copies the xi38 result into that slot, not just output.xi38", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.xh38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xh38).toBe("Anar");
    expect(h.output.xi38).toBe("Anar");
  });

  test("phrom=u10 with the ui38 target is interchangeable with xi38 (phrom_tu.md items 5 & 6)", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.ui38);
    h.set_input("अनार");
    await h.duztr();
    // expect(h.output.ui38).toBe("अनaर");
    expect(h.output.xi38).toBe("Anar");
  });
/*
  test("phrom=u10 tu=ui38 ऋ श्र", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.ui38);
    h.set_input("ऋषि के आश्रम में (गंगा)");
    await h.duztr();
    expect(h.output.ui38).toBe("रiसi कe aशरम मe (गNगa)");
    expect(h.output.xi38).toBe("risi ke aSrm me (gNga)");
  });

  test("phrom=u10 tu=ui38 ऋ श्र 2", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.ui38);
    h.set_input("ऋषि के आश्रम में (गंगा) किनारे बैठकर शिष्यों ने वाङ्गमय और चञ्चल मन को एकाग्र करने का पाठ सीखा।");
    await h.duztr();
    expect(h.output.ui38).toBe("रiसi कe aशरम मe (गNगa) कiनaरe बयeठकर शiषयo नe वaNगमय और चनचल मन कo eकaगर करनe कa पaठ सiखa.");
    expect(h.output.xi38).toBe("risi ke aSrm me (gNga) kinare byethkr Sisyo ne waNgmy our cncl mn ko ekagr krne ka path siKa.");
  });
  
  test("phrom=u10 with a uh38 target: letters stay native, the ा matra converts to 'a', rest unchanged (phrom_tu.md's u* family)", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.uh38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.uh38).toBe("अनaर");
  });

  test("unicode(नमस्ते) -> uh38(नमसतe): letters stay native-script, marks convert to xi38 value, virama drops", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.uh38);
    h.set_input("नमस्ते");
    await h.duztr();
    expect(h.output.uh38).toBe("नमसतe");
  });
*/
  test("unicode(नमस्ते) -> xi38(nmsTe)", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.u10, hsciistr.tu_dikt.xi38);
    h.set_input("नमस्ते");
    await h.duztr();
    expect(h.output.xi38).toBe("nmsTe");
  });

  test("phrom=e52, tu=e23 transliterates without touching output dict", async () => {
    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.e23);
    h.set_input("vet");
    await h.duztr();
    expect(h.input).toBe("wyt");
  });

  test("phrom=e52, tu=xe38: routes through transliterate_e52_x('pa') (Punjabi) -> uL2xi52 -> output.xe38, NOT translate_e52_x. We cannot change what the real Google API returns, so this mocks the API boundary and verifies OUR pipeline wiring (right endpoint, right language code, right native-script text fed into uL2xi52, right output slot) -- not the linguistic quality of Google's transliteration itself.", async () => {
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

    // confirms the native-script result got fed through uL2xi52 into output.xe38
    expect(h.output.xe38).toBe(h.output.xi38);
    expect(h.output.xe38.length).toBeGreaterThan(0);

    global.fetch = realFetch;
  });

  test("phrom=e52, tu=xe38: knife -> naif (mocked Punjabi transliteration ਨਾਇਫ)", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["knife", ["ਨਾਇਫ"]]]],
    }) as any;

    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.xe38);
    h.set_input("knife");
    await h.duztr();
    expect(h.output.xe38).toBe("naif");

    global.fetch = realFetch;
  });

  test("phrom=e52, tu=xe38: Calcium -> one of kyelsiym/kyelSiym/kAelsiym/kAelSiym (mocked Punjabi transliteration ਕੈਲਸਿਯਮ)", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["Calcium", ["ਕੈਲਸਿਯਮ"]]]],
    }) as any;

    const h = new hsciistr(hsciistr.phrom_dikt.e52, hsciistr.tu_dikt.xe38);
    h.set_input("Calcium");
    await h.duztr();
    expect(["kyelsiym", "kyelSiym", "kAelsiym", "kAelSiym"]).toContain(h.output.xe38);

    global.fetch = realFetch;
  });
});
