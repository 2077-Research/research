<script lang="ts">
	import HomeDoor from './icons/HomeDoor.svelte';
	import PeopleCircle from './icons/PeopleCircle.svelte';
	import ShareArrow from './icons/ShareArrow.svelte';
	import TextSize from './icons/TextSize.svelte';

	import { cn } from '$lib/utils/ui-components';
	import AudioListen from './AudioListen.svelte';
	import HeadPhones from './icons/HeadPhones.svelte';

	import ReadingCustomize from './ReadingCustomize.svelte';

	let {
		isLoggedIn,
		onNotSignedInListenClick,
		onNotSignedInReadCustomizeClick,
		onAccountClick,
		articleAudioUrl,
		shareOptions
	} = $props();

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

	{#if isLoggedIn}
		<AudioListen
			{articleAudioUrl}
			isLoading={false}
			hideLabel
			className={'[&_svg]:size-6'}
			align={'start'}
			side="left"
			sideOffset={2}
			alignOffset={-10}
		/>
	{:else}
		<button
			type="button"
			class="block hover:text-white transition"
			onclick={onNotSignedInListenClick}
			aria-label="Listen to this article"
			title="Listen to this article"
		>
			<HeadPhones />
		</button>
	{/if}

	{#if isLoggedIn}
		<div class="relative" onmouseleave={() => (isOpenCustomizeOpen = false)}>
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
	{:else}
		<button
			type="button"
			class="block hover:text-white transition"
			onclick={onNotSignedInReadCustomizeClick}
			aria-label="Customize text size, font, and theme"
			title="Customize text size, font, and theme"
		>
			<TextSize />
		</button>
	{/if}

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

	{#if !isLoggedIn}
		<a
			href="/signin"
			class="block hover:text-white transition"
			onclick={onAccountClick}
			aria-label="Sign in to save and personalize"
			title="Sign in to save and personalize"
		>
			<PeopleCircle />
		</a>
	{/if}
</div>
