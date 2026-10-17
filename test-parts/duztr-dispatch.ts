import { h5str } from "../src/hsciistr_file";

describe("duztr() dispatch", () => {
  test("phrom=uL runs uL_to_xi38 only", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xi38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xi38).toBe("Anar");
  });

  test("phrom=uL with a specific xiL38 target (xih38) also copies the xi38 result into that slot", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xih38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xih38).toBe("Anar");
    expect(h.output.xi38).toBe("Anar");
  });

  test("tu_dikt:xhs38 (semi-native) test अनार", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xhs38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xhs38).toBe("अनaर");
  });

  test("tu_dikt:xi38 test अनार", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xi38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xi38).toBe("Anar");
  });

  test("phrom=uL tu=xhs38 ऋ श्र (ri/li context fix: ऋ promotes to native र)", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xhs38);
    h.set_input("ऋषि के आश्रम में (गंगा)");
    await h.duztr();
    expect(h.output.xhs38).toBe("रiसi कe aशरम मe (गनगa)");
    expect(h.output.xi38).toBe("risi ke aSrm me (gNga)");
  });

  test("phrom=uL tu=xhs38 ऋ श्र 2 (longer sentence)", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xhs38);
    h.set_input(
      "ऋषि के आश्रम में (गंगा) किनारे बैठकर शिष्यों ने वाङ्गमय और चञ्चल मन को एकाग्र करने का पाठ सीखा।"
    );
    await h.duztr();
    expect(h.output.xhs38).toBe(
      "रiसi कe aशरम मe (गनगa) कiनaरe बयeठकर शiसयo नe वaनगमय ouर चनचल मन कo eकaगर करनe कa पaठ सiखa."
    );
    expect(h.output.xi38).toBe(
      "risi ke aSrm me (gNga) kinare byethkr Sisyo ne waNgmy our cncl mn ko ekagr krne ka path siKa."
    );
  });

  test("phrom=uL with a xhs38 target: letters stay native, the ा matra converts to 'a', rest unchanged", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xhs38);
    h.set_input("अनार");
    await h.duztr();
    expect(h.output.xhs38).toBe("अनaर");
  });

  test("unicode(नमस्ते) -> xhs38(नमसतe): letters stay native-script, marks convert to xi38 value, virama drops", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xhs38);
    h.set_input("नमस्ते");
    await h.duztr();
    expect(h.output.xhs38).toBe("नमसतe");
  });

  test("unicode(नमस्ते) -> xi38(nmsTe)", async () => {
    const h = new h5str(h5str.phrom_dikt.uL, h5str.tu_dikt.xi38);
    h.set_input("नमस्ते");
    await h.duztr();
    expect(h.output.xi38).toBe("nmsTe");
  });

  test("phrom=e52, tu=e23 transliterates without touching output dict", async () => {
    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.e23);
    h.set_input("vet");
    await h.duztr();
    expect(h.input).toBe("wyt");
  });

  test("phrom=e52, tu=xe38: routes through transliterate_e52_x('pa') (Punjabi) -> uL_to_xi38 -> output.xe38, NOT translate_e52_x. We cannot change what the real Google API returns, so this mocks the API boundary and verifies OUR pipeline wiring (right endpoint, right language code, right native-script text fed into uL_to_xi38, right output slot) -- not the linguistic quality of Google's transliteration itself.", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["namaste", ["ਨਮਸਤੇ"]]]],
    }) as any;

    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.xe38);
    h.set_input("namaste");
    await h.duztr();

    // confirms transliterate (Input Tools), not translate (Translate API), was used
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("inputtools.google.com/request");
    expect(calledUrl).toContain("itc=pa-t-i0-und");

    // confirms the native-script result got fed through uL_to_xi38 into output.xe38
    expect(h.output.xe38).toBe(h.output.xi38);
    expect(h.output.xe38.length).toBeGreaterThan(0);

    global.fetch = realFetch;
  });

  test("phrom=e52, tu=xe38: knife -> naif (mocked Punjabi transliteration ਨਾਇਫ)", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [null, [["knife", ["ਨਾਇਫ"]]]],
    }) as any;

    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.xe38);
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

    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.xe38);
    h.set_input("Calcium");
    await h.duztr();
    expect(["kyelsiym", "kyelSiym", "kAelsiym", "kAelSiym"]).toContain(h.output.xe38);

    global.fetch = realFetch;
  });

  test("phrom=e52, tu=xih38: translate (Google) -> uL -> xi38, stored in the xih38 slot", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [[["नमस्ते", "namaste", null, null, 1]], null, "hi"],
    }) as any;

    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.xih38);
    h.set_input("namaste");
    await h.duztr();
    expect(h.output.xih38).toBe("nmsTe");

    global.fetch = realFetch;
  });

  test("phrom=e52, tu=xhs38: translate (Google) -> uL -> xi38 -> semi-native, stored in the xhs38 slot", async () => {
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [[["नमस्ते", "namaste", null, null, 1]], null, "hi"],
    }) as any;

    const h = new h5str(h5str.phrom_dikt.e52, h5str.tu_dikt.xhs38);
    h.set_input("namaste");
    await h.duztr();
    expect(h.output.xhs38).toBe("नमसतe");

    global.fetch = realFetch;
  });
});
