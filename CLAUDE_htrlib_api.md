# htrlib API naming (h5str)

This documents the naming scheme and pipeline the repo owner specified,
and what this repo's code was renamed to match. If code and this doc
ever disagree, treat this doc as the intended design and the code as
possibly needing a follow-up fix.

## Vocabulary

- **h5** = "hskii5" (heksadesiml stAndArd kod for information
  interchange, variant 5): the repo owner's own extended-hex numbering
  scheme. Digits 0-9 are continuous as usual; the glyphs **L Y V W P F**
  stand in for ten/eleven/twelve/thirteen/fourteen/fifteen
  (ten/yilewen/twelw/dblun/purAn/fiwan) -- but in h5 specifically those
  glyphs are NOT placed immediately after 0-9 (contrast with the
  not-yet-built **h4** variant, "hskii4", which WOULD run 0123456789LYVWPF
  continuously starting at 0x30 -- h4 is future scope, not in this
  version of htrlib).
- **h5str** = the main class (renamed from `hsciistr`). "L" throughout
  this library's naming = 10, i.e. the ten scripts it covers.
- **uL** = "unicode [L=ten] languages": native-script input across the
  ten supported Unicode blocks -- devanagari through malayalam
  (U+0900-U+0D7F) plus sinhala (U+0D80-U+0DFF). Renamed from `uten`
  (and, before that, `u10`).
- **E52** = English (ASCII) input/source text.
- **e23** = the reduced 23-letter English-side romanization (English,
  lowercased, with j->z, q->k, v->w folded in).
- **xi38** = the xnglo-english Latin SCRIPT (not a language) -- the
  38-character romanization any uL native-script text converts into.
  Script only, language-agnostic.
- **xe38** = xi38 SCRIPT carrying the ENGLISH language specifically
  (E52 -> phonetic transliteration -> native script -> xi38). Script
  known AND language known (both are "English"/xi38 by definition).
- **xiL38** (concretely **xih38/xib38/xip38/xig38/xio38/xit38/xij38/
  xim38/xik38/xis38** -- h=hindi b=bangla p=gurmukhi(punjabi)
  g=gujarati o=oriya t=tamil j=telugu m=malayalam k=kannada s=sinhala)
  = xi38 SCRIPT carrying a KNOWN language L: the full Latin
  romanization, same characters as plain xi38, just landed in a
  per-language-labeled slot once the language is known (e.g. after
  translating English into Hindi first). This is what `xh38` etc USED
  TO mean in earlier revisions of this library -- the "i" in the middle
  (`xih38`, not `xh38`) is what now marks "script is xi38, language
  known".
- **xLS38** (concretely **xhs38/xbs38/xps38/xgs38/xos38/xts38/xjs38/
  xms38/xks38/xss38**) = the SEMI-native per-SCRIPT output: letters stay
  in that script's own native characters, only marks (matras, anusvara,
  nukta, etc) convert to Latin. "LS" = LanguageScript -- the SCRIPT is
  known (that's literally what selects which xLS38 slot), but the
  Script alone doesn't pin down the language (devanagari, for instance,
  carries both Hindi and Marathi). This REPLACES the older, now-removed
  `u*38` family (`uh38`/`ub38`/.../`us38`, and the generic unlabeled
  `u38`).

## Pipelines

1. **E52 -> e23**: `h5str.E52_to_e23()` -- lowercase, then j->z/q->k/v->w.
2. **E52 -> xe38**: `h5str.E52_to_xe38(argE)` -- phonetically
   transliterate (NOT translate) E52 through whichever script's
   keyboard represents English sounds best (gurmukhi by default,
   `argE` lets you pick another, e.g. kannada) via Google's Input
   Tools, landing in uL/uE, then `uL_to_xi38()`.
3. **uL -> xi38 -> xLS38**: `h5str.uL_to_xi38()` (native -> full Latin
   romanization), then `h5str.xi38_to_xLS38(inputStr, argLS)` (full
   Latin -> semi-native for the given language name, e.g. `"hindi"`,
   `"bengali"`/`"bangla"`, ..., `"sinhala"`) -- combined as one step by
   `h5str.uL_to_xLS38(argLS)`.
4. **E52 -> xiL38**: `h5str.E52_to_xiL38(argL)` -- translate E52 to
   native script for language `argL` (a language name or its
   Google/itc code, e.g. `"hindi"`/`"hi"`) via Google, landing in uL,
   then `uL_to_xi38()`, storing the result in that language's `xiL38`
   slot (`xih38` for hindi, etc) -- full Latin romanization, language
   now known.
5. **E52 -> xLS38**: `h5str.E52_to_xLS38(argLS)` -- same translate step
   as #4, but then runs `uL_to_xLS38(argLS)` instead, landing in the
   semi-native `xLS38` slot.

## Scope (unchanged from before this rename)

`uL_to_xi38` (steps 3/4/5's native->Latin half) works for all languages
whose `uN_map.ts` dict exists, with varying confidence -- see each dict
file's own notes. `xi38_to_xLS38` (step 3's second half, and so step 5's
second half) is only CONFIRMED correct for the 5 ISCII-aligned scripts
with verified per-script data: hindi (devanagari), gurmukhi (punjabi),
gujarati, oriya, kannada. bangla/tamil/telugu/malayalam don't have
verified per-script letter data yet (their uN_map.ts are still
devanagari-derived placeholders); sinhala isn't ISCII-aligned, so the
offset-based rules in `xi38_to_xLS38` don't apply to it at all yet (it
needs its own mapping using sinhala's semantic offset correspondences,
documented in u10_map.ts's comments, as a follow-up). For all of these
not-yet-supported languages, `xi38_to_xLS38`/`uL_to_xLS38`/
`E52_to_xLS38` pass the xi38-stage text through unchanged rather than
guess.

## What this rename touched

- Class `hsciistr` -> `h5str` (file `src/hsciistr_file.ts` NOT renamed
  yet -- only the class identifier inside it; `hsciistr` kept as a
  backward-compat export alias of `h5str`).
- `e52_tu_e23()` (standalone function + class method) -> `E52_to_e23()`.
- `uten_to_xi38()` (src/hsciistr/uten_to_xi38.ts, standalone function +
  class method `uL2xi52()`) -> `uL_to_xi38()` (function and method both).
- `xi38_to_ui38()` (src/hsciistr/xi38_to_u38.ts) -> file renamed to
  `xi38_to_xLS38.ts`, function renamed to `xi38_to_xLS38(input, argLS)`
  (same signature shape, `argLS` is the language name, e.g. `"hindi"`).
  Also fixed: "ri"/"li" are ambiguous in xi38's flat output (they're
  also the vocalic-R/L matra tokens) -- now disambiguated by checking
  what precedes them (a consonant-key letter -> stays Latin, the matra
  reading; anything else -> the "r"/"l" promotes to native, a real
  consonant reading). Confirmed by संस्कृति (matra reading, "ri" stays
  Latin) vs जारी (consonant reading, र promotes) both now correct.
  Class method of the same name added, same signature.
- New class methods: `E52_to_xe38(argE)`, `E52_to_xiL38(argL)`,
  `uL_to_xLS38(argLS)`, `E52_to_xLS38(argLS)` -- see Pipelines above.
- `src/hsciistr/uten_to_u38.ts` (the old native-input-position-tracking
  implementation of u38) DELETED -- superseded by composing
  `uL_to_xi38` + `xi38_to_xLS38`, which reuses already-correct,
  already-tested logic instead of re-deriving native-script-specific
  rules (matra/glide/anusvara context, whole-word hardcodes, etc) a
  second time for the native-input direction specifically.
- `phrom_dikt`: `u10` -> `uL`. `tu_dikt`: old `xh38`/`xb38`/etc (which
  used to just alias `xi38`) and the whole `uh38`/`ub38`/.../`umr38`/
  generic-`u38`/`ui38` family REMOVED, replaced by the `xiL38` family
  (`xih38` etc, same old "full romanization" meaning, new name so it
  doesn't collide with `xLS38`) and the `xLS38` family (`xhs38` etc,
  the semi-native meaning).
- `duztr()`/`phrom_dikt`/`tu_dikt` dispatcher kept working (routes to
  the new named methods internally) so the existing
  construct-set_input-duztr()-read-output pattern still works
  end-to-end, alongside the new named methods as the more direct way
  to call things.

## NOT touched by this rename (yet)

The three downstream repos that hand-port pieces of this library's
logic (`xnglonpp-ext`'s C++ core, `xnglopxd`'s Kotlin core, and
`plugintemplate`'s copy of the former) still use the OLD names
internally (`to_xi38`/`to_u38`, etc) -- they're independent hand-ports,
not npm consumers of this package, so this rename doesn't break them,
but their own naming is now out of sync with htrlib's, and none of them
have the "ri"/"li" context-sensitivity fix or the xiL38/xLS38 split yet.
Syncing them to match is a separate follow-up if wanted.
