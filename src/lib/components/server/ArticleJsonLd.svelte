<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { serializeJsonLd } from '$lib/utils/html';

	const { article }: { article: Article } = $props();

	const jsonLd = () => ({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		image: article.thumb,
		datePublished: article.created_at,
		dateModified: article.updated_at,
		author: (article.authors || []).map((author) => ({
			'@type': 'Person',
			name: author.full_name,
			url: author.twitter_username ? `https://twitter.com/${author.twitter_username}` : undefined
		})),
		publisher: {
			'@type': 'Organization',
			name: '2077 Research',
			logo: {
				'@type': 'ImageObject',
				url: 'https://research.2077.xyz/favicon.svg'
			}
		},
		description: article.summary
	});

	const serializedJsonLd = $derived(serializeJsonLd(jsonLd()));
</script>

{@html `<script type="application/ld+json">${serializedJsonLd}</script>`}
