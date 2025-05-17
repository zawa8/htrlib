export declare class hsciistr {
    istr: string;
    static from_dikt: {
        [key: string]: string;
    };
    static tu_dikt: {
        [key: string]: string;
    };
    ostrdict: {
        [key: string]: string;
    };
    from: string;
    tu: string;
    constructor(from?: string, tu?: string);
    setistr(istr: string): hsciistr;
    setfromstr(fromstr: string): hsciistr;
    settostr(tostr: string): hsciistr;
    duztr(): hsciistr;
    Hh2phonetic_H(): void;
    Nn2phonetic_N(): void;
    Ww2vv(): void;
    Aa2phonetic_Aa(): void;
    e2i(): void;
    u2i_pre(): void;
    u2i_post(): void;
    u2i(): void;
    i2l(): void;
    transliterate_tekst_nodes(node: Node): void;
    transliterate_dom_node(node_arg: Node): void;
    untransliterate_dom_node(): void;
    hinchars: string;
    i2l_dikt: {
        [key: string]: string;
    };
    xvjqK2hindi(): hsciistr;
    kh2hindiK(): this;
    usinhl2idict: {
        all_phoniks_list: string[];
        hard_consonants_modulo_list: number[];
        vovli_modulo_list: number[];
    };
    u2idict: {
        all_phoniks_list: string[];
        hard_consonants_modulo_list: number[];
        vovli_modulo_list: number[];
    };
}
