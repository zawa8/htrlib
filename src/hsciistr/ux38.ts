// htrlib/src/hsciistr/ux38.ts
// xi38 -> ux38 (semi-native, per SCRIPT -- "ux38" = unicode + xnglo + 38:
// the output keeps xi38's Latin vowels/marks (a i u e o h N) but renders
// every consonant in the target script's own native unicode. Renamed from
// xi38_to_xLS38 in Phase 1a.
//
// Phase 1c redesign (aspirates): all 10 aspirated stops are rendered as
// BASE CONSONANT + LATIN 'h', not as a precomposed single codepoint.
// xnglo principle "power of x and h": x = schwa/अ, h = aspiration/ह.
// kh -> कh, gh -> गh, ch -> चh, zh -> जh, th -> टh, dh -> डh,
// Th -> तh, Dh -> दh, bh -> बh, sh -> सh, ph -> पh
// फ is special: precomposed (English 'f' unique, not /pʰ/).
//
// ह is 'v' (v = ∀ in xh52.ttf, font-consistent). 'H'/'h' legacy accepted.
// अ is 'x' (canonical, Phase 1b-a). 'A' legacy accepted. ॲ also folds to x.
//
// SCOPE: 5 ISCII-aligned scripts (hindi, gurmukhi, gujarati, oriya,
// kannada) use skript_base + offset. Sinhala (0x0D80) is NOT
// ISCII-aligned (ක=U+0D9A is at offset 0x1A, not 0x15 like Devanagari
// क=U+0915), so it uses the explicit sinhala_offset table below.
// bangla/tamil/telugu/malayalam still pass through unchanged (their
// uN_map.ts are Devanagari-derived placeholders, Phase 1d).

const skript_base: Record<string, number> = {
	hindi: 0x0900, // Devanagari
	bangla: 0x0980,  // add this
	gurmukhi: 0x0a00, // Gurmukhi (ISCII-aligned)
	gujarati: 0x0a80, // Gujarati (ISCII-aligned)
	oriya: 0x0b00, // Oriya (ISCII-aligned)
	kannada: 0x0c80, // Kannada (ISCII-aligned)
	telugu: 0x0c00,  // Telugu (ISCII-aligned)
	// malayalam: 0x0d00, // Malayalam
	sinhala: 0x0d80, // Sinhala (NOT ISCII-aligned, uses override table below)
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
	A: 0x05, // अ (legacy spelling)
	x: 0x05, // अ (canonical, Phase 1b-a)
	H: 0x39, // ह (legacy capital, backward compat)
	h: 0x39, // ह (legacy lowercase, backward compat)
	v: 0x39, // ह (canonical Phase 1c, v = ∀)
	R: 0x5c, // ड़ (canonical target for ड़ nukta letter)
};

// Aspirate digraphs: base consonant offset + Latin 'h' suffix.
// Phase 1c: all 10 aspirates use this (no precomposed aspirate codepoints).
// फ is NOT here -- it's special (see singl_char_key_ofset.f = 0x2b).
const digraf_base_ofset: Record<string, number> = {
	kh: 0x15, gh: 0x17, ch: 0x1a, zh: 0x1c,
	ph: 0x2a, // base प + h (like "phone")
	th: 0x1f, dh: 0x21, Th: 0x24, Dh: 0x26,
	bh: 0x2c, sh: 0x38,
};

// Sinhala explicit offset table (block base 0x0D80). Sinhala is not
// ISCII-aligned, so tokens map to Sinhala-specific offsets. Multiple
// xi38 tokens collapse to one canonical Sinhala letter (same policy as
// the Devanagari n/N -> न collapse): n -> න na (0x31), s -> ස sa (0x43),
// l -> ල la (0x3d), f -> ඵ pha (0x35). Some tokens have no canonical
// Sinhala target here (kha/gha/cha etc. are aspirates; see the digraph
// table below instead).
const sinhala_offset: Record<string, number> = {
	A: 0x05, // අ (independent vowel a)
	k: 0x1a, // ක ka
	g: 0x1c, // ග ga
	c: 0x20, // ච cha
	z: 0x22, // ජ ja
	t: 0x27, // ට ṭa (retroflex)
	d: 0x29, // ඩ ḍa (retroflex)
	T: 0x2d, // ත ta (dental)
	D: 0x2f, // ද da (dental)
	n: 0x31, // න na (canonical for n/N)
	p: 0x34, // ප pa
	f: 0x35, // ඵ pha (precomposed, f special)
	b: 0x36, // බ ba
	m: 0x38, // ම ma
	y: 0x3a, // ය ya
	r: 0x3b, // ර ra
	l: 0x3d, // ල la (dental, canonical for l)
	w: 0x40, // ව va
	s: 0x43, // ස sa (dental, canonical for s)
	v: 0x44, // හ ha
};

// Sinhala aspirate digraph base offsets (base consonant + Latin 'h').
// Same policy as Devanagari: base + Latin h, NOT precomposed Sinhala
// aspirates (those are separate codepoints like ඛ ඝ ඡ ඣ, but for
// consistency with the xnglo base+h principle we use base + Latin h).
// NOTE: f (ඵ) is NOT here -- it's precomposed, special (see sinhala_offset.f).
const sinhala_digraf_offset: Record<string, number> = {
	kh: 0x1a, // base ක ka
	gh: 0x1c, // base ග ga
	ch: 0x20, // base ච cha
	zh: 0x22, // base ජ ja
	th: 0x27, // base ට ṭa
	dh: 0x29, // base ඩ ḍa
	Th: 0x2d, // base ත ta
	Dh: 0x2f, // base ද da
	ph: 0x34, // base ප pa (like "phone")
	bh: 0x36, // base බ ba
	sh: 0x43, // base ස sa
};

function native_char_single(argLS: string, token: string, base_offset: number): string {
	if (argLS === 'sinhala') {
	const off = sinhala_offset[token];
	if (off === undefined) return token; // unrecognized -> passthrough
	return String.fromCodePoint(0x0d80 + off);
	}
	return String.fromCodePoint(skript_base[argLS] + base_offset);
}

function native_char_digraf(argLS: string, token: string, base_offset: number): string {
	if (argLS === 'sinhala') {
	const off = sinhala_digraf_offset[token];
	if (off === undefined) return token; // unrecognized -> passthrough
	return String.fromCodePoint(0x0d80 + off) + 'h';
	}
	return String.fromCodePoint(skript_base[argLS] + base_offset) + 'h';
}

export function xi38_to_ux38(input: string, argLS: string): string {
	if (!input) return '';
	if (!(argLS in skript_base)) {
		return input; // unsupported script -> passthrough
	}
	let out = '';
	let i = 0;
	while (i < input.length) {
		const two = input.slice(i, i + 2);
		// "ri"/"li" disambiguation (unchanged from Phase 1a)
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

// Backward-compatible alias
export { xi38_to_ux38 as xi38_to_xLS38 };