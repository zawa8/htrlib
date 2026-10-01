// Main test entry point: runs every htrlib test, split out into
// ../test-parts/*.ts by topic (one describe-group per file, same tests
// as before the split -- see git history for the original monolithic
// version of this file if you need to diff against it).
//
// The split files live OUTSIDE __tests__/ on purpose: Jest's default
// testMatch picks up every file under any __tests__/ directory
// (`**/__tests__/**/*.[jt]s?(x)`), not just ones ending in `.test.ts` --
// so if the split files lived in here too, each would be discovered and
// run BOTH on its own AND again via this file's imports below, running
// every test twice. Keeping them in ../test-parts/ means only this one
// file is auto-discovered, and it pulls in all the others itself.
//
// DOM-node methods (transliterate_tekst_nodes, transliterate_dom_node,
// untransliterate_dom_node) are intentionally NOT tested here -- they
// need a real DOM (jsdom) environment, per the user's request to skip
// that for now.

import "../test-parts/xi38-hindi";
import "../test-parts/xi38-to-ui38";
import "../test-parts/e23-english";
import "../test-parts/duztr-dispatch";
import "../test-parts/constructor-fallback";
import "../test-parts/static-dicts";
import "../test-parts/translate-e52-x";
import "../test-parts/transliterate-e52-x";
import "../test-parts/uten-to-u38";
