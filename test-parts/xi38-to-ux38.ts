// xnglotr/test-parts/xi38-to-ux38.ts
// Tests for xi38 -> ux38 (renamed from xi38_to_xLS38; see
// docs/aspirate-digraphs.md and CLAUDE_xnglotr_api.md).
import { xi38_to_ux38 } from "../src/hsciistr/ux38";

describe("xi38_to_ux38 (Latin xi38 -> semi-native ux38, reverse direction)", () => {
  test("hindi: संस्कृति's xi38 (snskriTi) -> सनसकriतi -- ri (vocalic-R matra) stays Latin", () => {
    expect(xi38_to_ux38("snskriTi", "hindi")).toBe("सनसकriतi");
  });

  test("hindi: श्र's xi38 (shr) -> सhर", () => {
    expect(xi38_to_ux38("shr", "hindi")).toBe("सhर");
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
    // Phase 1c: aspirates = base consonant + Latin 'h' (NOT precomposed)
	expect(xi38_to_ux38("kh", "hindi")).toBe("कh");
	expect(xi38_to_ux38("gh", "hindi")).toBe("गh");
	expect(xi38_to_ux38("ch", "hindi")).toBe("चh");
	expect(xi38_to_ux38("zh", "hindi")).toBe("जh");
	expect(xi38_to_ux38("ph", "hindi")).toBe("पh");
	expect(xi38_to_ux38("bh", "hindi")).toBe("बh");
	expect(xi38_to_ux38("sh", "hindi")).toBe("सh");
	expect(xi38_to_ux38("th", "hindi")).toBe("टh");
	expect(xi38_to_ux38("dh", "hindi")).toBe("डh");
	expect(xi38_to_ux38("Th", "hindi")).toBe("तh");
	expect(xi38_to_ux38("Dh", "hindi")).toBe("दh");
  });

  test("hindi: single-char aliases for aspirates (K=kh, f=ph, etc.)", () => {
	// Phase 1c: capital singles removed (K/G/C/Z/B/S passthrough)
	expect(xi38_to_ux38("K", "hindi")).toBe("K");
	expect(xi38_to_ux38("G", "hindi")).toBe("G");
	expect(xi38_to_ux38("C", "hindi")).toBe("C");
	expect(xi38_to_ux38("Z", "hindi")).toBe("Z");
	expect(xi38_to_ux38("B", "hindi")).toBe("B");
	expect(xi38_to_ux38("S", "hindi")).toBe("S");
	// f is special: still maps to फ (precomposed)
	expect(xi38_to_ux38("f", "hindi")).toBe("फ");
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

  test("gujarati: કેમ છો ગુજરાત's xi38 (kem cho guzraT) converts consonants to gujarati", () => {
    expect(xi38_to_ux38("kem cho guzraT", "gujarati")).toBe("કeમ ચho ગuજરaત");
  });

  test("kannada: ನಮಸ್ಕಾರ ಕನ್ನಡ's xi38 (nmskar knnd) converts consonants to kannada", () => {
    expect(xi38_to_ux38("nmskar knnd", "kannada")).toBe("ನಮಸಕaರ ಕನನಡ");
  });

  test("unsupported script passes input through unchanged", () => {
    expect(xi38_to_ux38("nmsTe", "korean")).toBe("nmsTe");
  });

  test("empty input returns empty string", () => {
    expect(xi38_to_ux38("", "hindi")).toBe("");
  });

  test("backward-compat alias xi38_to_xLS38 still works", () => {
    const { xi38_to_xLS38 } = require("../src/hsciistr/ux38");
    expect(xi38_to_xLS38("nmsTe", "hindi")).toBe("नमसतe");
  });

  test("tamil: smaller inventory, no aspirates but base + Latin h", () => {
    expect(xi38_to_ux38("nmsTe", "tamil")).toBe("நமஸதe"); // n->ந, m->ம, s->ஸ, T->த
    expect(xi38_to_ux38("k", "tamil")).toBe("க");
    expect(xi38_to_ux38("kh", "tamil")).toBe("கh"); // base + Latin h
    expect(xi38_to_ux38("g", "tamil")).toBe("க"); // voiced merges
    expect(xi38_to_ux38("v", "tamil")).toBe("ஹ"); // ha grantha
    expect(xi38_to_ux38("x", "tamil")).toBe("அ");
  });
  
  test("malayalam: ISCII-aligned, base + Latin h aspirates", () => {
    // Malayalam shares Unicode offset layout with Devanagari for most
    // consonants (both ISCII-derived): ക=k at 0x15, ട=t at 0x1F, ത=T at 0x24.
    expect(xi38_to_ux38("nmsTe", "malayalam")).toBe("നമസതe");
    expect(xi38_to_ux38("k", "malayalam")).toBe("ക");
    expect(xi38_to_ux38("kh", "malayalam")).toBe("കh");
    expect(xi38_to_ux38("v", "malayalam")).toBe("ഹ");
  });

  test("bangla: ISCII-aligned, base + Latin h", () => {
    expect(xi38_to_ux38("nmsTe", "bangla")).toBe("নমসতe");
    expect(xi38_to_ux38("kh", "bangla")).toBe("কh");
    expect(xi38_to_ux38("v", "bangla")).toBe("হ");
  });

  test("oriya: ISCII-aligned, base + Latin h", () => {
    expect(xi38_to_ux38("nmsTe", "oriya")).toBe("ନମସତe");
    expect(xi38_to_ux38("kh", "oriya")).toBe("କh");
    expect(xi38_to_ux38("v", "oriya")).toBe("ହ");
  });

  test("telugu: ISCII-aligned, base + Latin h", () => {
    expect(xi38_to_ux38("nmsTe", "telugu")).toBe("నమసతe");
    expect(xi38_to_ux38("kh", "telugu")).toBe("కh");
    expect(xi38_to_ux38("v", "telugu")).toBe("హ");
  });
});