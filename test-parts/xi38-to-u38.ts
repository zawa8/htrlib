import { xi38_to_ui38 } from "../src/hsciistr/xi38_to_u38";

describe("xi38_to_ui38 (Latin xi38 -> semi-native u38, reverse direction)", () => {
  test("hindi: संस्कृति's xi38 (snskriTi) -> सनसकriतi -- ri (vocalic-R matra) stays Latin", () => {
    expect(xi38_to_ui38("snskriTi", "hindi")).toBe("सनसकriतi");
  });

  test("hindi: श्र's xi38 (Sr) -> शर -- capital S (श) + r (consonant, not followed by i) both convert", () => {
    expect(xi38_to_ui38("Sr", "hindi")).toBe("शर");
  });

  test("hindi: नमस्ते's xi38 (nmsTe) -> नमसतe -- matches to_u38(नमस्ते) from the native-input direction", () => {
    expect(xi38_to_ui38("nmsTe", "hindi")).toBe("नमसतe");
  });

  test("hindi: अनार's xi38 (Anar) -> अनaर -- matches to_u38(अनार) from the native-input direction", () => {
    expect(xi38_to_ui38("Anar", "hindi")).toBe("अनaर");
  });

  test("hindi: both n and N collapse to the single dental न (confirmed canonical choice)", () => {
    expect(xi38_to_ui38("n", "hindi")).toBe("न");
    expect(xi38_to_ui38("N", "hindi")).toBe("न");
  });

  test("hindi: aspirated digraphs (th/dh/Th/Dh) convert as one unit, not letter-by-letter", () => {
    expect(xi38_to_ui38("th", "hindi")).toBe("ठ");
    expect(xi38_to_ui38("dh", "hindi")).toBe("ढ");
    expect(xi38_to_ui38("Th", "hindi")).toBe("थ");
    expect(xi38_to_ui38("Dh", "hindi")).toBe("ध");
  });

  test("gurmukhi: ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਪੰਜਾਬ's xi38 (sT sri Akal pnzab) converts consonants to gurmukhi", () => {
    expect(xi38_to_ui38("sT sri Akal pnzab", "gurmukhi")).toBe("ਸਤ ਸri ਅਕaਲ ਪਨਜaਬ");
  });

  test("gujarati: કેમ છો ગુજરાત's xi38 (kem Co guzraT) converts consonants to gujarati", () => {
    expect(xi38_to_ui38("kem Co guzraT", "gujarati")).toBe("કeમ છo ગuજરaત");
  });

  test("kannada: ನಮಸ್ಕಾರ ಕನ್ನಡ's xi38 (nmskar knnd) converts consonants to kannada", () => {
    expect(xi38_to_ui38("nmskar knnd", "kannada")).toBe("ನಮಸಕaರ ಕನನಡ");
  });

  test("unsupported script (no verified per-script data yet) passes input through unchanged", () => {
    expect(xi38_to_ui38("nmsTe", "bangla")).toBe("nmsTe");
    expect(xi38_to_ui38("nmsTe", "sinhala")).toBe("nmsTe");
    expect(xi38_to_ui38("nmsTe", "korean")).toBe("nmsTe");
  });

  test("empty input returns empty string", () => {
    expect(xi38_to_ui38("", "hindi")).toBe("");
  });
});
