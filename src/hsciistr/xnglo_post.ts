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
    .replace(/([^\Waiueo_])_o/g, "$1Ao")
    // an independent i/u/o vowel letter directly after an "a" (from a
    // matra attached to a real consonant, or from the explicit "A"
    // just inserted above) reads as the standard ai/au diphthong, no
    // glide needed: जा+ऊ = जाऊ -> "zau", not "zaxu".
    .replace(/a_i/g, "ai").replace(/a_u/g, "au").replace(/a_o/g, "ao")
    .replace(/_i/g, "yi").replace(/_e/g, "ye").replace(/_u/g, "xu").replace(/_o/g, "xo")
    .replace(/N$/, "")
    .replace(/N(\W)/g, "$1")
    .replace(/Nb/g, "mb").replace(/NB/g, "mB").replace(/Np/g, "mp").replace(/Nf/g, "mf")
    .replace(/N(?![kKgG])/g, "n")
    .replace(/([^kgcztdjqpbs])v/g, "$1h");
}
