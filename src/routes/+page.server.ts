import { fetchGhostArticles, fetchGhostArticlesFilters } from '$lib/services/ghost.service';

export async function load() {
	try {
		const posts = await fetchGhostArticles(undefined, 1, 15);

		const recentPosts = await fetchGhostArticlesFilters([
			'Layer 1',
			'Layer 2',
			'Interoperability',
			'DeFi',
			'Privacy',
			'DePIN'
		]);

		return { articles: posts, recentPosts, contentUnavailable: false };
	} catch (err) {
		console.error('Error loading articles:', err);
		return { articles: [], recentPosts: [], contentUnavailable: true };
	}
}
