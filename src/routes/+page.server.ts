import { getGhostArticleBySlug } from '$lib/services/article.service';
import { fetchGhostArticles, fetchGhostArticlesFilters } from '$lib/services/ghost.service';

const FEATURED_ARTICLE_SLUG = 'block-stm_vs_sealevel';

export async function load() {
	try {
		const [posts, featuredArticle, recentPosts] = await Promise.all([
			fetchGhostArticles(undefined, 1, 15),
			getGhostArticleBySlug(FEATURED_ARTICLE_SLUG),
			fetchGhostArticlesFilters([
				'Layer 1',
				'Layer 2',
				'Interoperability',
				'DeFi',
				'Privacy',
				'DePIN'
			])
		]);

		return { articles: posts, featuredArticle, recentPosts, contentUnavailable: false };
	} catch (err) {
		console.error('Error loading articles:', err);
		return { articles: [], featuredArticle: null, recentPosts: [], contentUnavailable: true };
	}
}
