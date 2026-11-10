<script lang="ts">
	import { onMount } from 'svelte';

	type Consent = 'accepted' | 'rejected';
	type AnalyticsWindow = Window & {
		dataLayer?: unknown[][];
		gtag?: (...args: unknown[]) => void;
	};

	const STORAGE_KEY = '2077-cookie-consent';
	const GOOGLE_ANALYTICS_ID = 'G-LLGJWF9DHW';

	let consent = $state<Consent | null>(null);
	let settingsOpen = $state(false);
	let analyticsLoaded = false;

	function loadAnalytics() {
		if (analyticsLoaded) return;
		analyticsLoaded = true;

		const analyticsWindow = window as AnalyticsWindow;
		analyticsWindow.dataLayer ??= [];
		analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
		analyticsWindow.gtag('js', new Date());
		analyticsWindow.gtag('config', GOOGLE_ANALYTICS_ID, { anonymize_ip: true });

		const script = document.createElement('script');
		script.id = 'google-analytics';
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
		document.head.appendChild(script);

		void import('@vercel/analytics/sveltekit').then(({ injectAnalytics }) => injectAnalytics());
	}

	function saveConsent(value: Consent) {
		const analyticsWasLoaded = analyticsLoaded;
		localStorage.setItem(STORAGE_KEY, value);
		consent = value;
		settingsOpen = false;

		if (value === 'accepted') {
			loadAnalytics();
		} else if (analyticsWasLoaded) {
			// Reloading unloads analytics scripts and prevents further events after consent is withdrawn.
			window.location.reload();
		}
	}

	onMount(() => {
		const storedConsent = localStorage.getItem(STORAGE_KEY);
		consent = storedConsent === 'accepted' || storedConsent === 'rejected' ? storedConsent : null;
		if (consent === 'accepted') loadAnalytics();

		const openSettings = () => (settingsOpen = true);
		window.addEventListener('2077:open-cookie-settings', openSettings);
		return () => window.removeEventListener('2077:open-cookie-settings', openSettings);
	});
</script>

{#if consent === null || settingsOpen}
	<section
		class="fixed inset-x-4 bottom-4 z-[999999999] mx-auto max-w-3xl rounded-xl border border-neutral-700 bg-[#111113] p-5 shadow-2xl md:flex md:items-end md:justify-between md:gap-8"
		aria-labelledby="cookie-consent-title"
		aria-live="polite"
	>
		<div>
			<h2 id="cookie-consent-title" class="font-ibm text-lg font-semibold">Your privacy choices</h2>
			<p class="mt-2 max-w-xl text-sm leading-6 text-neutral-20">
				We use necessary browser storage to operate the site. With your permission, we also use
				Google Analytics and Vercel Analytics to understand site usage. Read our
				<a class="underline underline-offset-4" href="/privacy-notice">privacy notice</a>.
			</p>
		</div>
		<div class="mt-5 flex shrink-0 flex-wrap gap-3 md:mt-0">
			<button
				type="button"
				class="rounded-md border border-neutral-40 px-4 py-2 text-sm hover:bg-neutral-80 focus:outline-none focus:ring-2 focus:ring-white"
				onclick={() => saveConsent('rejected')}>Reject analytics</button
			>
			<button
				type="button"
				class="rounded-md bg-neutral-05 px-4 py-2 text-sm text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
				onclick={() => saveConsent('accepted')}>Accept analytics</button
			>
		</div>
	</section>
{/if}
