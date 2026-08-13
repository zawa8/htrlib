export class hsciistr {
  // e52 is English (26+26)
  // u10 : 9 Indian writing scripts + 1 Sri Lanka writing script
  static phrom_dikt: { [key: string]: string } = { e52: 'e52', u10: 'u10', e52u10: 'e52u10' };
  
  // Cleanly mapped to match GEMINI.md line 16 Xnglo short tag specification
  static tu_dikt: { [key: string]: string } = {
    e23: 'e23', xe: 'xe', xi: 'xi', xv: 'xv', xb: 'xb', 
    xp: 'xp', xo: 'xo', xj: 'xj', xt: 'xt', xm: 'xm', 
    xk: 'xk', xs: 'xs', all: 'all'
  };

  input: string;   
  phrom: string;   
  tu: string;
  
  output_dict: { [key: string]: string } = {
    e23: '', xe: '', xi: '', xv: '', xb: '', 
    xp: '', xo: '', xj: '', xt: '', xm: '', 
    xk: '', xs: ''
  };

  constructor(phrom = hsciistr.phrom_dikt.e52u10, tu = hsciistr.tu_dikt.xi) {
    if ((phrom in hsciistr.phrom_dikt) && (tu in hsciistr.tu_dikt)) { 
      this.phrom = phrom; 
      this.tu = tu; 
    } else {
      this.phrom = hsciistr.phrom_dikt.e52u10;
      this.tu = hsciistr.tu_dikt.xi;
      console.error("this.phrom/tu not correct allowed this.phrom /tu is in hsciistr.phrom_dikt / hsciistr.tu_dikt");
    }
    this.input = "";
  }

  set_input(input: string): hsciistr { this.input = input; return this; }
  
  set_phrom(phrom_arg: string): hsciistr {
    if (phrom_arg in hsciistr.phrom_dikt) { 
      this.phrom = phrom_arg; 
    } else {
      this.phrom = hsciistr.phrom_dikt.e52u10;
      console.error("this.phrom not correct allowed this.phrom is in hsciistr.phrom_dikt\n");
    }
    return this;
  }
  
  settostr(tostr: string): hsciistr {
    if (tostr in hsciistr.tu_dikt) { 
      this.tu = tostr; 
    } else {
      this.tu = hsciistr.tu_dikt.xi;
      console.error("this.tu not correct allowed this.tu is in hsciistr.tu_dikt\n");
    }
    return this;
  }

  // Renamed core framework orchestrator
  e52u10_to_x(): hsciistr { 
    switch (this.phrom) {
      case hsciistr.phrom_dikt.e52u10: 
        this.e52_tu_e23(); 
        this.u10_tu_xi(); 
        break;
    }
    this.route_to_target();
    return this;
  }

  Hh2phonetic_hv(): void {
    if (this.input) {
      this.input = this.input.replace(/H/g, 'h').replace(/(\s)h/g, '$1H').replace(/([^kgcztdjqpbs])h/gi, '$1v');
    }
  }

  Nn2phonetic_N(): void {
    if (this.input) {
      this.input = this.input
        .replace(/^#S/, "S")
        .replace(/(\W)#S/g, "$1S")
        .replace(/#S/g, "kS")
        .replace(/^_/, "")
        .replace(/(\W)_/g, "$1")
        .replace(/([aiueo])_/g, "$1")
        .replace(/_i/g, "yi").replace(/_e/g, "ye").replace(/_u/g, "xu")
        .replace(/N$/, "")
        .replace(/N(\W)/g, "$1")
        .replace(/Nb/g, "mb").replace(/NB/g, "mB").replace(/Np/g, "mp").replace(/Nf/g, "mf")
        .replace(/N(?![kKgG])/g, "n");
    }
  }

  Ww2vv(): void {
    if (this.input) {
      this.input = this.input.replace(/W/g, 'w');
    }
  }

  Aa2phonetic_Aa(): void {
    if (this.input) {
      this.input = this.input.replace(/A/g, 'a');
    }
  }

  e52_tu_e23(): void {
    if (this.input) {
      this.input = this.input.toLowerCase();
      this.input = this.input.replace(/j/g, 'z').replace(/q/g, 'k').replace(/v/g, 'w')
        .replace(/([a-wyz])x/g, '$1ks')
        .replace(/\bxi/g, 'zi')
        .replace(/\bxy/g, 'zai')
        .replace(/\bxmas/g, 'christmAs')
        .replace(/\bxr/g, 'xksr')
        .replace(/\bx/g, 'xks');
    }
  }

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
          this.e52u10_to_x();
          nekst_ztred_span.textContent = this.output_dict['xi'];
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
            this.e52u10_to_x();
            nekst_ztred_span.textContent = this.output_dict['xi'];
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

  xvjqK2hindi(): hsciistr {
    this.set_input(
      this.input.replace(/q/g, 'द').replace(/j/g, 'त').replace(/Q/g, 'ध').replace(/J/g, 'थ').replace(/K/g, 'ख')
      .replace(/Z/g, 'झ').replace(/T/g, 'ठ').replace(/D/g, 'ढ').replace(/B/g, 'भ').replace(/S/g, 'श').replace(/x/g, 'अ').replace(/v/g, 'ह')
    );
    return this;
  }

  kh2soft() {
    this.set_input(
      this.input.replace(/([kztdjqbs])h/g, '$1___')
        .replace(/q___/g, 'ध')
        .replace(/j___/g, 'थ')
        .replace(/k___/g, 'ख')
        .replace(/z___/g, 'झ')
        .replace(/t___/g, 'ठ')
        .replace(/d___/g, 'ढ')
        .replace(/b___/g, 'भ')
        .replace(/s___/g, 'श'));
    return this;
  }

  // Pre lifecycle normalization hook pass
  pre_e52u10_to_x(): void {
    if (this.input) { 
      this.input = this.input.replace(/([\s\b])क्ष/g, '$1sh').replace(/^क्ष/g, 'sh').replace(/ज्ञ/g, 'gy');
    }
  }

  // Core unicode range mapping matrix array parser loop
  u10_tu_xi(): void { 
    this.pre_e52u10_to_x();
    if (this.input) {
      const inputLength: number = this.input.length;
      this.output_dict['xi'] = '';
      let indeks = 0; let curr_char = ''; let nekst_char = '';
      let curr_unicodeL = 0; let curr_unicode_li = 0; let curr_unicode_ki = 0;

      while (indeks < inputLength) {
        if (indeks === 0) { curr_char = this.input; } else { curr_char = nekst_char; }
        curr_unicodeL = curr_char.charCodeAt(0);
        curr_unicode_li = (curr_unicodeL / 0x80) >> 0;
        curr_unicode_ki = curr_unicodeL % 0x80;
        nekst_char = this.input[indeks + 1];
        if (curr_unicode_li > 0x11 && curr_unicode_li < 0x1b) {
          this.output_dict['xi'] += this.unicode_india_9scripts_2_xnglo_india_dict.unicode_hindi_array[curr_unicode_ki]; 
        } else if (curr_unicode_li === 0x1b) {
          this.output_dict['xi'] += this.unicode_india_10thscript_2_xnglo_india_dict.unicode_hindi_array[curr_unicode_ki];
        } else { this.output_dict['xi'] += curr_char; }
        indeks++;
      }
      this.post_e52u10_to_x();
      this.input = this.output_dict.xi;
    }
  }

  // Post lifecycle phonetic alignment pass
  post_e52u10_to_x(): void {
    this.output_dict['xi'] = this.output_dict['xi']
      .replace(/^#S/, "S")
      .replace(/(\W)#S/g, "$1S")
      .replace(/#S/g, "kS")
      .replace(/^_/, "")
      .replace(/(\W)_/g, "$1")
      .replace(/([aiueo])_/g, "$1")
      .replace(/_i/g, "yi").replace(/_e/g, "ye").replace(/_u/g, "xu")
      .replace(/N$/, "")
      .replace(/N(\W)/g, "$1")
      .replace(/Nb/g, "mb").replace(/NB/g, "mB").replace(/Np/g, "mp").replace(/Nf/g, "mf")
      .replace(/N(?![kKgG])/g, "n");
  }

