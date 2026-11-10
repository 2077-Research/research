import { describe, expect, it } from 'vitest';
import { escapeHtml, serializeJsonLd } from './html';

describe('HTML output helpers', () => {
	it('escapes text used in generated HTML attributes and elements', () => {
		expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
			'&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'
		);
	});

	it('prevents JSON-LD values from closing their script element', () => {
		expect(serializeJsonLd({ title: '</script><script>alert(1)</script>' })).not.toContain(
			'</script>'
		);
	});
});
