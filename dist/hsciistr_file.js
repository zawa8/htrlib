export class hsciistr {
    constructor(from = hsciistr.from_dikt.ascii_and_indik, tu = hsciistr.tu_dikt.inglish) {
        this.ostrdict = {
            inglish: '', korean: '', russian: '', hindi: '', bangla: '', gurmukhi: '', guzrati: '', oriya: '', tamil: '', kannada: '', telugu: '', malayalam: '', sinhala: ''
        };
        // hinchars: string = 'kKzZtTdDjJqQnpfbBmyrlSsɦA';
        this.hinchars = 'kKzZtTdDjJqQnpfbBmyrlSsHA';
        this.i2l_dikt = {
            hindi: 'कखजझटठडढतथदधनपफबभमयरलशसहअव',
            bangla: 'কখজঝটঠডঢতথদধনপফবভমযরলশসহঅw',
            gurmukhi: 'ਕਖਜਝਟਠਡਢਤਥਦਧਨਪਫਬਭਮਯਰਲਸ਼ਸਹਅਵ',
            guzrati: 'કખજઝટઠડઢતથદધનપફબભમયરલશસહઅવ',
            oriya: 'କଖଜଝଟTଡଢତଥଦଧନପଫବଭମଯରଲଶସହଅଵ',
            telugu: 'కఖజఝటఠడఢతథదధనపఫబభమయరలశసహఅవ',
            kannada: 'ಕಖಜಝಟಠಡಢತಥದಧನಪಫಬಭಮಯರಲಶಸಹಅವ',
            malayalam: 'കഖജഝടഠഡഢതഥദധനപഫബഭമയരലശസഹഅവ',
            sinhala: 'කඛජඣටඨඩඪතථදධනපඵබභමයරලශසහඅව',
            tamil: 'கKஜZடTdDதJqQநபfbBமயரலஶஸஹஅவ',
            korean: 'ㅋKㅈZㅌT다DjJqQㄴㅍf바Bㅁㅑ라lSㅅㅎㅏ봐w',
            russian: 'kKzZtTдДтТдДнпфбБмйрлщшHAw'
        };
        this.u2idict = {
            all_phoniks_list: [
                '', // 	ऀ	900	2304		inverted candrabindu
                'N', // 	ँ	901	2305		anunasika(candrabindu)
                'N', // 	ं ń	902	2306	anuswara	anusvara bindu
                ':', // 	ः	903	2307		visarga
                'AE', // 	ऄ à	904	2308		short a ,  e in awadh
                'A', // 	अ	905	2309	vovls
                'Aa', // 	आ  àα	906	2310	vovls
                'AI', // 	इ	907	2311	vovls
                'AI', // 	ई	908	2312	vovls
                'AU', // 	उ	909	2313	vovls
                'AU', // 	ऊ	90A	2314	vovls
                'ri', // 	ऋ	90B	2315	vovls
                'li', // 	ऌ	90C	2316	vovls
                'AE', // 	ऍ	90D	2317	no	candra e
                'AE', // 	ऎ	90E	2318	no	short e
                'AE', // 	ए	90F	2319	vovls
                'AE', // 	ऐ	910	2320	vovls
                'AO', // 	ऑ	911	2321		candra o
                'AO', // 	ऒ	912	2322		short o
                'AO', // 	ओ	913	2323
                'AO', // 	औ	914	2324
                'k', // 	क	915	2325
                'K', // 	ख	916	2326
                'g', // 	ग	917	2327
                'gh', // 	घ	918	2328
                'ng', // 	ङ	919	2329
                'c', // 	चꞆꞇćċ	91A	2330
                'ch', // 	छ	91B	2331
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
                'H', // 	हɦH	939	2361
                'oe', // 	ऺ	93A	2362		oe
                'ui', // 	ऻ	93B	2363		ooe
                '', // 	़	93C	2364		nukta for extending the alphabet to new letters
                '!', // 	ऽ	93D	2365		Avagraha
                'a', // 	ा α	93E	2366	vvs
                'i', // 	ि	93F	2367	vvs
                'i', // 	ी	940	2368	vvs
                'u', // 	ु	941	2369	vvs
                'u', // 	ू	942	2370	vvs
                'ri', // 	ृ	943	2371	vvs
                'ri', // 	ॄ	944	2372
                'e', // 	ॅ	945	2373		candra e
                'ei', // 	ॆ	946	2374		short e
                'e', // 	े	947	2375
                'ei', // 	ै	948	2376
                'o', // 	ॉ	949	2377		candra o
                'oe', // 	ॊ	94A	2378		short o
                'o', // 	ो	94B	2379	vvs
                'o', // 	ौ	94C	2380	vvs
                '', // 	्	94D	2381	virama	VIRAMA halant suppresses inherent vowel
                '', // 	ॎ	94E	2382		prishthamatra e , combines with e to form ai, with aa to form o,and with o to form au
                'o', // 	ॏ	94F	2383		aw
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
                'rr', // 	ड़	95C	2396
                'D', // 	ढ़	95D	2397
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
                'A', // 	ॲ	972	2418		A
                'AO', // 	ॳ	973	2419		o
                'AO', // 	ॴ	974	2420		oe
                'AO', // 	ॵ	975	2421		ao
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
        this.usinhl2idict = {
            ///////kKzZtTdDjJqQnpfbBmyrlwSsɦ
            all_phoniks_list: [
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
                'c', // 	da0 ch
                'ch', // 	da1 chh
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
        if ((from in hsciistr.from_dikt) && (tu in hsciistr.tu_dikt)) {
            this.from = from;
            this.tu = tu;
        }
        else {
            this.from = hsciistr.from_dikt.ascii_and_indik;
            this.tu = hsciistr.tu_dikt.inglish;
            console.error("this.from/tu not correct allowed this.from /tu is in hsciistr.from_dikt / hsciistr.tu_dikt");
        }
        this.istr = "";
    }
    setistr(istr) { this.istr = istr; return this; }
    setfromstr(fromstr) {
        if (fromstr in hsciistr.from_dikt) {
            this.from = fromstr;
        }
        else {
            this.from = hsciistr.from_dikt.ascii_and_indik;
            console.error("this.from not correct allowed this.from is in hsciistr.from_dikt\n");
        }
        return this;
    }
    settostr(tostr) {
        if (tostr in hsciistr.tu_dikt) {
            this.tu = tostr;
        }
        else {
            this.tu = hsciistr.tu_dikt.inglish;
            console.error("this.tu not correct allowed this.tu is in hsciistr.tu_dikt\n");
        }
        return this;
    }
    duztr() {
        switch (this.from) {
            case hsciistr.from_dikt.ascii:
                this.e2i();
                break;
            case hsciistr.from_dikt.indikunicode:
                this.u2i();
                break;
            case hsciistr.from_dikt.ascii_and_indik:
                this.e2i();
                this.u2i();
                break;
        }
        //console.log( `duztr bifore i2l() this.ostrdict.inglish is ${this.ostrdict.inglish}. this.istr is ${this.istr}.` );
        this.i2l();
        return this;
    }
    Hh2phonetic_H() {
        if (this.istr) {
            this.istr = this.istr
                .replace(/H/g, 'h')
                .replace(/(\s)h/g, '$1H')
                .replace(/([^kgcꞇćjztdpbswटडपबसԃᴛ])h/gi, '$1H');
        }
    }
    Nn2phonetic_N() {
        if (this.istr) {
            this.istr = this.istr
                .replace(/N/g, 'n')
                .replace(/n([cgk])\b/gi, 'ṅ$1')
                .replace(/\bn/gi, 'ñ')
                .replace(/([a-z])nk/gi, '$1ṅk')
                .replace(/oung/gi, 'ouṅg')
                .replace(/ginge/gi, 'giñge')
                .replace(/([ht])inge/gi, '$1iñge')
                .replace(/([fyc])ring/gi, '$1riñg')
                .replace(/engin/gi, 'eñgin')
                .replace(/ngth/gi, 'ñgth')
                .replace(/ange([^dr])/gi, 'añge$1')
                .replace(/\bt([ai])ng([ei])/gi, 't$1ñg$2')
                .replace(/\bangi/gi, 'añgi')
                .replace(/inge/gi, 'iñge')
                .replace(/ing/gi, 'iṅg')
                .replace(/nge\b/gi, 'ñge')
                .replace(/ngel/gi, 'ñgel')
                .replace(/([dr])ang([ei])/gi, '$1añg$2')
                .replace(/([lv])eng/gi, '$1eñg')
                .replace(/chang([ei])/gi, 'chañg$1')
                .replace(/sseng/gi, 'sseñg')
                .replace(/nger/gi, 'ṅger')
                .replace(/([a-z])ng/gi, '$1ṅg')
                .replace(/sync/gi, 'syṅc')
                .replace(/anchor/gi, 'aṅchor')
                .replace(/linco/gi, 'liṅco')
                .replace(/sincl/gi, 'siṅcl')
                .replace(/\buncle(s?)\b/gi, 'uṅcle$1')
                .replace(/menco/gi, 'meṅco')
                .replace(/([iu])nct/gi, '$1ṅct')
                .replace(/nc([hyei])/gi, 'ñc$1')
                .replace(/inc([^hueioay])/gi, 'iṅc$1')
                .replace(/inc([aeiou])/gi, 'iñc$1')
                .replace(/([a-z])unc([^hyei])/gi, '$1uṅc$2')
                .replace(/enc([^eiyh])/gi, 'eñc$1')
                .replace(/([ao])nc([^hyei])/gi, '$1ṅc$2')
                .replace(/ṅ/g, 'N')
                .replace(/ñ/g, 'n');
        }
    }
    Ww2vv() {
        if (this.istr) {
            this.istr = this.istr
                .replace(/W/g, 'w')
                .replace(/away/gi, 'àⱱày')
                .replace(/war([ey])/gi, 'ⱱàr$1')
                .replace(/wa([nrs])/gi, 'ⱱα$1')
                .replace(/who/gi, 'ẃहo')
                .replace(/wr/gi, 'ẃr')
                .replace(/\bw/gi, 'ⱱ')
                .replace(/w\b/gi, 'ẃ')
                .replace(/swer/gi, 'sẃer')
                .replace(/two/gi, 'tẃo')
                .replace(/([^aeo])w/gi, '$1ⱱ')
                .replace(/\baw([^efknr])/gi, 'àⱱ$1')
                .replace(/aw([efknr])/gi, 'αẃ$1')
                .replace(/([a-z])aw/gi, '$1αẃ')
                .replace(/([eo])w/gi, '$1ẃ')
                .replace(/ẃ/g, 'w')
                .replace(/ⱱ/g, 'W');
        }
    }
    Aa2phonetic_Aa() {
        if (this.istr) {
            this.istr = this.istr
                .replace(/A/g, 'a')
                .replace(/aft/gi, 'αft')
                .replace(/aw([kf\s])/gi, 'αw$1')
                .replace(/\bar([cekmst])\b/gi, 'αr$1')
                .replace(/guar/gi, 'guαr')
                .replace(/ijab/gi, 'ijαb')
                .replace(/ebab/gi, 'ebαb')
                .replace(/ihad/gi, 'iHαԃ')
                .replace(/ia([ck])/gi, 'iα$1')
                .replace(/\ba/gi, 'à')
                .replace(/ai\b/g, 'αi')
                .replace(/uar([bce-su-z])/gi, 'uàr$1')
                .replace(/([a-z])a\b/gi, '$1α')
                .replace(/a([w])\b/gi, 'α$1')
                .replace(/\ba([ntsmd])\b/gi, 'à$1')
                .replace(/ar([aiey])/gi, 'àr$1')
                .replace(/([^uheio\s])arre([^lasn])/gi, '$1αrre$2')
                .replace(/([eio\s])ar/gi, '$1àr')
                .replace(/i([lgn])ar([^y])/gi, 'i$1αr$2')
                .replace(/([^beiuohlgn])ar([^y])/gi, '$1αr$2')
                .replace(/bar([^oiuer])/gi, 'bαr$1')
                .replace(/era([\b\s])/gi, 'erα$1')
                .replace(/([bcdfह\b\s])all([^yo])/gi, '$1αll$2')
                .replace(/ava/gi, 'αvα')
                .replace(/([^\b\soe])ard/gi, '$1αrd')
                .replace(/([ag])raph/gi, '$1rαph')
                .replace(/las([skmt])/gi, 'lαs$1');
        }
    }
    e2i() {
        if (this.istr) {
            this.istr = this.istr.toLowerCase();
            this.istr = this.istr.replace(/j/g, 'z').replace(/q/g, 'k').replace(/v/g, 'w')
                .replace(/([a-wyz])x/g, '$1ks')
                .replace(/\bxi/g, 'zi')
                .replace(/\bxy/g, 'zai')
                .replace(/\bxmas/g, 'christmAs')
                .replace(/\bxr/g, 'Aksr')
                .replace(/\bx/g, 'Aks'); //α/g,'A').replace();
            // this.ostrdict["inglish"] = this.istr ; // wiml
            // console.log("e2i::e2i this.ostrdict[inglish] is: \n" + this.ostrdict["inglish"] + "\n");
        }
    }
    i2l() {
        console.log(`begin i2l() this.istr is ${this.istr}. this.ostrdict.inglish is ${this.ostrdict.inglish}`);
        const inputLength = this.istr.length;
        let indeks = 0;
        let curr_chr = '';
        let curr_chr_indeks_in_hinchars = -1;
        this.ostrdict.inglish = this.istr.replace(/T/g, 'th').replace(/D/g, 'dh').replace(/j/g, 'T').replace(/J/g, 'Th').replace(/q/g, 'D').replace(/Q/g, 'Dh');
        if ('inglish' === this.tu) {
            console.log('this.tostr is inglish , so returning from i2l()');
            return;
        }
        while (indeks < inputLength) {
            curr_chr = this.istr[indeks];
            curr_chr_indeks_in_hinchars = this.hinchars.indexOf(curr_chr);
            switch (this.tu) {
                // case 'inglish': break;
                case 'all':
                    for (const key in this.i2l_dikt) {
                        if (curr_chr_indeks_in_hinchars > -1) {
                            this.ostrdict[key] += this.i2l_dikt[key][curr_chr_indeks_in_hinchars];
                        }
                        else {
                            this.ostrdict[key] += curr_chr;
                        }
                    }
                    break;
                default:
                    if (this.tu in this.i2l_dikt) {
                        if (curr_chr_indeks_in_hinchars > -1) {
                            this.ostrdict[this.tu] += this.i2l_dikt[this.tu][curr_chr_indeks_in_hinchars];
                        }
                        else {
                            this.ostrdict[this.tu] += curr_chr;
                        }
                    }
            }
            indeks++;
        }
    }
    // https://phuoc.ng/collection/this-vs-that/node-iterator-vs-tree-walker/ shadow
    transliterate_tekst_nodes(node) {
        let dikt_pair_list = [];
        let curr_dikt_pair;
        let curr_node_text = '';
        const doc = node.ownerDocument;
        if (!doc) {
            return;
        }
        const shadow_root = doc.body.shadowRoot;
        if (shadow_root) {
            const treeWalker = doc.createTreeWalker(shadow_root, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    var _a;
                    return ((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) === 'script'
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT;
                }
            });
            let nekst_node;
            let text = '';
            while ((nekst_node = treeWalker.nextNode())) {
                //console.log(textNode.nodeValue);
                dikt_pair_list.push({ tekstNode: nekst_node, start: text.length });
                if (nekst_node.nodeValue) {
                    text += nekst_node.nodeValue;
                }
            }
            for (let i = 0; i < dikt_pair_list.length; ++i) {
                curr_dikt_pair = dikt_pair_list[i];
                let spanNode = document.createElement('span');
                spanNode.className = 'ztred';
                spanNode.dataset.oldtekst = curr_node_text;
                if (curr_dikt_pair.tekstNode && curr_dikt_pair.tekstNode.parentNode) {
                    curr_dikt_pair.tekstNode.parentNode.replaceChild(spanNode, curr_dikt_pair.tekstNode);
                    spanNode.appendChild(curr_dikt_pair.tekstNode);
                }
            }
            const ztred_span_list = doc.getElementsByClassName('ztred');
            for (let i = 0; i < ztred_span_list.length; ++i) {
                let nekst_ztred_span = ztred_span_list[i];
                if (nekst_ztred_span.textContent) {
                    this.istr = nekst_ztred_span.textContent;
                    this.duztr();
                    nekst_ztred_span.textContent = this.ostrdict['inglish']; /// wery wery important
                }
            }
        }
    }
    transliterate_dom_node(node_arg) {
        let dikt_pair_list = [];
        let curr_dikt_pair = null;
        let nekst_node = null;
        let curr_node_text = '';
        let text = '';
        let nodeIterator = null;
        const doc = node_arg.ownerDocument;
        if (doc) {
            nodeIterator = doc.createNodeIterator(node_arg, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    var _a;
                    return ((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) === 'script'
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT;
                }
            });
            if (nodeIterator) {
                while ((nekst_node = nodeIterator.nextNode())) {
                    dikt_pair_list.push({ tekstNode: nekst_node, start: text.length });
                    text += nekst_node.nodeValue;
                }
                for (let i = 0; i < dikt_pair_list.length; ++i) {
                    curr_dikt_pair = dikt_pair_list[i];
                    let spanNode = document.createElement('span');
                    spanNode.className = 'ztred';
                    spanNode.dataset.oldtekst = curr_node_text;
                    curr_dikt_pair.tekstNode.parentNode.replaceChild(spanNode, curr_dikt_pair.tekstNode);
                    spanNode.appendChild(curr_dikt_pair.tekstNode);
                }
                const ztred_span_list = doc.getElementsByClassName('ztred');
                for (let i = 0; i < ztred_span_list.length; ++i) {
                    let nekst_ztred_span = ztred_span_list[i];
                    if (nekst_ztred_span.textContent) {
                        this.istr = nekst_ztred_span.textContent;
                        this.duztr();
                        nekst_ztred_span.textContent = this.ostrdict['inglish']; /// wery wery important
                    }
                }
            }
        }
    }
    untransliterate_dom_node() {
        let nodes = document.getElementsByClassName('ztred');
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node instanceof HTMLElement) {
                node.innerText = node.dataset.oldtekst;
            }
        }
    }
    xvjqK2hindi() {
        this.setistr(this.istr.replace(/q/, 'द').replace(/j/, 'त').replace(/Q/, 'ध').replace(/J/, 'थ').replace(/K/, 'ख')
            .replace(/Z/, 'झ').replace(/T/, 'ठ').replace(/D/, 'ढ').replace(/B/, 'भ').replace(/S/, 'श').replace(/x/, 'अ').replace(/v/, 'ह'));
        return this;
    }
    kh2hindiK() {
        this.setistr(this.istr.replace(/([kztdjqbs])h/g, '$1___')
            .replace(/q___/, 'ध')
            .replace(/j___/, 'थ')
            .replace(/k___/, 'ख')
            .replace(/z___/, 'झ')
            .replace(/t___/, 'ठ')
            .replace(/d___/, 'ढ')
            .replace(/b___/, 'भ')
            .replace(/s___/, 'श'));
        return this;
    }
    u2i_pre() {
        if (this.istr) {
            this.istr = this.istr.toLowerCase();
            this.istr = this.istr.replace(/([\s\b])क्ष/g, '$1sh').replace(/^क्ष/g, 'sh').replace(/ज्ञ/g, 'gy');
        }
    }
    u2i() {
        this.u2i_pre();
        if (this.istr) {
            const inputLength = this.istr.length;
            //console.log(` start of u2i , this.istr=${this.istr} and inputLength is ${inputLength}`);
            this.ostrdict['inglish'] = '';
            let indeks = 0;
            let curr_char = '';
            let nekst_char = ''; //| undefined= '';
            let curr_char_code = 0;
            let curr_lang_code = 0;
            let curr_char_modulo = 0;
            while (indeks < inputLength) {
                if (indeks === 0) {
                    curr_char = this.istr[indeks];
                }
                else {
                    curr_char = nekst_char;
                }
                curr_char_code = curr_char.charCodeAt(0);
                curr_lang_code = (curr_char_code / 0x80) >> 0;
                curr_char_modulo = curr_char_code % 0x80;
                nekst_char = this.istr[indeks + 1];
                if (curr_lang_code > 0x11 && curr_lang_code < 0x1b) {
                    this.ostrdict['inglish'] +=
                        this.u2idict.all_phoniks_list[curr_char_modulo];
                }
                else if (curr_lang_code === 0x1b) {
                    this.ostrdict['inglish'] +=
                        this.usinhl2idict.all_phoniks_list[curr_char_modulo];
                }
                else {
                    this.ostrdict['inglish'] += curr_char;
                }
                indeks++;
            }
            this.u2i_post(); //console.log(`this.ostrdict[inglish]=${this.ostrdict.inglish}\n`);
            this.istr = this.ostrdict.inglish; //console.log(` end of i2l , this.ostrdict[inglish]=this.istr=${this.istr}\n`);
        }
    }
    u2i_post() {
        // wowel_chr at boundary/in_between //nई ई कई=kAi कaई=kai कuई कoई कhई=khAi uई eई oई iई  αई Aई  aई Nई
        this.ostrdict['inglish'] = this.ostrdict['inglish']
            .replace(/\bA([IUEO])/g, '$1')
            .replace(/([^bcdfghjklmnpqrstvwyzBCDGHJKQSTZ])A([IUEO])/g, '$1$2')
            .replace(/([IUEO])/g, function (v) { return v.toLowerCase(); });
        this.ostrdict['inglish'] = this.ostrdict['inglish']
            .replace(/([a-zBCDGHJKQSTZ])Aa/g, '$1a')
            .replace(/([\W_])A/g, '$1a')
            .replace(/([^kgcztdjqpbsKGCZTDJQPBSf])H/g, '$1h')
            //.replace(/([iueo])A([aIUEO])/g, '$1$2')
            .replace(/wN\b/g, 'wm')
            .replace(/([Aaiueo])N\b/g, '$1')
            .replace(/N([w])/g, '$1')
            .replace(/(^r)N$/g, '$1')
            .replace(/N([),\'\s\.!\?naeiuhwv\b])/g, '$1')
            .replace(/N([bBpf])/g, 'm$1')
            .replace(/N([^kgKG])/g, 'n$1')
            .replace(/N/g, 'n');
    }
}
hsciistr.from_dikt = {
    ascii: 'ascii',
    indikunicode: 'indikunicode',
    ascii_and_indik: 'ascii_and_indik'
};
hsciistr.tu_dikt = {
    all: 'all', inglish: 'inglish', korean: 'korean', russian: 'russian', hindi: 'hindi', bangla: 'bangla', gurmukhi: 'gurmukhi',
    guzrati: 'guzrati', oriya: 'oriya', tamil: 'tamil', kannada: 'kannada', telugu: 'telugu', malayalam: 'malayalam', sinhala: 'sinhala'
};
