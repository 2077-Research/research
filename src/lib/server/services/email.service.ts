import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import type { Review } from './gpt.service';
import type { InsertArticle, InsertAuthor } from '../schema';

export async function sendReviewEmail(
	article: InsertArticle,
	author: InsertAuthor,
	review: Review
) {
	if (!env.RESEND_API_KEY || !env.REVIEW_RECIPIENT_EMAILS) {
		throw new Error('Article review email is temporarily unavailable');
	}

	const resend = new Resend(env.RESEND_API_KEY);
	return resend.emails.send({
		from: '2077 Research <community@2077.xyz>',
		// TODO: Change this to 2077 Research email
		to: env.REVIEW_RECIPIENT_EMAILS.split(','),
		subject: `Review of ${article.articleTitle} from ${author.name}`,
		html: buildEmailBody(article, author, review)
	});
}

// TODO: add is repost and original link if it is
function buildEmailBody(article: InsertArticle, author: InsertAuthor, review: Review): string {
	return `
    <h1>Review - ${article.articleTitle}</h1>

	<h2>Author</h2>
	<p>Name: ${author.name}</p>
	<p>Email: ${author.email}</p>
	<p>Twitter: ${author.x || '-'}</p>
	<p>Telegram: ${author.telegram || '-'}</p>
	<p>Discord: ${author.discord || '-'}</p>

	<br />

	<h2>Article</h2>
	<p>Title: ${article.articleTitle}</p>
	<p>Description: ${article.articleDescription}</p>
	<p>Link: ${article.linkToArticle}</p>
	<p>Additional Notes: ${article.additionalNotes}</p>

	<br />

	<h2>Review</h2>
    ${review.review
			.map(
				({ change, original, suggestion }) =>
					`<h2>${change}</h2>
					<p><strong>Original:</strong> ${original}</p>
					<p><strong>Suggestion:</strong> ${suggestion}</p>
					<hr />
					<br />
					`
			)
			.join('')}
    `;
}
