import DOMPurify from 'isomorphic-dompurify';
import { parseFragment, serialize } from 'parse5';

type HtmlNode = {
	tagName?: string;
	value?: string;
	attrs?: Array<{ name: string; value: string }>;
	childNodes?: HtmlNode[];
};

type TableOfContentsItem = {
	id: string;
	title: string;
	children: TableOfContentsItem[];
};

export const SANITIZE_OPTIONS = {
	ALLOWED_TAGS: [
		'h1',
		'h2',
		'h3',
		'h4',
		'p',
		'a',
		'strong',
		'em',
		'ul',
		'ol',
		'li',
		'img',
		'pre',
		'code',
		'blockquote',
		'table',
		'tbody',
		'thead',
		'tr',
		'td',
		'th',
		'figure',
		'figcaption',
		'article',
		'div',
		'span',
		'br',
		'hr'
	],
	ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id', 'target', 'rel', 'width', 'height']
};

function textContent(node: HtmlNode): string {
	if (typeof node.value === 'string') return node.value;
	return (node.childNodes ?? []).map(textContent).join('');
}

function slugifyHeading(title: string): string {
	return title
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

export function sanitizeArticleHtml(html: string) {
	return String(DOMPurify.sanitize(html, SANITIZE_OPTIONS));
}

export function prepareArticleContent(html: string) {
	const fragment = parseFragment(sanitizeArticleHtml(html));
	const tableOfContents: TableOfContentsItem[] = [];
	const usedIds = new Set<string>();
	let currentHeading: TableOfContentsItem | null = null;
	let fallbackIndex = 0;

	function uniqueId(preferred: string) {
		const base = preferred || `section-${++fallbackIndex}`;
		let id = base;
		let suffix = 2;
		while (usedIds.has(id)) id = `${base}-${suffix++}`;
		usedIds.add(id);
		return id;
	}

	function visit(node: HtmlNode) {
		if (node.tagName === 'h1' || node.tagName === 'h2') {
			const title = textContent(node).replace(/#/g, '').trim();
			if (title) {
				node.attrs ??= [];
				const idAttribute = node.attrs.find((attribute) => attribute.name === 'id');
				const id = uniqueId(idAttribute?.value || slugifyHeading(title));
				if (idAttribute) idAttribute.value = id;
				else node.attrs.push({ name: 'id', value: id });

				const item = { id, title, children: [] };
				if (node.tagName === 'h2' && currentHeading) currentHeading.children.push(item);
				else {
					tableOfContents.push(item);
					currentHeading = node.tagName === 'h1' ? item : null;
				}
			}
		}

		for (const child of node.childNodes ?? []) visit(child);
	}

	visit(fragment as unknown as HtmlNode);
	return { content: serialize(fragment), tableOfContents };
}
