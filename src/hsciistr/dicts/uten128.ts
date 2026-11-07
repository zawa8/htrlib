// htrlib/src/hsciistr/dicts/uten128.ts
//
// Unified access to the per-script uL -> xi38 maps.
//
// Each script's uN_map.ts still holds its own unicode_hindi_array
// (Phase 1e-2 does NOT move the data -- that's Phase 1f). This file
// just unifies access through a single import surface + a
// script-name-keyed object + the li (block) -> script-name lookup
// that was previously duplicated in uL_to_xi38.ts.
//
// Why "uten128"?
//   uten = "unicode ten" (the 10 scripts: hindi through sinhala)
//   128  = 128 codepoints per script block (0x80-wide, ISCII layout)
//   The CSV form uten128-tu-xi38.csv is a future flattening
//   (Phase 1f) where all 10 scripts live in one tabular file.
//   For now this TS module is the single source of truth, wrapping
//   the existing per-script files.

import { U1_MAP } from './u1_map';
import { U2_MAP } from './u2_map';
import { U3_MAP } from './u3_map';
import { U4_MAP } from './u4_map';
import { U5_MAP } from './u5_map';
import { U6_MAP } from './u6_map';
import { U7_MAP } from './u7_map';
import { U8_MAP } from './u8_map';
import { U9_MAP } from './u9_map';
import { U10_MAP } from './u10_map';

// Script name -> 128-entry (0x00-0x7F) unicode_hindi_array.
export const UTEN128_MAP: Record<string, readonly string[]> = {
  hindi:     U1_MAP.unicode_hindi_array,
  bangla:    U2_MAP.unicode_hindi_array,
  gurmukhi:  U3_MAP.unicode_hindi_array,
  gujarati:  U4_MAP.unicode_hindi_array,
  oriya:     U5_MAP.unicode_hindi_array,
  tamil:     U6_MAP.unicode_hindi_array,
  telugu:    U7_MAP.unicode_hindi_array,
  kannada:   U8_MAP.unicode_hindi_array,
  malayalam: U9_MAP.unicode_hindi_array,
  sinhala:   U10_MAP.unicode_hindi_array,
};

// li (block index = charCode >>> 7) -> script name.
// 0x12 = 0x0900/0x80 (Devanagari), 0x13 = 0x0980/0x80 (Bengali), etc.
// 0x1B = 0x0D80/0x80 (Sinhala), the last of the 10.
export const SCRIPT_BY_LI: Record<number, string> = {
  0x12: 'hindi',
  0x13: 'bangla',
  0x14: 'gurmukhi',
  0x15: 'gujarati',
  0x16: 'oriya',
  0x17: 'tamil',
  0x18: 'telugu',
  0x19: 'kannada',
  0x1a: 'malayalam',
  0x1b: 'sinhala',
};

// Convenience: li for a given codepoint (matches the old inline
// `(u / 0x80) >> 0` math in uL_to_xi38.ts, but centralized).
export function liOf(codepoint: number): number {
  return (codepoint / 0x80) | 0;
}