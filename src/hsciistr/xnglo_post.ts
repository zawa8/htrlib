// htrlib/src/hsciistr/xnglo_post.ts
export function xnglo_india_post(s: string): string {
  return s
    .replace(/^#S/, "S")
    .replace(/(\W)#S/g, "$1S")
    .replace(/#S/g, "kS")
    .replace(/^_/, "")
    .replace(/(\W)_/g, "$1")
    // a bare consonant (nothing before it -- not a vowel, not a word
    // boundary/start, which are handled above) directly followed by an
    // independent u/o vowel letter (क+उ = कउ, no matra/virama between
    // them) makes the consonant's own implicit "a" explicit instead of
    // gluing on a glide consonant: क+उ -> "kAu", not "kxu".
    .replace(/([^\Waiueo_])_u/g, "$1Au")
    // .replace(/([^\Waiueo_])_o/g, "$1Ao")
    // an independent i/u/o vowel letter directly after an "a" (from a
    // matra attached to a real consonant, or from the explicit "A"
    // just inserted above) reads as the standard ai/au diphthong, no
    // glide needed: जा+ऊ = जाऊ -> "zau", not "zaxu".
    .replace(/a_i/g, "ai").replace(/a_u/g, "au").replace(/a_o/g, "ao")
    // आ+ए is two syllables (आए "came"), not the ऐ diphthong: keep the
    // independent आ's "aa" and let ए glide as "ye" -> "aaye".
    .replace(/aa?_e/g, "aaye")
    .replace(/_i/g, "yi").replace(/_e/g, "ye").replace(/_u/g, "xu").replace(/_o/g, "xo")
    .replace(/N$/, "")
    .replace(/N(\W)/g, "$1")
    .replace(/Nb/g, "mb").replace(/NB/g, "mB").replace(/Np/g, "mp").replace(/Nf/g, "mf")
    .replace(/N(?![kKgG])/g, "n")
    // Exclude R (ड़, retroflex flap) and all 11 aspiratable consonants
    // from the v->h rewrite: `v` after any of those must survive as `v`
    // (letter ह, unambiguous -- never an aspirate digraph, which only
    // exists in lowercase `kh`/`gh`/etc form). All other `v` chars (e.g.
    // English v passthrough, or v after a vowel) are rewritten to h for
    // consistency with the xi38 `h` = ह convention.
    //
    // CASE-SENSITIVITY NOTE (per repo owner, "zHaz is better than zvaz"):
    // xi38 already disambiguates aspirate vs. separate-letters via case:
    // lowercase `kh` = aspirate ख, capital `kH` = क + ह (two letters).
    // So no H->v rewrite is needed; `uL_to_xi38("कह")` produces `kH`,
    // which `xi38_to_ux38` reads as `कह` because `kH` doesn't match any
    // digraph in digraf_key_ofset (which only has lowercase `kh`).
    // Users may also write `kv` as an equivalent spelling of `kH`; both
    // work identically as input to `xi38_to_ux38`.
    .replace(/([^kgcztdjqTDpbsR])v/g, "$1h");
}
