export class hsciistr {
	// e52 is English (26+26)
	// u10 : 9 Indian writing scripts + 1 Sri Lanka writing script
	static e52_x38_translatecode_dict: { [key: string]: string } = {
		xv38: 'hi', xb38: 'bn', xp38: 'pa', xg38:'gu', xo38: 'or', xt38: 'ta',
		xj38: 'te', xm38: 'ml', xk38: 'kn', xs38: 'si' , xmr38:'mr'
	};
	static phrom: { [key: string]: string } = { e52: 'e52', u10: 'u10', e52u10: 'e52u10' };
	// Cleanly mapped to match GEMINI.md line 16 Xnglo short tag specification
	static tu: { [key: string]: string } = {
		e23: 'e23', xe38: 'xe38', 
		xi38: 'xi38', xv38: 'xv38', xb38: 'xb38', 
		xp38: 'xp38', xo38: 'xo38', xj38: 'xj38', xt: 'xt38', xm38: 'xm38', 
		xk38: 'xk38', xs38: 'xs38', xmr38: 'xmr38'
	};
	input: string; phrom: string; tu: string;
	output: { [key: string]: string } = {
		e23: '', xe38: '', xi38: '',
		xv38: '', xmr38:'', xb38: '', xp38: '', xo38: '', xg38:'', 
		xj38: '', xt38: '', xm38: '', xk38: '',
		xs38: ''
	};

	static unicode_india_9scripts_2_xnglo_india_dict = {
		remainder_charlist: [
			'', // 	ऀ	900	2304		inverted candrabindu
			'N', // 	ँ	901	2305		anunasika(candrabindu)
			'N', // 	ं ń	902	2306	anuswara	anusvara bindu
			':', // 	ः	903	2307		visarga
			'xe', // 	ऄ à	904	2308		short a ,  e in awadh
			'x', // 	अ	905	2309	vovls
			'xa', // 	आ  àα	906	2310	vovls
			'_i', // 	इ	907	2311	vovls
			'_i', // 	ई	908	2312	vovls
			'_u', // 	उ	909	2313	vovls
			'_u', // 	ऊ	90A	2314	vovls
			'ri', // 	ऋ	90B	2315	vovls
			'li', // 	ऌ	90C	2316	vovls
			'_e', // 	ऍ	90D	2317	no	candra e
			'_e', // 	ऎ	90E	2318	no	short e
			'_e', // 	ए	90F	2319	vovls
			'_e', // 	ऐ	910	2320	vovls
			'ao', // 	ऑ	911	2321		candra o
			'_o', // 	ऒ	912	2322		short o
			'o', // 	ओ	913	2323
			'ou', // 	औ	914	2324
			'k', // 	क	915	2325
			'K', // 	ख	916	2326
			'g', // 	ग	917	2327
			'gh', // 	घ	918	2328
			'N', // 	ङ	919	2329
			'c', // 	चꞆꞇćċ	91A	2330
			'C', // 	छ	91B	2331
			'z', // 	ज	91C	2332
			'Z', // 	झ	91D	2333
			'n', // 	ञ	91E	2334		nya
			't', // 	ट	91F	2335
			'T', // 	ठ	920	2336
			'd', // 	ड	921	2337
			'D', // 	ढ	922	2338
			'n', // 	ण	923	2339		nna
			'j', // 	तтτ	924	2340
			'J', // 	थ	925	2341
			'q', // 	द ꟈđԃ	926	2342
			'Q', // 	ध	927	2343 Ԁh dh ԃh
			'n', // 	न	928	2344
			'n', // 	ऩ	929	2345		nnna
			'p', // 	प	92A	2346
			'f', // 	फ	92B	2347
			'b', // 	ब	92C	2348
			'B', // 	भ	92D	2349
			'm', // 	म	92E	2350
			'y', // 	य	92F	2351
			'r', // 	र	930	2352
			'r', // 	ऱ	931	2353		rra
			'l', // 	ल	932	2354
			'l', // 	ळ	933	2355		lla
			'l', // 	ऴ	934	2356		llla
			'w', // 	व	935	2357
			'S', // 	श	936	2358
			's', // 	ष	937	2359
			's', // 	स	938	2360
			'v', // 	हɦH	939	2361
			'oe', // 	ऺ	93A	2362		oe
			'ui', // 	ऻ	93B	2363		ooe
			'', // 	़	93C	2364		nukta for extending the alphabet to new letters
			'!', // 	ऽ	93D	2365		Avagraha
			'a', // 	ा α	93E	2366	vvs
			'i', // 	ि	93F	2367	vvs
			'ii', // 	ी	940	2368	vvs
			'u', // 	ु	941	2369	vvs
			'uu', // 	ू	942	2370	vvs
			'ri', // 	ृ	943	2371	vvs
			'r', // 	ॄ	944	2372
			'e', // 	ॅ	945	2373		candra e
			'ei', // 	ॆ	946	2374		short e
			'e', // 	े	947	2375
			'ei', // 	ै	948	2376
			'o', // 	ॉ	949	2377		candra o
			'oe', // 	ॊ	94A	2378		short o
			'o', // 	ो	94B	2379	vvs
			'xu', // 	ौ	94C	2380	vvs
			'', // 	्	94D	2381	virama	VIRAMA halant suppresses inherent vowel
			'', // 	ॎ	94E	2382		prishthamatra e , combines with e to form ai, with aa to form o,and with o to form au
			'ou', // 	ॏ	94F	2383		aw
			'om', // 	ॐ	950	2384
			'', // 	॑	951	2385		stress sign udatta, vedic tone svarita
			'', // 	॒	952	2386		anudatta
			'`', // 	॓	953	2387		grave accent
			"'", // 	॔	954	2388		acute accent
			'eei', // 	ॕ	955	2389		vowel sign candra long e
			'ui', // 	ॖ	956	2390		vowel sign ue
			'uui', // 	ॗ	957	2391		vowel sign uue
			'k', // 	क़	958	2392
			'K', // 	ख़	959	2393
			'g', // 	ग़	95A	2394
			'z', // 	ज़	95B	2395
			'R', // 	ड़	95C	2396
			'R', // 	ढ़	95D	2397
			'f', // 	फ़	95E	2398
			'y', // 	य़	95F	2399
			'ri', // 	ॠ	960	2400
			'li', // 	ॡ	961	2401
			'li', // 	ॢ	962	2402
			'li', // 	ॣ	963	2403
			'.', // 	।	964	2404
			'.', // 	॥	965	2405
			'0', // 	०	966	2406
			'1', // 	१	967	2407
			'2', // 	२	968	2408
			'3', // 	३	969	2409
			'4', // 	४	96A	2410
			'5', // 	५	96B	2411
			'6', // 	६	96C	2412
			'7', // 	७	96D	2413
			'8', // 	८	96E	2414
			'9', // 	९	96F	2415
			'_', // 	॰	970	2416		abbreviation sign
			'__', // 	ॱ	971	2417		high spacing dot
			'x', // 	ॲ	972	2418		A
			'xo', // 	ॳ	973	2419		o
			'xo', // 	ॴ	974	2420		oe
			'xo', // 	ॵ	975	2421		ao
			'ui', // 	ॶ	976	2422		ui
			'ui', // 	ॷ	977	2423		uui
			'q', // 	ॸ	978	2424		d
			'Z', // 	ॹ	979	2425		z
			'y', // 	ॺ	97A	2426		y
			'n', // 	ॻ	97B	2427		n
			'z', // 	ॼ	97C	2428		z
			'?', // 	ॽ	97D	2429		?
			'd', // 	ॾ	97E	2430		d
			'b' // 	ॿ	97F	2431		b
		],
		hard_consonants_modulo_list: [
			0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
			0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
		],
		vovli_modulo_list: [
			0x15, 0x17, 0x1a, 0x1c, 0x1f, 0x21, 0x24, 0x26, 0x2a, 0x2c, 0x37, 0x58,
			0x5a, 0x5b, 0x79, 0x7c, 0x7e, 0x7f
		]
	};

	static unicode_india_10thscript_2_xnglo_india_dict = {
	///////kKzZtTdDjJqQnpfbBmyrlwSsɦ
	remainder_charlist: [
		'', // 	d80
		'N', // d81 CANDRABINDU
		'N', // d82 nbindu
		':', // d83 visarga
		'e', // d84
		'A', // d85 letter a
		'Aa', // d86 letter aa
		'AE', // d87  letter ae
		'ae', // d88  letter aae
		'AI', // d89  letter i
		'AI', // d8a letter ii
		'AU', // d8b= sinhala letter u
		'AU', // d8c= sinhala letter uu
		'r', // 	d8d volalic r
		'ri', // 	d8e vocalic rr
		'l', // 	d8f volalic l
		'li', // 	d90 volalic ll
		'AE', // 	d91 letter e
		'AE', // 	d92 letter ee
		'AE', // 	d93= sinhala letter ai
		'AO', // 	d94= sinhala letter o
		'AO', // 	d95= sinhala letter oo
		'AO', // 	d96= sinhala letter au
		'', // 	d97 null
		'', // 	d98 null
		'', // 	d99 null
		'k', // 	d9a ka
		'K', // 	d9b kha
		'g', // 	d9c ga
		'gh', // 	d9d gha
		'N', // 	d9e nga
		'N', // 	d9f nnga
		'ch', // 	da0 ch
		'Ch', // 	da1 chh
		'z', // 	da2 za
		'Z', // 	da3 zha
		'n', // 	da4= sinhala letter nya
		'n', // 	da5= sinhala letter jnya
		'n', // 	da6= sinhala letter nyja
		't', // 	da7= sinhala letter tta
		'T', // 	da8= sinhala letter ttha
		'd', // 	da9= sinhala letter dda
		'D', // 	daa= sinhala letter ddha
		'n', // 	dab= sinhala letter nna
		'n', // 	dac= sinhala letter nndda
		'j', // 	dad= sinhala letter тa
		'J', // 	dae= sinhala letter тha
		'q', // 	daf= sinhala letter ԃa
		'Q', // 	db0= sinhala letter ԃha
		'n', // 	db1= sinhala letter na
		'', // 	db2=null
		'nq', // 	db3= sinhala letter nԃa
		'p', // 	db4= sinhala letter pa
		'f', // 	db5= sinhala letter pha
		'b', // 	db6= sinhala letter ba
		'B', // 	db7= sinhala letter bha
		'm', // 	db8= sinhala letter ma
		'mb', // 	db9= sinhala letter mba
		'y', // 	dba= sinhala letter ya
		'r', // 	dbb= sinhala letter ra
		'', // 	dbc=null
		'l', // 	dbd= sinhala letter la (dental)
		'', // 	dbe=null
		'', // dbf=null
		'w', // 	dc0= sinhala letter va
		'S', // 	dc1= sinhala letter sha
		's', // 	dc2= sinhala letter ssa
		's', // 	dc3= sinhala letter sa (dental)
		'H', // 	dc4= sinhala letter ha
		'l', // 	dc5= sinhala letter lla
		'f', // 	dc6= sinhala letter fa
		'', // 	dc7=null
		'', // dc8=null
		'', // dc9=null
		'', // 	dca= virama
		'', // 	dcb=null
		'', // 	dcc=null
		'', // 	dcd=null
		'', // 	dce=null
		'a', // dcf= sinhala vowel sign aa
		'e', // dd0= sinhala vowel sign ae
		'ae', // 	dd1= sinhala vowel sign aae
		'i', // 	dd2= sinhala vowel sign i
		'i', // 	dd3= sinhala vowel sign ii
		'u', // dd4= sinhala vowel sign u
		'', // dd5=null
		'u', // dd6= sinhala vowel sign uu
		'', // dd7=null
		'ri', // dd8= sinhala vowel sign vocalic r
		'e', // dd9= sinhala vowel sign e
		'e', // dda= sinhala vowel sign ee
		'ei', // ddb= sinhala vowel sign ai
		'o', // ddc= sinhala vowel sign o
		'o', // ddd= sinhala vowel sign oo
		'o', // dde= sinhala vowel sign au
		'l', // ddf= sinhala vowel sign vocalic l
		'', // de0=null
		'', // de1=null
		'', // de2=null
		'', // de3=null
		'', // de4=null
		'', // de5=null
		'0', // de6
		'1', // 	de7
		'2', // de8
		'3', // de9
		'4', // dea
		'5', // deb
		'6', // dec
		'7', // ded
		'8', // dee
		'9', // def
		'', // df0=null
		'', // df1=null
		'ri', // df2= sinhala vowel sign vocalic rr
		'li', // df3= sinhala vowel sign vocalic ll
		'.', // df4 eotext
		'', // df5
		'', // df6
		'', // df7
		'', // df8
		'', // df9
		'', // dfa
		'', // dfb
		'', // dfc
		'', // dfd
		'', // dfe
		'' // dff
	],
	// consonants_modulo_range : [ 0x15, 0x39 ],
	hard_consonants_modulo_list: [
	  0x1a, 0x1c, 0x20, 0x22, 0x27, 0x29, 0x2d, 0x2f, 0x33, 0x34, 0x36, 0x39,
	  0x42, 0x43
	],
	vovli_modulo_list: [
	  0x6, 0x8, 0x9, 0xa, 0xb, 0xc, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
	]
	};

	constructor(phromarg = hsciistr.phrom.e52u10, tuarg = hsciistr.tu.xi) {
		if ((phromarg in hsciistr.phrom) && (tuarg in hsciistr.tu)) { 
			if (phromarg === "")
			this.phrom = phromarg; this.tu = tuarg; 
		} else {
			this.phrom = hsciistr.phrom.e52u10;
			this.tu = hsciistr.tu.xi;
			console.error("phromarg/tuarg not in hsciistr.phromarg /tu is in hsciistr.phromarg / hsciistr.tu");
		}
		this.input = "";
	}

	set_input(input: string): hsciistr { this.input = input; return this; }
  
	set_phrom(phrom_arg: string): hsciistr {
		if (phrom_arg in hsciistr.phrom) { 
			this.phrom = phrom_arg; 
		} else {
			console.error("phrom_arg not in hsciistr.phrom. so meking this.phrom = hsciistr.phrom.e52u10 \n");
			this.phrom = hsciistr.phrom.e52u10;
		}
		return this;
	}
  
	settostr(tustr_arg: string): hsciistr {
		if (tustr_arg in hsciistr.tu) { 
			this.tu = tustr_arg; 
		} else {
			console.error("tustr_arg not in hsciistr.tu so meking this.tu = hsciistr.tu.xi\n");
			this.tu = hsciistr.tu.xi;
		}
		return this;
	}

	e52_to_e23(): void {
		if (this.input) {
		  this.input = this.input.toLowerCase();
		  this.input = this.input
			.replace(/lover/g, "lwxr")
			.replace(/never/g, "nxwxr")
			.replace(/vest/g, "weist")
			.replace(/vine/g, "wayin")
			.replace(/vary/g, "wxyri")
			.replace(/vet/g, "wyt")
			.replace(/j/g, 'z').replace(/q/g, 'k').replace(/v/g, 'w')
			.replace(/([a-wyz])x/g, '$1ks')
			.replace(/\bxi/g, 'zi')
			.replace(/\bxy/g, 'zai')
			.replace(/\bxmas/g, 'christmAs')
			.replace(/\bxr/g, 'xksr')
			.replace(/\bx/g, 'xks');
		}
	}

	// Pre lifecycle normalization hook pass
	pre_u10_to_xi(): void {
		if (this.input) { 
		  this.input = this.input.replace(/([\s\b])क्ष/g, '$1sh').replace(/^क्ष/g, 'sh').replace(/ज्ञ/g, 'gy');
		}
	}

	// Post lifecycle phonetic alignment pass
	u10_to_xi_post(): void {
		this.output['xi'] = this.output['xi']
		  .replace(/^#S/, "S").replace(/(\W)#S/g, "$1S").replace(/#S/g, "kS")
		  .replace(/^_/, "").replace(/(\W)_/g, "$1").replace(/([aiueo])_/g, "$1")
		  .replace(/_i/g, "yi").replace(/_e/g, "ye").replace(/_u/g, "xu")
		  .replace(/N$/, "").replace(/N(\W)/g, "$1")
		  .replace(/Nb/g, "mb").replace(/NB/g, "mB").replace(/Np/g, "mp").replace(/Nf/g, "mf")
		  .replace(/N(?![kKgG])/g, "n");
	}

	// Core unicode range mapping matrix array parser loop
	u10_to_xi(): void { 
		this.pre_u10_to_xi();
		if (this.input) {
			const input_length: number = this.input.length;
			this.output['xi'] = '';
			let indeks = 0; let curr_char = ''; let nekst_char = '';
			let curr_u10 = 0; let curr_u10_kuotient = 0; let curr_u10_remainder = 0;
			while (indeks < input_length) {
					if (indeks === 0) { curr_char = this.input; } else { curr_char = nekst_char; }
					curr_u10 = curr_char.charCodeAt(0);
					curr_u10_kuotient = (curr_u10 / 0x80) >> 0;
					curr_u10_remainder = curr_u10 % 0x80;
					nekst_char = this.input[indeks + 1]; // correct?
					if (curr_u10_kuotient > 0x11 && curr_u10_kuotient < 0x1b) {
						this.output['xi'] += hsciistr.unicode_india_9scripts_2_xnglo_india_dict.remainder_charlist[curr_u10_remainder]; 
					} else if (curr_u10_kuotient === 0x1b) {
						this.output['xi'] += hsciistr.unicode_india_10thscript_2_xnglo_india_dict.remainder_charlist[curr_u10_remainder];
					} else { this.output['xi'] += curr_char; }
					indeks++;
				}
			this.u10_to_xi_post();
			this.input = this.output.xi;
		}
	}

	e52u10_to_xi(): void { this.e52_to_e23(); this.u10_to_xi(); }

  transliterate_tekst_nodes(node: Node) {
    let dikt_pair_list: Array<{ tekstNode: Node | null; start: number }> = [];
    let curr_dikt_pair: { tekstNode: Node | null; start: number };
    let curr_node_text = '';
    const doc = node.ownerDocument;
    if (!doc) return;
    
    const shadow_root: Node | null = doc.body.shadowRoot;
    if (shadow_root) {
      const treeWalker = doc.createTreeWalker(shadow_root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          return node.parentNode?.nodeName.toLowerCase() === 'script' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      });
      let nekst_node: Node | null;
      let text = '';
      while ((nekst_node = treeWalker.nextNode())) {
        dikt_pair_list.push({ tekstNode: nekst_node, start: text.length });
        if (nekst_node.nodeValue) {
          text += nekst_node.nodeValue;
        }
      }
      for (let i = 0; i < dikt_pair_list.length; ++i) {
        curr_dikt_pair = dikt_pair_list[i];
        let spanNode: HTMLSpanElement = document.createElement('span');
        spanNode.className = 'ztred';
        spanNode.dataset.oldtekst = curr_node_text;
        if (curr_dikt_pair.tekstNode && curr_dikt_pair.tekstNode.parentNode) {
          curr_dikt_pair.tekstNode.parentNode.replaceChild(spanNode, curr_dikt_pair.tekstNode);
          spanNode.appendChild(curr_dikt_pair.tekstNode);
        }
      }
      const ztred_span_list: HTMLCollectionOf<Element> = doc.getElementsByClassName('ztred');
      for (let i = 0; i < ztred_span_list.length; ++i) {
        let nekst_ztred_span = ztred_span_list[i];
        if (nekst_ztred_span.textContent) {
          this.input = nekst_ztred_span.textContent;
          this.e52u10_to_xi();
          nekst_ztred_span.textContent = this.output['xi'];
        }
      }  
    }
  }

  transliterate_dom_node(node_arg: Node): void {
    let dikt_pair_list: Array<{ tekstNode: any; start: number }> = [];
    let curr_dikt_pair: { tekstNode: any; start: number } | null = null;
    let nekst_node: Node | null = null;
    let curr_node_text = '';
    let text = '';
    let nodeIterator: NodeIterator | null = null;
    const doc = node_arg.ownerDocument;
    if (doc) {
      nodeIterator = doc.createNodeIterator(node_arg, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          return node.parentNode?.nodeName.toLowerCase() === 'script' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      });
      if (nodeIterator) {
        while ((nekst_node = nodeIterator.nextNode())) {
          dikt_pair_list.push({ tekstNode: nekst_node, start: text.length });
          text += nekst_node.nodeValue!;
        }
        for (let i = 0; i < dikt_pair_list.length; ++i) {
          curr_dikt_pair = dikt_pair_list[i];
          let spanNode: HTMLSpanElement = document.createElement('span');
          spanNode.className = 'ztred';
          spanNode.dataset.oldtekst = curr_node_text;
          curr_dikt_pair.tekstNode.parentNode.replaceChild(spanNode, curr_dikt_pair.tekstNode);
          spanNode.appendChild(curr_dikt_pair.tekstNode);
        }
        const ztred_span_list: HTMLCollectionOf<Element> = doc.getElementsByClassName('ztred');
        for (let i = 0; i < ztred_span_list.length; ++i) {
          let nekst_ztred_span = ztred_span_list[i];
          if (nekst_ztred_span.textContent) {
            this.input = nekst_ztred_span.textContent;
            this.e52u10_to_xi();
            nekst_ztred_span.textContent = this.output['xi'];
          }
        }
      }
    }
  }

  untransliterate_dom_node(): void {
    let nodes: HTMLCollectionOf<Element> = document.getElementsByClassName('ztred');
    for (let i = 0; i < nodes.length; i++) {
      const node: Element = nodes[i];
      if (node instanceof HTMLElement) {
        node.innerText = node.dataset.oldtekst!;
      }
    }
  }

}
