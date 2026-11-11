<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { ArticleMetadata } from '$lib/types/article';
	import FeaturedCard from './FeaturedCard.svelte';

	export let articles: ArticleMetadata[];

	// let readingTime = $state('');

	// function calculateReadingTime(data) {
	// 	if (!data || !data.article || !data.article.content) return '';

	// 	const wordsPerMinute = 200;
	// 	const textContent = data.article.content.replace(/<[^>]*>/g, '');
	// 	const wordCount = textContent.split(/\s+/).length;
	// 	const minutes = Math.ceil(wordCount / wordsPerMinute);

	// 	return `${minutes} min read`;
	// }
</script>

<h2 class="text-2xl md:text-[32px] font-powerGroteskBold mb-4 md:mb-8">Featured</h2>

<Carousel.Root class="w-full relative" opts={{ loop: true }}>
	<Carousel.Content>
		{#each articles as article}
			<Carousel.Item>
				<FeaturedCard {article} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>

	<div
		class="flex items-center gap-[18px] md:-top-[64px] absolute md:right-12 text-neutral-60 max-md:left-1/2 max-md:-translate-x-1/2 max-md:mt-8"
	>
		<Carousel.Previous
			class="bg-transparent border-none [&_svg]:size-6 md:[&_svg]:size-8 !text-neutral-40 hover:!text-neutral-60 hover:bg-transparent relative left-0 translate-y-0"
		/>

		<Carousel.Next
			class="bg-transparent border-none [&_svg]:size-6 md:[&_svg]:size-8 !text-neutral-40 hover:!text-neutral-60 hover:bg-transparent relative left-0 translate-y-0"
		/>
	</div>
</Carousel.Root>
