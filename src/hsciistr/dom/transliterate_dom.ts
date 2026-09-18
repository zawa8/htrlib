import type { hsciistr } from '../../hsciistr_file';

export function transliterate_dom_node(owner: hsciistr, root: Node): void {
  const doc = root.ownerDocument;
  if (!doc) return;

  const iter = doc.createNodeIterator(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentNode?.nodeName.toLowerCase() === 'script'
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });

  const pairs: Node[] = [];
  let n: Node | null;
  while ((n = iter.nextNode())) pairs.push(n);

  for (const tekstNode of pairs) {
    const span = doc.createElement('span');
    span.className = 'ztred';
    span.dataset.oldtekst = tekstNode.nodeValue ?? '';
    tekstNode.parentNode?.replaceChild(span, tekstNode);
    span.appendChild(tekstNode);
  }

  for (const span of Array.from(doc.getElementsByClassName('ztred'))) {
    if (span.textContent) {
      owner.set_input(span.textContent).duztr();
      span.textContent = owner.output['xi38'];
    }
  }
}

export function untransliterate_dom_node(): void {
  const nodes = document.getElementsByClassName('ztred');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node instanceof HTMLElement) {
      node.innerText = node.dataset.oldtekst ?? '';
    }
  }
}
