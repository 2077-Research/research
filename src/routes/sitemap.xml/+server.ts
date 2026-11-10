import { fetchGhostArticles } from '$lib/services/ghost.service';
import type { RequestHandler } from '@sveltejs/kit';

interface SitemapArticle {
	slug: string;
	updated_at: string;
}

const staticPaths = ['/', '/reports', '/about', '/work-with-us', '/privacy-notice', '/authors'];

function escapeXml(value: string): string {
	return value.replace(/[<>&'"]/g, (character) => {
		return { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character]!;
	});
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const baseURL = import.meta.env.VITE_BASE_URL || url.origin;
		const articles = (await fetchGhostArticles(undefined, 1, 'all')) as SitemapArticle[];
		const staticUrls = staticPaths
			.map(
				(path) => `
		<url>
			<loc>${escapeXml(new URL(path, baseURL).href)}</loc>
			<changefreq>${path === '/' || path === '/reports' ? 'daily' : 'monthly'}</changefreq>
			<priority>${path === '/' ? '1.0' : '0.5'}</priority>
		</url>`
			)
			.join('');
		const articleUrls = articles
			.map((article) => {
				const lastModified = new Date(article.updated_at);
				const lastmod = Number.isNaN(lastModified.getTime())
					? ''
					: `\n\t\t\t<lastmod>${lastModified.toISOString()}</lastmod>`;
				return `
		<url>
			<loc>${escapeXml(new URL(encodeURIComponent(article.slug), `${baseURL}/`).href)}</loc>${lastmod}
			<changefreq>monthly</changefreq>
			<priority>0.8</priority>
		</url>`;
			})
			.join('');
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${articleUrls}
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600, s-maxage=3600'
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
};
