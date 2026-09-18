export async function translate_e52_x(input: string, target: string): Promise<string> {
  if (!input) return "";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(input)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0]?.map((item: any) => item[0]).join("") || input;
}
