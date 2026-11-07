// xnglotr/src/hsciistr/ux38.ts
// xi38 -> ux38 (semi-native, per SCRIPT -- "ux38" = unicode + xnglo + 38:
// the output keeps xi38's Latin vowels/marks (a i u e o h N) but renders
// every consonant in the target script's own native unicode. Renamed from
// xi38_to_xLS38 in Phase 1a.
//
// Phase 1c redesign (aspirates): all 10 aspirated stops render as
// BASE CONSONANT + LATIN 'h' (kh -> कh, sh -> सh), not precomposed.
// फ is special: precomposed (English 'f' unique).
// ह is 'v' (v = ∀ in xh52.ttf, font-consistent).
// अ is 'x' (canonical, Phase 1b-a). ॲ also folds to x.
//
// SCOPE (Phase 1d-b):
// - ISCII-aligned + simple (skript_base + offset math):
// hindi, bangla, gurmukhi, gujarati, oriya, telugu, kannada
// - ISCII-aligned but reordered (explicit offset table):
// tamil (smaller inventory, retroflex/dental merged)
// - Non-ISCII-aligned (explicit offset table):
// sinhala
// - Still passthrough:
// malayalam (retroflex/dental reordered, Phase 1d-c),
// korean and unknown scripts

const skript_base: Record<string, number> = {
	hindi: 0x0900,
	bangla: 0x0980,
	gurmukhi: 0x0a00,
	gujarati: 0x0a80,
	oriya: 0x0b00,
	tamil: 0x0b80, // Tamil: uses tamil_offset table below
	telugu: 0x0c00,
	kannada: 0x0c80,
	malayalam: 0x0d00, // Phase 1d-c (retroflex/dental reordered)
	sinhala: 0x0d80, // Sinhala: uses sinhala_offset table below
};

// Non-aspirate, non-special single-char consonants (offsets from the
// Devanagari base). Aspirates are in digraf_base_ofset below.
const singl_char_key_ofset: Record<string, number> = {
k: 0x15, g: 0x17,
c: 0x1a, z: 0x1c,
t: 0x1f, d: 0x21, T: 0x24, D: 0x26,
n: 0x28, N: 0x28, // both collapse to न
p: 0x2a, f: 0x2b, b: 0x2c, m: 0x2e,
y: 0x2f, r: 0x30, l: 0x32, w: 0x35,
s: 0x38, // स (not ष) is canonical for 's'
A: 0x05, // अ (legacy)
x: 0x05, // अ (canonical, Phase 1b-a)
H: 0x39, // ह (legacy capital)
h: 0x39, // ह (legacy lowercase)
v: 0x39, // ह (canonical Phase 1c, v = ∀)
R: 0x5c, // ड़
};

// Aspirate digraphs: base consonant offset + Latin 'h' suffix.
const digraf_base_ofset: Record<string, number> = {
kh: 0x15, gh: 0x17, ch: 0x1a, zh: 0x1c,
ph: 0x2a,
th: 0x1f, dh: 0x21, Th: 0x24, Dh: 0x26,
bh: 0x2c, sh: 0x38,
};

// Sinhala explicit offset table (block base 0x0D80). Non-ISCII-aligned.
const sinhala_offset: Record<string, number> = {
A: 0x05, // අ
k: 0x1a, // ක
g: 0x1c, // ග
c: 0x20, // ච
z: 0x22, // ජ
t: 0x27, // ට
d: 0x29, // ඩ
T: 0x2d, // ත
D: 0x2f, // ද
n: 0x31, // න
p: 0x34, // ප
f: 0x35, // ඵ (precomposed, f special)
b: 0x36, // බ
m: 0x38, // ම
y: 0x3a, // ය
r: 0x3b, // ර
l: 0x3d, // ල
w: 0x40, // ව
s: 0x43, // ස
v: 0x44, // හ
};

// Sinhala aspirate digraph base offsets (base + Latin 'h').
const sinhala_digraf_offset: Record<string, number> = {
kh: 0x1a, gh: 0x1c, ch: 0x20, zh: 0x22,
th: 0x27, dh: 0x29, Th: 0x2d, Dh: 0x2f,
ph: 0x34, bh: 0x36, sh: 0x43,
};

// Tamil explicit offset table (block base 0x0B80). Tamil is
// ISCII-aligned but has a SMALLER inventory than Devanagari:
// - No voiced/voiceless distinction (k/g/kh/gh all -> க)
// - No aspirates (kh/gh etc merge to base, but per Phase 1d-b design,
// they still get the Latin 'h' suffix -- see tamil_digraf_offset)
// - Three n's (dental ந, alveolar ன, retroflex ண): 'n' -> ந (dental)
// - Grantha loans (śa ஶ, ṣa ஷ, sa ஸ, ha ஹ) at 0x33-0x36
const tamil_offset: Record<string, number> = {
  A: 0x05, x: 0x05,       // அ (U+0B85)
  k: 0x15, g: 0x15,       // க (U+0B95)
  c: 0x1a, z: 0x1c,       // ச (U+0B9A) / ஜ (U+0B9C, grantha ja)
  t: 0x1f, d: 0x1f,       // ட (U+0B9F)
  T: 0x24, D: 0x24,       // த (U+0BA4)
  n: 0x28,                // ந (U+0BA8, dental)
  // N: passthrough (no anusvara)
  p: 0x2a, b: 0x2a,       // ப (U+0BAA)
  f: 0x2a,                // ப (Tamil pha merge)
  m: 0x2e,                // ம (U+0BAE)
  y: 0x2f,                // ய (U+0BAF)
  r: 0x30,                // ர (U+0BB0)
  l: 0x32,                // ல (U+0BB2)
  w: 0x35,                // வ (U+0BB5)
  s: 0x38,                // ஸ (U+0BB8, grantha sa)
  S: 0x36,                // ஶ (U+0BB6, grantha śa)
  H: 0x39,                // ஹ (U+0BB9, grantha ha)
  h: 0x39,                // ஹ
  v: 0x39,                // ஹ
  // R: passthrough
};
// Tamil aspirates: base + Latin 'h' (per Phase 1d-b design).
// Base consonant merges voiced/voiceless (க for k/kh), then Latin h.
const tamil_digraf_offset: Record<string, number> = {
  kh: 0x15, gh: 0x15,     // க + h
  ch: 0x1a, zh: 0x1c,     // ச + h / ஜ + h (zh uses grantha ja)
  th: 0x1f, dh: 0x1f,     // ட + h
  Th: 0x24, Dh: 0x24,     // த + h
  ph: 0x2a, bh: 0x2a,     // ப + h
  sh: 0x38,               // ஸ + h
};

function native_char_single(argLS: string, token: string, base_offset: number): string {
if (argLS === 'sinhala') {
const off = sinhala_offset[token];
if (off === undefined) return token;
return String.fromCodePoint(0x0d80 + off);
}
if (argLS === 'tamil') {
const off = tamil_offset[token];
if (off === undefined) return token;
return String.fromCodePoint(0x0b80 + off);
}
return String.fromCodePoint(skript_base[argLS] + base_offset);
}

function native_char_digraf(argLS: string, token: string, base_offset: number): string {
if (argLS === 'sinhala') {
const off = sinhala_digraf_offset[token];
if (off === undefined) return token;
return String.fromCodePoint(0x0d80 + off) + 'h';
}
if (argLS === 'tamil') {
const off = tamil_digraf_offset[token];
if (off === undefined) return token;
return String.fromCodePoint(0x0b80 + off) + 'h';
}
return String.fromCodePoint(skript_base[argLS] + base_offset) + 'h';
}

export function xi38_to_ux38(input: string, argLS: string): string {
if (!input) return '';
if (!(argLS in skript_base)) {
return input;
}
let out = '';
let i = 0;
while (i < input.length) {
const two = input.slice(i, i + 2);
if (two === 'ri' || two === 'li') {
const prev = i > 0 ? input[i - 1] : '';
const precededByConsonant = prev in singl_char_key_ofset;
if (precededByConsonant) {
out += two;
i += 2;
continue;
}
}
if (two in digraf_base_ofset) {
out += native_char_digraf(argLS, two, digraf_base_ofset[two]);
i += 2;
continue;
}
const one = input[i];
if (one in singl_char_key_ofset) {
out += native_char_single(argLS, one, singl_char_key_ofset[one]);
} else {
out += one;
}
i += 1;
}
return out;
}

export { xi38_to_ux38 as xi38_to_xLS38 };