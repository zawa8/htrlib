# xi38 / xi52 transliteration table

Two conventions are used in this repo. **xi38** is the older scheme that
the existing tests were written against. **xi52** is the scheme this
branch (`wimxlds_p1onli`) is migrating toward. In some cases they agree;
in others they do not.

Only the letters whose values are confirmed are listed here. Everything
else is TBD and should be filled in as the convention is finalized.

## Confirmed values

| Hindi | xi38 | xi52 | plain-Latin | notes |
|-------|------|------|-------------|-------|
| अ     | `x`  | `x`  | `A` / `a`   | glyph: `x` and `A` both drawn as A-shape with a horizontal bar in the lower section, so the two render identically in the font |
| त     | `j`  | `T`  | `T`         | |
| थ     | `J`  | `j`  | `Th`        | |
| द     | `q`  | `D`  | `D`         | |
| ध     | `Q`  | `q`  | `Dh`        | see note below |
| ट     | `t`  | `t`  | `t`         | |
| ठ     | `T`  | `J`  | `th`        | |
| ड     | `d`  | `d`  | `d`         | |
| ढ     | `D`  | `Q`  | `dh`        | |
| ह     | `v`  | `H`  | `H`         | in the xi52 font the `H` glyph gets an extra dot on top; xi38 uses `v` whose glyph looks like `∀` |
| व     | `w`  | `w`  | `w`         | same in both conventions |

## Contested / TBD

- **ध**: two candidate mappings are in play.
  - If xi38 is `Q` and xi52 is `q` (matching the "aspirated = alternate
    case" pattern of the other stops), then पौधा is `pouQa` in xi38 and
    `pouqa` in xi52.
  - If the earlier statement `पौधा -> pouqa (xi38) -> pouDha (xi52)` is
    taken literally, then ध maps to `q` in xi38 and to `Dh` in xi52.
  - **This needs to be resolved before the array is finalized.**

## Conventions

- **Aspirated stops** take a key that is *not* the same as the unaspirated
  counterpart. In the 38-character xnglo alphabet
  (`a-z K G C Z T Q J N P B R S`), the aspirated members are typically
  uppercase letters not otherwise used.
- **ह (ha)** is special: in xi38 it is written `v` because the font draws
  the `v` glyph as `∀`. In xi52 it is written `H` because the font draws
  the `H` glyph with an extra dot. Both render as a distinct ह-shape so
  the reader can tell it apart from the aspiration `h` in `kh`, `gh`,
  `ch`, `jh`, `th`, `dh`, `ph`, `bh`.
- **व (va)** is always `w`, in every convention.

## How the fonts differ

| letter | xi38 glyph | xi52 glyph |
|--------|-----------|-----------|
| `v` / `H` | `∀` (v with bar) | H with an extra dot on top |
| `x` / `A` | A-shape with lower bar | A-shape with lower bar (identical to xi38) |

Because the two glyphs for अ render identically, the choice between `x`
and `A` in the output text does not affect what a font-equipped reader
sees. It only affects plain-ASCII readers.

## Plain-reader guidance (advertisement / teaching)

A reader who does not have the xnglo font installed will see plain Latin
letters and will guess their English values. This is wrong for `x`.

**Teach readers: `x` is pronounced अ. Not "eks".**

- ✅ `x` = अ (the vowel, as in the first sound of "about" or Hindi अनार)
- ❌ `x` ≠ "eks" (the English letter-name "ex")
- ❌ `x` ≠ "ks" (the English consonant-cluster "ks", as in "box")

The glyph in the xnglo font is deliberately drawn as an A-shape with a
horizontal bar in the lower section — so a font-equipped reader sees
something between `x` and `A` and instinctively reads it as a vowel, not
as the English letter `x`.

For plain readers, the same effect is achieved by **instruction**, not
by glyph design:

1. Advertise the rule loudly: *"x is अ, not eks."*
2. Teach it early, the same way children learn `ph` = "f" or `ch` = "ch"
   in English.
3. Do not rely on context — always spell it out, because `x` in English
   has three common readings (`eks` in "box", `z` in "xylophone", `ks`
   in "axe") and none of them is अ.

Sample corrections:

| written | plain reader might say | correct pronunciation |
|---------|-----------------------|-----------------------|
| `xnar`  | eks-nar               | अनार (a-naar)         |
| `xjynj` | eks-jynj              | अत्यंत (a-tyant)      |
| `xksr`  | eks-ksr               | अक्षर (ak-shar)       |

The whole point of the xnglo project is to make this reading intuitive
once the rule is learned: `x` is the sound of अ, everywhere, always.