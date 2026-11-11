import { getGhostArticleBySlug } from '$lib/services/article.service';
import { fetchGhostArticles } from '$lib/services/ghost.service';
import type { PageServerLoad } from './$types';

const FEATURED_ARTICLE_SLUG = 'block-stm_vs_sealevel';

export const load: PageServerLoad = async () => {
	const [articles, featuredArticle] = await Promise.all([
		fetchGhostArticles(undefined, 1, 1000),
		getGhostArticleBySlug(FEATURED_ARTICLE_SLUG)
	]);
	const orderedArticles = featuredArticle
		? [featuredArticle, ...articles.filter((article) => article.slug !== featuredArticle.slug)]
		: articles;
	return {
		articles: orderedArticles
	};
};
