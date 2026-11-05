// htrlib/test-parts/xi38-to-ux38.ts
// Tests for xi38 -> ux38 (renamed from xi38_to_xLS38; see
// docs/aspirate-digraphs.md and CLAUDE_htrlib_api.md).
import { xi38_to_ux38 } from "../src/hsciistr/ux38";

describe("xi38_to_ux38 (Latin xi38 -> semi-native ux38, reverse direction)", () => {
  test("hindi: संस्कृति's xi38 (snskriTi) -> सनसकriतi -- ri (vocalic-R matra) stays Latin", () => {
    expect(xi38_to_ux38("snskriTi", "hindi")).toBe("सनसकriतi");
  });

  test("hindi: श्र's xi38 (Sr) -> शर -- capital S (श) + r (consonant, not followed by i) both convert", () => {
    expect(xi38_to_ux38("Sr", "hindi")).toBe("शर");
  });

  test("hindi: नमस्ते's xi38 (nmsTe) -> नमसतe -- matches uL_to_xi38(नमस्ते) round-trip", () => {
    expect(xi38_to_ux38("nmsTe", "hindi")).toBe("नमसतe");
  });

  test("hindi: अनार's xi38 (Anar) -> अनaर -- matches uL_to_xi38(अनार) round-trip", () => {
    expect(xi38_to_ux38("Anar", "hindi")).toBe("अनaर");
  });

  test("hindi: अनार's xi38 (xnar) -> अनaर -- x is the canonical spelling of अ", () => {
    expect(xi38_to_ux38("xnar", "hindi")).toBe("अनaर");
  });

  test("hindi: both n and N collapse to the single dental न (confirmed canonical choice)", () => {
    expect(xi38_to_ux38("n", "hindi")).toBe("न");
    expect(xi38_to_ux38("N", "hindi")).toBe("न");
  });

  test("hindi: aspirated digraphs convert as one unit, not letter-by-letter", () => {
    // 11 aspirate digraphs (see docs/aspirate-digraphs.md)
    expect(xi38_to_ux38("kh", "hindi")).toBe("ख");
    expect(xi38_to_ux38("gh", "hindi")).toBe("घ");
    expect(xi38_to_ux38("ch", "hindi")).toBe("छ");
    expect(xi38_to_ux38("zh", "hindi")).toBe("झ");
    expect(xi38_to_ux38("ph", "hindi")).toBe("फ");
    expect(xi38_to_ux38("bh", "hindi")).toBe("भ");
    expect(xi38_to_ux38("sh", "hindi")).toBe("श");
    expect(xi38_to_ux38("th", "hindi")).toBe("ठ");
    expect(xi38_to_ux38("dh", "hindi")).toBe("ढ");
    expect(xi38_to_ux38("Th", "hindi")).toBe("थ");
    expect(xi38_to_ux38("Dh", "hindi")).toBe("ध");
  });

  test("hindi: single-char aliases for aspirates (K=kh, f=ph, etc.)", () => {
    expect(xi38_to_ux38("K", "hindi")).toBe("ख");
    expect(xi38_to_ux38("G", "hindi")).toBe("घ");
    expect(xi38_to_ux38("C", "hindi")).toBe("छ");
    expect(xi38_to_ux38("Z", "hindi")).toBe("झ");
    expect(xi38_to_ux38("f", "hindi")).toBe("फ");
    expect(xi38_to_ux38("B", "hindi")).toBe("भ");
    expect(xi38_to_ux38("S", "hindi")).toBe("श");
  });

  test("hindi: h as letter ह (after non-aspiratable consonant, after vowel, at start)", () => {
    expect(xi38_to_ux38("yh", "hindi")).toBe("यह");
    expect(xi38_to_ux38("rh", "hindi")).toBe("रह");
    expect(xi38_to_ux38("lh", "hindi")).toBe("लह");
    expect(xi38_to_ux38("wh", "hindi")).toBe("वह");
    expect(xi38_to_ux38("ah", "hindi")).toBe("aह");
    expect(xi38_to_ux38("h", "hindi")).toBe("ह");
    expect(xi38_to_ux38("nh", "hindi")).toBe("नह");
    expect(xi38_to_ux38("mh", "hindi")).toBe("मह");
  });

  test("hindi: h/v/H all alias for ह (three spellings)", () => {
    expect(xi38_to_ux38("yh", "hindi")).toBe("यह");
    expect(xi38_to_ux38("yv", "hindi")).toBe("यह");
    expect(xi38_to_ux38("yH", "hindi")).toBe("यह");
  });

  test("hindi: v after aspiratable consonant = letter ह, not aspiration", () => {
    // kv = क+ह (NOT kh = ख); gv = ग+ह (NOT घ); etc.
    expect(xi38_to_ux38("kv", "hindi")).toBe("कह");
    expect(xi38_to_ux38("gv", "hindi")).toBe("गह");
    expect(xi38_to_ux38("cv", "hindi")).toBe("चह");
    expect(xi38_to_ux38("tv", "hindi")).toBe("टह");
    expect(xi38_to_ux38("dv", "hindi")).toBe("डह");
    expect(xi38_to_ux38("Tv", "hindi")).toBe("तह");
    expect(xi38_to_ux38("Dv", "hindi")).toBe("दह");
    expect(xi38_to_ux38("pv", "hindi")).toBe("पह");
    expect(xi38_to_ux38("bv", "hindi")).toBe("बह");
    expect(xi38_to_ux38("sv", "hindi")).toBe("सह");
  });

  test("gurmukhi: ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਪੰਜਾਬ's xi38 (sT sri Akal pnzab) converts consonants to gurmukhi", () => {
    expect(xi38_to_ux38("sT sri Akal pnzab", "gurmukhi")).toBe("ਸਤ ਸri ਅਕaਲ ਪਨਜaਬ");
  });

  test("gujarati: કેમ છો ગુજરાત's xi38 (kem Co guzraT) converts consonants to gujarati", () => {
    expect(xi38_to_ux38("kem Co guzraT", "gujarati")).toBe("કeમ છo ગuજરaત");
  });

  test("kannada: ನಮಸ್ಕಾರ ಕನ್ನಡ's xi38 (nmskar knnd) converts consonants to kannada", () => {
    expect(xi38_to_ux38("nmskar knnd", "kannada")).toBe("ನಮಸಕaರ ಕನನಡ");
  });

  test("unsupported script passes input through unchanged", () => {
    expect(xi38_to_ux38("nmsTe", "bangla")).toBe("nmsTe");
    expect(xi38_to_ux38("nmsTe", "sinhala")).toBe("nmsTe");
    expect(xi38_to_ux38("nmsTe", "korean")).toBe("nmsTe");
  });

  test("empty input returns empty string", () => {
    expect(xi38_to_ux38("", "hindi")).toBe("");
  });

  test("backward-compat alias xi38_to_xLS38 still works", () => {
    const { xi38_to_xLS38 } = require("../src/hsciistr/ux38");
    expect(xi38_to_xLS38("nmsTe", "hindi")).toBe("नमसतe");
  });
});