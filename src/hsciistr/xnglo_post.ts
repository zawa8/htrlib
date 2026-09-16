export function xnglo_india_post(s: string): string {
  return s
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
    .replace(/N(?![kKgG])/g, "n")
    .replace(/([^kgcztdjqpbs])v/g, "$1h");
}
