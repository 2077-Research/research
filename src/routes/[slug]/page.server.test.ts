import { getGhostArticleBySlug } from '$lib/services/article.service.js';
import { describe, expect, it, vi } from 'vitest';
import { load } from './+page.server';

vi.mock('$lib/services/article.service.js', () => ({
	getGhostArticleBySlug: vi.fn()
}));

const getArticle = vi.mocked(getGhostArticleBySlug);

describe('article page loader', () => {
	it('preserves a not-found response for an unknown slug', async () => {
		getArticle.mockResolvedValueOnce(null);

		await expect(load({ params: { slug: 'missing' } } as never)).rejects.toMatchObject({
			status: 404
		});
	});

	it('returns a server error for an unexpected backend failure', async () => {
		getArticle.mockRejectedValueOnce(new Error('Ghost unavailable'));

		await expect(load({ params: { slug: 'example' } } as never)).rejects.toMatchObject({
			status: 500
		});
	});
});
