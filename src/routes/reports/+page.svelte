<script lang="ts">
	import BaseHead from '$lib/components/server/BaseHead.svelte';
	import ArticleList from '$lib/components/ui/ArticleList.svelte';
	import ScrollToTopButton from '$lib/components/ui/ScrollToTopButton.svelte';
	import { setArticles } from '$lib/stores/articles.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	// Get data from props
	const { data }: { data: PageData } = $props();
	const articles = $derived(data.articles);

	// Set articles in the store on mount
	onMount(() => {
		setArticles(data.articles);
	});
</script>

<BaseHead />

<div class="flex flex-col gap-10">
	<ArticleList {articles} articlesPerPage={100} />
	<!-- <Testimonials5 /> -->
</div>

<ScrollToTopButton />
