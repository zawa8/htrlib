import {
  transliterate_dom_node as transliterate_dom_node_impl,
  untransliterate_dom_node as untransliterate_dom_node_impl,
} from './hsciistr/dom/transliterate_dom';
import { E52_to_e23 as E52_to_e23_impl } from './hsciistr/e52_tu_e23';
import { uL_to_xi38 as uL_to_xi38_impl } from './hsciistr/uten_to_xi38';
import { xi38_to_xLS38 as xi38_to_xLS38_impl } from './hsciistr/xi38_to_xLS38';
import { translate_e52_x as translate_e52_x_impl } from './hsciistr/net/translate_e52_x';
import { transliterate_e52_x as transliterate_e52_x_impl } from './hsciistr/net/transliterate_e52_x';

// See CLAUDE_htrlib_api.md at repo root for the full naming scheme and
// pipeline description (h5/h5str/uL/E52/xi38/xiL38/xLS38 etc).
export class h5str {
	// e52 is English (26+26)
	// uL : 9 indian writing scripts + 1 srilanka writing script ("unicode ten languages")
	// xi38 : xnglo-english SCRIPT (not a language) -- the 38 Latin
	// characters any uL native-script text romanizes into, language-agnostic.
	// xe38 : xi38 script carrying the ENGLISH language specifically
	// (e52 -> phonetic transliteration -> native -> xi38).
	// xiL38 (xih38/xib38/xip38/xig38/xio38/xit38/xij38/xim38/xik38/xis38):
	// xi38 script carrying a KNOWN language L (full Latin romanization,
	// language known, script is xi38) -- h=hindi b=bangla p=gurmukhi(punjabi)
	// g=gujarati o=oriya t=tamil j=telugu m=malayalam k=kannada s=sinhala.
	// xLS38 (xhs38/xbs38/xps38/xgs38/xos38/xts38/xjs38/xms38/xks38/xss38):
	// semi-native per-SCRIPT output (letters native, marks Latin) --
	// "LS" (LanguageScript) because the SCRIPT is known but which
	// language it's carrying isn't (e.g. devanagari = hindi AND
	// marathi). See CLAUDE_htrlib_api.md for the full writeup.

	// language name (as used by xi38_to_xLS38's argLS) <-> google
	// translate/itc code <-> the xiL38/xLS38 dict keys for that language.
	static LANG_DIKT: Record<string, { code: string; xiL38: string; xLS38: string }> = {
		hindi:     { code: 'hi', xiL38: 'xih38', xLS38: 'xhs38' },
		bangla:    { code: 'bn', xiL38: 'xib38', xLS38: 'xbs38' },
		gurmukhi:  { code: 'pa', xiL38: 'xip38', xLS38: 'xps38' },
		gujarati:  { code: 'gu', xiL38: 'xig38', xLS38: 'xgs38' },
		oriya:     { code: 'or', xiL38: 'xio38', xLS38: 'xos38' },
		tamil:     { code: 'ta', xiL38: 'xit38', xLS38: 'xts38' },
		telugu:    { code: 'te', xiL38: 'xij38', xLS38: 'xjs38' },
		malayalam: { code: 'ml', xiL38: 'xim38', xLS38: 'xms38' },
		kannada:   { code: 'kn', xiL38: 'xik38', xLS38: 'xks38' },
		sinhala:   { code: 'si', xiL38: 'xis38', xLS38: 'xss38' },
	};
	private static CODE_TO_LANG: Record<string, string> = Object.fromEntries(
		Object.entries(h5str.LANG_DIKT).map(([lang, v]) => [v.code, lang])
	);

	static phrom_dikt: { [key: string]: string }  =  { e52: 'e52', uL: 'uL' };
	static tu_dikt: { [key: string]: string }  =  {
		e23: 'e23', xe38: 'xe38', xi38: 'xi38',
		xih38: 'xih38', xib38: 'xib38', xip38: 'xip38', xig38: 'xig38', xio38: 'xio38',
		xit38: 'xit38', xij38: 'xij38', xim38: 'xim38', xik38: 'xik38', xis38: 'xis38',
		xhs38: 'xhs38', xbs38: 'xbs38', xps38: 'xps38', xgs38: 'xgs38', xos38: 'xos38',
		xts38: 'xts38', xjs38: 'xjs38', xms38: 'xms38', xks38: 'xks38', xss38: 'xss38',
	};

  input: string;   phrom: string;   tu: string;
  output: { [key: string]: string } = Object.fromEntries(
    Object.keys(h5str.tu_dikt).map((k) => [k, ''])
  );

  constructor(phrom=h5str.phrom_dikt.uL, tu=h5str.tu_dikt.xi38) {
    if ( (phrom in h5str.phrom_dikt) && (tu in h5str.tu_dikt)) { this.phrom = phrom ; this.tu = tu ; }
	else {
      this.phrom = h5str.phrom_dikt.uL ;
      this.tu = h5str.tu_dikt.xi38 ;
      console.error("aiqxr ",phrom," not in ",h5str.phrom_dikt," or ", tu," not in ", h5str.tu_dikt,"\n") ;
    }
    this.input = "";
  }

  set_input(input: string): h5str { this.input = input; return this; }
  set_phrom(phrom_arg: string): h5str {
    if (phrom_arg in h5str.phrom_dikt)  { this.phrom = phrom_arg ; } else {
      this.phrom = h5str.phrom_dikt.uL ;
      console.error(phrom_arg," not in ",h5str.phrom_dikt,"\n") ;
    }
    return this;
  }
  set_tu(tu_arg: string): h5str {
    if (tu_arg in h5str.tu_dikt)  { this.tu = tu_arg ; } else {
      this.tu = h5str.tu_dikt.xi38 ;
      console.error(tu_arg," not in ",h5str.tu_dikt,"\n") ;
    }
    return this;
  }

  async duztr(): Promise<h5str> {
    switch (this.phrom) {
      case h5str.phrom_dikt.uL: {
        if (this.tu === h5str.tu_dikt.e23 || this.tu === h5str.tu_dikt.xe38 || this.tu === h5str.tu_dikt.xi38) {
          this.uL_to_xi38();
        } else if (this.tu in h5str.LANG_DIKT_BY_XIL38()) {
          // uL -> xi38 -> store the SAME full romanization into the
          // requested xiL38 slot too (script is xi38, language is now
          // known since the caller asked for a specific xiL38 slot).
          this.uL_to_xi38();
          this.output[this.tu] = this.output.xi38;
        } else {
          const lang = h5str.LANG_DIKT_BY_XLS38()[this.tu];
          if (lang) this.uL_to_xLS38(lang);
        }
        break;
      }
      case h5str.phrom_dikt.e52: {
        switch (this.tu) {
          case h5str.tu_dikt.e23:
            this.E52_to_e23();
            break;
          case h5str.tu_dikt.xi38:
            this.E52_to_e23();
            this.output.xi38 = this.output.e23;
            break;
          case h5str.tu_dikt.xe38:
            await this.E52_to_xe38('pa');
            break;
          default: {
            const xiLLang = h5str.LANG_DIKT_BY_XIL38()[this.tu];
            if (xiLLang) {
              await this.E52_to_xiL38(xiLLang);
              break;
            }
            const xlsLang = h5str.LANG_DIKT_BY_XLS38()[this.tu];
            if (xlsLang) {
              await this.E52_to_xLS38(xlsLang);
              break;
            }
            console.error(`duztr: unknown this.tu "${this.tu}" for phrom e52`);
          }
        }
        break;
      }
    }
    return this;
  }

  private static LANG_DIKT_BY_XIL38(): Record<string, string> {
    return Object.fromEntries(Object.entries(h5str.LANG_DIKT).map(([lang, v]) => [v.xiL38, lang]));
  }
  private static LANG_DIKT_BY_XLS38(): Record<string, string> {
    return Object.fromEntries(Object.entries(h5str.LANG_DIKT).map(([lang, v]) => [v.xLS38, lang]));
  }

	E52_to_e23(): void {
		if (!this.input) return;
		this.input = E52_to_e23_impl(this.input);
		this.output.e23 = this.input;
	}

	uL_to_xi38(): void {
	  if (!this.input) return;
	  this.input = uL_to_xi38_impl(this.input);
	  this.output.xi38 = this.input;
	}

	// xi38 (already-romanized Latin text) -> semi-native xLS38 for the
	// given language name ("hindi"/"bangla"/"gurmukhi"/.../"sinhala").
	// Pure function of its inputStr argument -- does NOT read/write
	// this.input (matches the repo owner's spec:
	// h5str.xi38_to_xLS38(inputStr, argLS)).
	xi38_to_xLS38(inputStr: string, argLS: string): string {
		return xi38_to_xLS38_impl(inputStr, argLS);
	}

	// uL (this.input, native-script) -> xi38 -> xLS38 for the given
	// language name, in one step. Writes into output[xLS38 slot] (and
	// leaves output.xi38 populated too, from the intermediate step).
	uL_to_xLS38(argLS: string): void {
		if (!this.input) return;
		this.uL_to_xi38();
		const slot = h5str.LANG_DIKT[argLS]?.xLS38;
		if (slot) this.output[slot] = this.xi38_to_xLS38(this.output.xi38, argLS);
	}

	// Translates this.input (English) into the target language's native
	// script via Google's public translate endpoint -- no API key, no
	// npm dependency, ported directly from translet-xnglo's
	// app/api/translate/route.ts (its "translate" mode).
	async translate_e52_x(codeOrLang: string): Promise<string> {
		if (!this.input) return "";
		const code = h5str.LANG_DIKT[codeOrLang]?.code ?? codeOrLang;
		try {
			this.input = await translate_e52_x_impl(this.input, code);
			return this.input;
		} catch (error) {
			console.error("translation failed:", error);
			throw error;
		}
	}

	// Phonetic Latin-script -> native-script transliteration (NOT
	// translation -- e.g. "namaste" -> "नमस्ते"), word-token by word-token,
	// via Google's Input Tools endpoint (ITC_CODE_DICT lives in
	// hsciistr/dicts/codes.ts, imported inside transliterate_e52_x_impl).
	// Ported from translet-xnglo's app/api/translate/route.ts (its
	// "transliterate" mode).
	async transliterate_e52_x(codeOrLang: string): Promise<string> {
		if (!this.input) return "";
		const code = h5str.LANG_DIKT[codeOrLang]?.code ?? codeOrLang;
		this.input = await transliterate_e52_x_impl(this.input, code);
		return this.input;
	}

	// E52 -> transliterate (phonetically, via Google Input Tools, through
	// whichever script's keyboard transliterates English sounds best --
	// gurmukhi by default) -> uL -> uL_to_xi38() -> xe38.
	async E52_to_xe38(argE: string = 'pa'): Promise<void> {
		await this.transliterate_e52_x(argE);
		this.uL_to_xi38();
		this.output.xe38 = this.output.xi38;
	}

	// E52 -> translate (Google) to the given language -> uL ->
	// uL_to_xi38() -> store into that language's xiL38 slot (full Latin
	// romanization, language now known).
	async E52_to_xiL38(argL: string): Promise<void> {
		const entry = h5str.LANG_DIKT[argL] ?? h5str.LANG_DIKT[h5str.CODE_TO_LANG[argL]];
		const lang = h5str.LANG_DIKT[argL] ? argL : h5str.CODE_TO_LANG[argL];
		if (!entry || !lang) {
			console.error(`E52_to_xiL38: unknown language/code "${argL}"`);
			return;
		}
		await this.translate_e52_x(entry.code);
		this.uL_to_xi38();
		this.output[entry.xiL38] = this.output.xi38;
	}

	// E52 -> translate (Google) to the given language -> uL ->
	// uL_to_xLS38(language) -> that script's xLS38 slot (semi-native).
	async E52_to_xLS38(argLS: string): Promise<void> {
		const entry = h5str.LANG_DIKT[argLS];
		if (!entry) {
			console.error(`E52_to_xLS38: unknown language "${argLS}"`);
			return;
		}
		await this.translate_e52_x(entry.code);
		this.uL_to_xLS38(argLS);
	}

	transliterate_tekst_nodes(node: Node): void {
		const doc = node.ownerDocument;
		if (doc?.body.shadowRoot) {
			transliterate_dom_node_impl(this, doc.body.shadowRoot);
		}
	}

	transliterate_dom_node(node: Node): void {
		transliterate_dom_node_impl(this, node);
	}

	untransliterate_dom_node(): void {
		untransliterate_dom_node_impl();
	}

}

// Backward-compatible alias -- the class was renamed hsciistr -> h5str
// (see CLAUDE_htrlib_api.md); kept so any external code still importing
// the old name doesn't break outright. Prefer h5str in new code.
export { h5str as hsciistr };
