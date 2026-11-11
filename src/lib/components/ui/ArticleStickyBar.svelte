<script lang="ts">
	import HomeDoor from './icons/HomeDoor.svelte';
	import ShareArrow from './icons/ShareArrow.svelte';
	import TextSize from './icons/TextSize.svelte';

	import { cn } from '$lib/utils/ui-components';
	import type { Snippet } from 'svelte';
	import ReadingCustomize from './ReadingCustomize.svelte';

	let { shareOptions }: { shareOptions: Snippet } = $props();

	let isOpenCustomizeOpen = $state(false);
	let isShareOpen = $state(false);
</script>

<div
	class="w-12 p-3 rounded-2xl border border-[#333] bg-[#19191b] flex items-center flex-col gap-5 text-neutral-60"
>
	<a
		href="/"
		class="block hover:text-white transition"
		aria-label="Back to homepage"
		title="Back to homepage"
	>
		<HomeDoor />
	</a>

	<div class="relative" role="presentation" onmouseleave={() => (isOpenCustomizeOpen = false)}>
		<button
			type="button"
			class="block hover:text-white transition"
			onmouseover={() => {
				isOpenCustomizeOpen = true;
				isShareOpen = false;
			}}
			onfocus={() => {
				isOpenCustomizeOpen = true;
				isShareOpen = false;
			}}
			onclick={() => {
				isOpenCustomizeOpen = !isOpenCustomizeOpen;
				isShareOpen = false;
			}}
			aria-label="Customize text size, font, and theme"
			aria-expanded={isOpenCustomizeOpen}
			title="Customize text size, font, and theme"
		>
			<TextSize />
		</button>

		<div
			class={cn(
				'absolute top-full right-0 w-[400px] p-4 bg-[#19191A] shadow-lg rounded-[8px] border border-neutral-80 opacity-0 -z-[9999999] pointer-events-none transition',
				isOpenCustomizeOpen && 'z-[999999999] opacity-100 pointer-events-auto'
			)}
		>
			<ReadingCustomize
				open
				onClose={() => (isOpenCustomizeOpen = false)}
				className="relative p-0 w-full text-left"
				hideContainer
				hidex
			/>
		</div>
	</div>

	<div class="relative">
		<button
			type="button"
			class="block hover:text-white transition"
			aria-label="Share this article"
			aria-expanded={isShareOpen}
			onclick={() => (isShareOpen = !isShareOpen)}
		>
			<ShareArrow />
		</button>

		{#if isShareOpen}
			<div
				class="absolute right-full top-0 mr-4 w-40 bg-backgroundLighter shadow-lg font-mono text-neutral-20"
			>
				{@render shareOptions()}
			</div>
		{/if}
	</div>
</div>
