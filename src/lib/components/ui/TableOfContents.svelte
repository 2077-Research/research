<script lang="ts">
	type TableOfContentsItem = {
		id: string;
		title: string;
		children: TableOfContentsItem[];
	};

	const { tableOfContents } = $props<{ tableOfContents: TableOfContentsItem[] }>();
</script>

{#snippet tocItems(items: TableOfContentsItem[], nested = false)}
	<ul class={nested ? 'mt-1 ml-4 space-y-1' : 'space-y-1'}>
		{#each items as item}
			<li>
				<a
					href={`#${item.id}`}
					class="toc-link block py-1 text-sm font-mono font-medium hover:text-neutral-10 transition-colors"
				>
					{item.title}
				</a>

				{#if item.children.length > 0}
					{@render tocItems(item.children, true)}
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

{#if tableOfContents.length > 0}
	<aside
		class="hidden lg:block w-1/5 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto font-hubot uppercase pb-6"
		aria-label="Table of contents"
	>
		<details class="toc-panel" open>
			<summary>Table of contents</summary>
			<nav>{@render tocItems(tableOfContents)}</nav>
		</details>
	</aside>

	<details class="toc-panel lg:hidden sticky top-[80px] z-[999999] mb-4 bg-secondary font-mono">
		<summary>Table of contents</summary>
		<nav class="max-h-[calc(100dvh-140px)] overflow-y-auto uppercase">
			{@render tocItems(tableOfContents)}
		</nav>
	</details>
{/if}

<style>
	aside {
		scrollbar-width: thin;
		scrollbar-color: var(--neutral-80) transparent;
	}

	.toc-panel {
		@apply rounded-lg border border-white/10 bg-white/[0.025] p-3;
	}

	.toc-panel summary {
		@apply flex cursor-pointer list-none items-center justify-between font-mono text-sm text-neutral-40;
	}

	.toc-panel summary::-webkit-details-marker {
		display: none;
	}

	.toc-panel summary::after {
		content: '+';
		@apply text-lg font-normal text-neutral-20;
	}

	.toc-panel[open] summary::after {
		content: '−';
	}

	.toc-panel nav {
		@apply mt-3 border-l border-white/10 pl-3;
	}

	.toc-link {
		@apply rounded-r-md px-2 no-underline hover:bg-white/5;
		color: inherit;
	}

	.toc-link:target,
	.toc-link:focus-visible {
		color: var(--neutral-10);
	}
</style>
