import { describe, expect, it } from 'vitest';
import { prepareArticleContent } from './prepare-article-content';

describe('prepareArticleContent', () => {
	it('sanitizes HTML and generates stable, unique section links', () => {
		const result = prepareArticleContent(`
			<script>alert('nope')</script>
			<h1>Execution Engines</h1>
			<h2 id="benchmarks">Benchmarks</h2>
			<h2>Benchmarks</h2>
		`);

		expect(result.content).not.toContain('<script');
		expect(result.content).toContain('<h1 id="execution-engines">');
		expect(result.content).toContain('<h2 id="benchmarks">');
		expect(result.content).toContain('<h2 id="benchmarks-2">');
		expect(result.tableOfContents).toEqual([
			{
				id: 'execution-engines',
				title: 'Execution Engines',
				children: [
					{ id: 'benchmarks', title: 'Benchmarks', children: [] },
					{ id: 'benchmarks-2', title: 'Benchmarks', children: [] }
				]
			}
		]);
	});
});
