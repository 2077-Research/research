<script lang="ts">
	import X from './X.svelte';
	import Discord from './Discord.svelte';
	import Farcaster from './Farcaster.svelte';

	type IconSize = '16px' | '20px' | '24px' | '32px';
	const { name, size = '24px' }: { name: string; size?: IconSize } = $props();
</script>

{#if name === 'x'}
	<X size="20px" />
{:else if name === 'discord'}
	<Discord {size} />
{:else if name === 'farcaster'}
	<Farcaster size="24px" />
{/if}
