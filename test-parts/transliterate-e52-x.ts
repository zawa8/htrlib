import { hsciistr } from "../src/hsciistr_file";

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