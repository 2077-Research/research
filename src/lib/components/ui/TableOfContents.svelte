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
		<p class="text-[15px] font-mono text-neutral-60 uppercase mb-3">Table of contents</p>
		<nav>{@render tocItems(tableOfContents)}</nav>
	</aside>

	<details class="lg:hidden sticky top-[80px] z-[999999] mb-4 bg-secondary font-mono">
		<summary class="cursor-pointer p-3 text-sm uppercase text-neutral-20">
			Table of contents
		</summary>
		<nav class="max-h-[calc(100dvh-140px)] overflow-y-auto px-4 pb-4 uppercase">
			{@render tocItems(tableOfContents)}
		</nav>
	</details>
{/if}

<style>
	aside {
		scrollbar-width: thin;
		scrollbar-color: var(--neutral-80) transparent;
	}

	.toc-link {
		text-decoration: none;
		color: inherit;
	}

	.toc-link:target,
	.toc-link:focus-visible {
		color: var(--neutral-10);
	}
</style>
