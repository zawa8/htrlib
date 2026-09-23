import {
  transliterate_dom_node as transliterate_dom_node_impl,
  untransliterate_dom_node as untransliterate_dom_node_impl,
} from './hsciistr/dom/transliterate_dom';
import { e52_tu_e23 as e52_tu_e23_impl } from './hsciistr/e52_tu_e23';
import { unicode_india_to_xnglo_india_xi52 as u10_to_xi52_impl } from './hsciistr/u10_to_xi52';
import { translate_e52_x as translate_e52_x_impl } from './hsciistr/net/translate_e52_x';
import { transliterate_e52_x as transliterate_e52_x_impl } from './hsciistr/net/transliterate_e52_x';

export class hsciistr {
	// e52 is English (26+26)
	// u9 : 9 indian writing scripts
	// u10 : 9 indian writing scripts + 1 srilanka writing script
	// x38(xnglo_english) e52->x38 will be done using mappings in data/3k_local_copy.tsv
	// xi(xnglo indik(any 1 of u10 converted to xnglo))
	// xh(xnglo_hindi) , xb(xnglo_bengali), xp(xnglo_pnzabi), xg(xnglo_guzraji) , xo(xnglo_oriya)
	// (english-sourced side; uh/ub/up/ug/uo/.. name the same slots when the
	// source is native-script unicode instead -- see phrom_tu.md)
	// xj(xnglo_telugu) , xt(xnglo_tmil), xm(xnglo_mlyalm), xk(xnglo_knrra) , xs(xnglo_sinhla)
	// xmr(xnglo_mrathi)

	// Translates this.input (English) into the target language's native
	// script via Google's public translate endpoint -- no API key, no
	// npm dependency, ported directly from translet-xnglo's
	// app/api/translate/route.ts (its "translate" mode).
	async translate_e52_x(tuarg: string): Promise<string> {
		if (!this.input) return "";
		try {
			this.input = await translate_e52_x_impl(this.input, tuarg);
			return this.input;
		} catch (error) {
			console.error("translation failed:", error);
			throw error;
		}
	}
	// Phonetic Latin-script -> native-script transliteration (NOT
	// translation -- e.g. "namaste" -> "नमस्ते"), word-token by word-token,
	// via Google's Input Tools endpoint. Ported from translet-xnglo's
	// app/api/translate/route.ts (its "transliterate" mode).
	static itc_code_dict: { [key: string]: string } = {
		hi: "hi-t-i0-und", bn: "bn-t-i0-und", pa: "pa-t-i0-und", gu: "gu-t-i0-und",
		or: "or-t-i0-und", ta: "ta-t-i0-und", te: "te-t-i0-und", kn: "kn-t-i0-und", ml: "ml-t-i0-und",
	};

	async transliterate_e52_x(tuarg: string): Promise<string> {
		if (!this.input) return "";
		this.input = await transliterate_e52_x_impl(this.input, tuarg);
		return this.input;
	}
	
	static e52_x38_translatecode_dict: { [key: string]: string } = {
		xh38: 'hi', xb38: 'bn', xp38: 'pa', xg38:'gu', xo38: 'or', xt38: 'ta',
		xj38: 'te', xm38: 'ml', xk38: 'kn', xs38: 'si' , xmr38:'mr',
		// same language codes, just also reachable via the uh38/ub38/..
		// output-slot names (phrom_tu.md items 3 & 4: same
		// translate()->native-script->uL2xi52 pipeline, caller picks
		// which family of slot name -- x* or u* -- they want the result
		// copied into).
		uh38: 'hi', ub38: 'bn', up38: 'pa', ug38:'gu', uo38: 'or', ut38: 'ta',
		uj38: 'te', um38: 'ml', uk38: 'kn', us38: 'si' , umr38:'mr'
	};
	static phrom_dikt: { [key: string]: string }  =  { e52: 'e52', u10: 'u10' };
	static tu_dikt: { [key: string]: string }  =  {
		e23: 'e23', xe38: 'xe38',
		xi38: 'xi38', ui38: 'ui38', xb38: 'xb38',
		xp38: 'xp38', xg38: 'xg38', xo38: 'xo38', xj38: 'xj38', xt38: 'xt38', xm38: 'xm38',
		xk38: 'xk38', xs38: 'xs38', xmr38: 'xmr38', xh38: 'xh38',
		// uh38..umr38: same as xi38 for u10-sourced (native-script) input --
		// the underlying uL2xi52() conversion already dispatches by script
		// via u1_map.ts..u10_map.ts, so the romanization value doesn't
		// change; these just let the caller name which script/language the
		// native-script input was in, mirroring the xh38/xb38/.. labels
		// used on the e52 (english-sourced) side.
		uh38: 'uh38', ub38: 'ub38', up38: 'up38', ug38: 'ug38', uo38: 'uo38',
		uj38: 'uj38', ut38: 'ut38', um38: 'um38', uk38: 'uk38', us38: 'us38', umr38: 'umr38'
	};

  input: string;   phrom: string;   tu: string;
  output: { [key: string]: string } = {
		e23: '', xe38: '', xi38: '', ui38: '',
		xh38: '', xmr38:'', xb38: '', xp38: '', xo38: '', xg38:'',
		xj38: '', xt38: '', xm38: '', xk38: '',
		xs38: '',
		uh38: '', ub38: '', up38: '', ug38: '', uo38: '',
		uj38: '', ut38: '', um38: '', uk38: '', us38: '', umr38: ''
  };

  constructor(phrom=hsciistr.phrom_dikt.u10, tu=hsciistr.tu_dikt.xi38) {
    if ( (phrom in hsciistr.phrom_dikt) && (tu in hsciistr.tu_dikt)) { this.phrom = phrom ; this.tu = tu ; }
	else {
      this.phrom = hsciistr.phrom_dikt.u10 ;
      this.tu = hsciistr.tu_dikt.xi38 ;
      console.error("aiqxr ",phrom," not in ",hsciistr.phrom_dikt," or ", tu," not in ", hsciistr.tu_dikt,"\n") ;
    }
    this.input = "";
  }

  set_input(input: string): hsciistr { this.input = input; return this; }
  set_phrom(phrom_arg: string): hsciistr {
    if (phrom_arg in hsciistr.phrom_dikt)  { this.phrom = phrom_arg ; } else {
      this.phrom = hsciistr.phrom_dikt.u10 ;
      console.error(phrom_arg," not in ",hsciistr.phrom_dikt,"\n") ;
    }
    return this;
  }
  set_tu(tu_arg: string): hsciistr {
    if (tu_arg in hsciistr.tu_dikt)  { this.tu = tu_arg ; } else {
      this.tu = hsciistr.tu_dikt.xi38 ;
      console.error(tu_arg," not in ",hsciistr.tu_dikt,"\n") ;
    }
    return this;
  }

  async duztr(): Promise<hsciistr> {
    switch (this.phrom) {
      case hsciistr.phrom_dikt.u10:
        // phrom_tu.md items 5 & 6: unicode -> ui38, unicode -> xi38 -- both
        // just the generic uL2xi52() result, under whichever slot name the
        // caller asked for (ui38 and xi38 are interchangeable aliases here,
        // same as uh38/xh38 etc. below).
        this.uL2xi52();
        this.output[this.tu] = this.output.xi38;
        break;
      case hsciistr.phrom_dikt.e52:
        switch (this.tu) {
          case hsciistr.tu_dikt.e23:
            this.e52_tu_e23();
            break;
          case hsciistr.tu_dikt.xi38:
            // e52 source, generic xnglo-India target: e23 IS the xnglo
            // subset for English, so just run e52->e23 and expose it
            // also as xi38. (Previously this case silently no-op'd.)
            this.e52_tu_e23();
            this.output.xi38 = this.output.e23;
            break;
          case hsciistr.tu_dikt.xe38:
			await this.transliterate_e52_x('pa') ;
			this.uL2xi52();
			this.output.xe38 = this.output.xi38;
		  break;
          default:
            // any xh38/xb38/xp38/xg38/xo38/xt38/xj38/xm38/xk38/xs38/xmr38 OR
            // uh38/ub38/up38/ug38/uo38/ut38/uj38/um38/uk38/us38/umr38
            // target (phrom_tu.md items 3 & 4): translate e52 -> that
            // language's native script, then run the native-script text
            // through the u10->xi38 converter, and copy the shared 'xi38'
            // result into this specific output slot.
            if (this.tu in hsciistr.e52_x38_translatecode_dict) {
              await this.translate_e52_x(hsciistr.e52_x38_translatecode_dict[this.tu]);
              this.uL2xi52();
              this.output[this.tu] = this.output.xi38;
            } else {
              console.error(`duztr: unknown this.tu "${this.tu}" for phrom e52`);
            }
            break;
        }
        break;
    }
    return this;
  }


	e52_tu_e23(): void {
		if (!this.input) return;
		this.input = e52_tu_e23_impl(this.input);
		this.output.e23 = this.input;
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

	uL2xi52(): void {
	  if (!this.input) return;
	  this.input = u10_to_xi52_impl(this.input);
	  this.output.xi38 = this.input;
	}

}