import { hsciistr } from "../src/hsciistr_file";

describe("e52_tu_e23 (English -> reduced 23-letter e23)", () => {
  const run = (s: string) => {
    const h = new hsciistr();
    h.set_input(s);
    h.E52_to_e23();
    return h.input;
  };

  test("lowercases input", () => {
    expect(run("HELLO violet")).toBe("hello wiolet");
  });

  test("the 6 hardcoded word substitutions (values reflect the x-rules now running BEFORE these substitutions -- lover/never/vary's replacement text contains x/v chars that used to get converted by the later x-rules, but now skip that step entirely since it already ran)", () => {
    expect(run("lover")).toBe("lwxr");
    expect(run("never")).toBe("nxwxr");
    expect(run("vest")).toBe("weist");
    expect(run("vine")).toBe("wayin");
    expect(run("vary")).toBe("wxyri");
    expect(run("vet")).toBe("wyt");
  });

  test("generic letter substitution: v->w, j->z, q->k", () => {
    expect(run("java")).toBe("zawa");
    expect(run("quiz")).toBe("kuiz");
    // "have" has no other special-cased substring, so only v->w applies
    expect(run("have")).toBe("hawe");
  });

  test("mid-word x after [a-wyz] becomes ks (documented: six -> siks)", () => {
    expect(run("six")).toBe("siks");
    expect(run("box")).toBe("boks");
  });

  test("word-initial x variants", () => {
    expect(run("x exxon")).toBe("eks ekson"); // \bxi -> zi
    expect(run("xit xylophone")).toBe("zit zailophone"); // \bxi -> zi
    expect(run("xylophone")).toBe("zailophone"); // \bxy -> zai
    expect(run("xmas")).toBe("eksmas"); // \bxmas -> christmAs
	expect(run("xray")).toBe("eksray");
	expect(run("xander")).toBe("zander");
	expect(run("oxygen")).toBe("oksigen");
	expect(run("xiao xena")).toBe("ziao zena");
	expect(run("xena xena")).toBe("zena zena");
	expect(run("xkcd")).toBe("ekskkd"); // updated: the 'c' in xkcd is now caught by the new /c/->k catch-all
	expect(run("x xkcd x")).toBe("eks ekskkd eks");
	expect(run("excel")).toBe("eksel");
	expect(run("exceed")).toBe("ekseed");
	expect(run("excellent")).toBe("eksellent");
	expect(run("excite")).toBe("eksaite");
	expect(run("excuse")).toBe("ekskyuse");
  });

  test("testiNg regeksp: /([^lhr])ough$/g", () => {
    expect(run("cough")).toBe("kf");
    expect(run("dough")).toBe("df");
    expect(run("enough")).toBe("enf");
    expect(run("sourdough")).toBe("sourdf");
  });
  
  test("testiNg dge xnd ge", () => {
    expect(run("badge")).toBe("baze");
  });
  
  test("no-op on empty input", () => {
    const h = new hsciistr();
    h.set_input("");
    h.E52_to_e23();
    expect(h.input).toBe("");
  });

  test("c section: cco -> ko, cce -> kse, cci -> ksi", () => {
    expect(run("stucco")).toBe("stuko"); // cco -> ko
    expect(run("accent")).toBe("aksent"); // cce -> kse
    expect(run("accident")).toBe("aksident"); // cci -> ksi
  });

  test("c section: chair -> cair, teach -> teac, coach -> koac (leading hard c -> k via the catch-all, ch digraph protected as before)", () => {
    expect(run("chair")).toBe("cair");
    expect(run("teach")).toBe("teac");
    expect(run("coach")).toBe("koac");
  });

  test("c section: ck -> k", () => {
    expect(run("back")).toBe("bak");
    expect(run("clock")).toBe("klok");
  });

  test("c section: ce -> s (must run after cce, which also contains the substring 'ce')", () => {
    expect(run("race")).toBe("rase");
    expect(run("cent")).toBe("sent");
    expect(run("dance")).toBe("danse");
  });

  test("c section: c[yi] -> si (must run after cci, which also contains the substring 'ci')", () => {
    expect(run("city")).toBe("sity");
  });

  test("c section: catch-all /c/ -> k for any hard c not caught by a more specific rule above", () => {
    expect(run("cat")).toBe("kat");
    expect(run("cup")).toBe("kup");
    expect(run("act")).toBe("akt");
  });

  test("child/children: same 'chi' letters, different vowel sound -- no letter-pattern rule can distinguish them locally, so 'child' is a hardcoded whole-word exception while 'children' falls out correctly from the general ch rule alone", () => {
    expect(run("child")).toBe("caild");
    expect(run("children")).toBe("cildren");
  });
});
