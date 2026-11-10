import { getGhostArticleBySlug } from '$lib/services/article.service';
import { escapeHtml } from '$lib/utils/html';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	const { slug } = params;

	// Fetch article
	const post = await getGhostArticleBySlug(slug || '');

	if (!post) {
		throw error(404, { message: 'Article not found' });
	}

	const url = new URL(request.url);
	const origin = url.origin;

	// Ensure absolute URLs for Twitter cards
	const sanitizedTitle = escapeHtml(post.title || 'Untitled Article');
	const sanitizedSummary = escapeHtml(post.summary || 'Read more on our website.');
	const sanitizedThumb = escapeHtml(
		post.thumb_url?.startsWith('http') ? post.thumb_url : `${origin}${post.thumb_url}`
	);
	const sanitizedUrl = escapeHtml(`${origin}/${post.slug}`);

	// Twitterbot/1.0

	// Requests negotiated to this endpoint receive lightweight metadata HTML.
	return new Response(
		`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${sanitizedTitle}</title>

        <meta property="og:type" content="article">
        <meta property="og:title" content="${sanitizedTitle}">
        <meta property="og:description" content="${sanitizedSummary}">
        <meta property="og:image" content="${sanitizedThumb}">
        <meta property="og:url" content="${sanitizedUrl}">
        <meta property="og:site_name" content="2077Research">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${sanitizedTitle}">
        <meta name="twitter:description" content="${sanitizedSummary}">
        <meta name="twitter:image" content="${sanitizedThumb}">
        <meta name="twitter:url" content="${sanitizedUrl}">
        <meta name="twitter:site" content="@2077Research">
      </head>
      <body>
        <h1>${sanitizedTitle}</h1>
        <p>${sanitizedSummary}</p>
        <img src="${sanitizedThumb}" alt="${sanitizedTitle}">
      </body>
      </html>
    `.trim(),
		{
			headers: { 'Content-Type': 'text/html; charset=utf-8' }
		}
	);
};
