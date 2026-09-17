# xi38 / xi52 transliteration table

Two Roman conventions are used in this repo.

- **xi38** (also called xh38 = xnglohinDi38, and the `xv38` series) is the
  older scheme, targeted at readers who have the xi38/xh38 font.
- **xi52** is the scheme this branch (`wimxlds_p1onli`) targets. It uses
  digraphs for aspirated stops, so it reads correctly for plain-Latin
  readers who don't have the font installed.

## Full confirmed mapping

| Hindi | xi38 | xi52 | plain-Latin | notes |
|-------|------|------|-------------|-------|
| अ     | `x`  | `x`  | `A` / `a`   | glyph: in both fonts, `x` and `A` are drawn as an A-shape with a horizontal bar in the lower section |
| त     | `j`  | `T`  | `T`         | unaspirated dental |
| थ     | `J`  | `j`  | `Th`        | aspirated dental |
| द     | `D`  | `D`  | `D`         | unaspirated dental (voiced) |
| ध     | `q`  | `Dh` | `Dh`        | aspirated dental (voiced) |
| ट     | `t`  | `t`  | `t`         | unaspirated retroflex |
| ठ     | `T`  | `J`  | `th`        | aspirated retroflex |
| ड     | `d`  | `d`  | `d`         | unaspirated retroflex (voiced) |
| ढ     | `Q`  | `dh` | `dh`        | aspirated retroflex (voiced) |
| ड़    | `R`  | `R`  | `rr`        | retroflex flap |
| ढ़    | `R`  | `R`  | `rr`        | same as ड़ in both conventions |
| ह     | `v`  | `H`  | `H`         | xi38 font draws `v` as `∀`; xi52 font draws `H` with a dot on top |
| व     | `w`  | `w`  | `w`         | same in both |

## The core pattern

For aspirated stops, xi38 uses single uppercase letters, and xi52 uses
two-letter digraphs. They swap:

| pair | xi38 | xi52 |
|------|------|------|
| dental unaspirated / aspirated | `j` / `J` | `T` / `j` |
| dental voiced unaspirated / aspirated | `D` / `q` | `D` / `Dh` |
| retroflex unaspirated / aspirated | `t` / `T` | `t` / `J` |
| retroflex voiced unaspirated / aspirated | `d` / `Q` | `d` / `dh` |

A worked example: पौधा

- xi38: `pouqa`
- xi52: `pouDha`

## Plain-reader guidance (advertisement / teaching)

A reader who does not have the xnglo font installed sees plain Latin
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