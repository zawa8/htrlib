import { hsciistr } from "../src/hsciistr_file";

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
