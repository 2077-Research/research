<script lang="ts">
	const purposes = [
		[
			'Deliver, secure, and troubleshoot the website',
			'Technical and security data',
			'Legitimate interests in operating a safe website'
		],
		[
			'Respond to messages and requests',
			'Information you provide',
			'Your request and our legitimate interests'
		],
		[
			'Provide site search',
			'Search terms and associated technical data',
			'Your request and our legitimate interests'
		],
		['Measure and improve readership', 'Analytics data', 'Your consent'],
		[
			'Meet legal obligations and protect legal rights',
			'Relevant records',
			'Legal obligation or legitimate interests'
		]
	];

	const services = [
		['Vercel', 'website hosting and consent-based web analytics'],
		['Google Analytics', 'consent-based audience measurement'],
		['Ghost', 'publication content management and delivery'],
		['Algolia', 'site search when the search service is configured'],
		['Cloudinary', 'delivery of certain images and media']
	];

	const storage = [
		[
			'2077-cookie-consent',
			'2077 Research',
			'Stores your analytics choice in local storage',
			'Until browser storage is cleared'
		],
		[
			'darkMode',
			'2077 Research',
			"Stores the site's display preference in local storage",
			'Until browser storage is cleared'
		],
		['_ga', 'Google Analytics', 'Distinguishes visitors for aggregated analytics', 'Up to 2 years'],
		['_ga_*', 'Google Analytics', 'Persists analytics session state', 'Up to 2 years']
	];
</script>

<article class="container flex max-w-screen-lg flex-col gap-10 pb-24 pt-32 md:pb-40">
	<header>
		<p class="font-mono text-sm uppercase text-neutral-40">Last updated 10 November 2026</p>
		<h1 class="mt-3 text-4xl font-bold md:text-5xl">Privacy and Cookie Notice</h1>
		<p class="mt-5 max-w-3xl leading-7 text-neutral-20">
			This notice explains how the operator of 2077 Research ("2077 Research", "we", "us") processes
			information when you use research.2077.xyz or contact us. The operator is the data controller
			for the processing described here. Privacy requests can be sent to
			<a class="underline underline-offset-4" href="mailto:admin@2077.xyz">admin@2077.xyz</a>.
		</p>
	</header>

	<section>
		<h2 class="text-2xl font-semibold">Information we process</h2>
		<ul class="mt-4 list-disc space-y-3 pl-6 leading-7 text-neutral-20">
			<li>
				<strong class="text-white">Information you provide:</strong> your email address, name, and anything
				else you include when contacting us.
			</li>
			<li>
				<strong class="text-white">Technical and security data:</strong> IP address, request time, URL,
				referrer, browser and device information, and server diagnostics processed by our infrastructure
				providers.
			</li>
			<li>
				<strong class="text-white">Search data:</strong> search terms sent to Algolia when site search
				is configured and you use it.
			</li>
			<li>
				<strong class="text-white">Analytics data:</strong> pages viewed, approximate location, referrer,
				device, browser, and interaction information, but only after you accept analytics.
			</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Why we process it</h2>
		<div class="mt-4 overflow-x-auto">
			<table class="w-full min-w-[680px] border-collapse text-left text-sm leading-6">
				<thead
					><tr class="border-b border-neutral-80 text-white"
						><th class="p-3">Purpose</th><th class="p-3">Information</th><th class="p-3"
							>Basis where applicable</th
						></tr
					></thead
				>
				<tbody class="text-neutral-20">
					{#each purposes as row}<tr class="border-b border-neutral-80"
							>{#each row as cell}<td class="p-3">{cell}</td>{/each}</tr
						>{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Services we use</h2>
		<p class="mt-4 leading-7 text-neutral-20">
			We disclose only the information needed for providers to perform services for us. Depending on
			the page and your choices, these providers may process information:
		</p>
		<ul class="mt-4 list-disc space-y-3 pl-6 leading-7 text-neutral-20">
			{#each services as service}<li>
					<strong class="text-white">{service[0]}</strong> — {service[1]}.
				</li>{/each}
		</ul>
		<p class="mt-4 leading-7 text-neutral-20">
			We may also disclose information when required by law, to protect rights or safety, or as part
			of a merger, acquisition, financing, or transfer of the service. We do not sell personal data.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Cookies and browser storage</h2>
		<p class="mt-4 leading-7 text-neutral-20">
			Necessary storage is used without analytics consent. Google Analytics and Vercel Analytics
			load only after you select “Accept analytics”. You can change that decision at any time using
			“Cookie settings” in the footer.
		</p>
		<div class="mt-4 overflow-x-auto">
			<table class="w-full min-w-[680px] border-collapse text-left text-sm leading-6">
				<thead
					><tr class="border-b border-neutral-80 text-white"
						><th class="p-3">Name</th><th class="p-3">Provider</th><th class="p-3">Purpose</th><th
							class="p-3">Duration</th
						></tr
					></thead
				>
				<tbody class="text-neutral-20">
					{#each storage as row}<tr class="border-b border-neutral-80"
							>{#each row as cell}<td class="p-3">{cell}</td>{/each}</tr
						>{/each}
				</tbody>
			</table>
		</div>
		<p class="mt-4 leading-7 text-neutral-20">
			Vercel Analytics does not use third-party cookies. It creates a request-derived visitor hash
			that Vercel says is discarded after 24 hours and provides us with aggregated reporting.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Retention and international processing</h2>
		<p class="mt-4 leading-7 text-neutral-20">
			We keep correspondence only as long as needed to respond, maintain appropriate records, and
			meet legal obligations. Infrastructure logs and aggregated analytics are retained according to
			our provider settings and are periodically deleted or aggregated. Some providers operate
			internationally. Where required, we rely on contractual and other lawful safeguards for
			transfers across borders.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Your choices and rights</h2>
		<p class="mt-4 leading-7 text-neutral-20">
			Depending on applicable law, you may ask to access, correct, delete, restrict, or receive a
			copy of your personal data, or object to certain processing. You may withdraw analytics
			consent at any time without affecting earlier lawful processing. Contact <a
				class="underline underline-offset-4"
				href="mailto:admin@2077.xyz">admin@2077.xyz</a
			> to exercise a right. We may need to verify your identity before responding.
		</p>
		<p class="mt-4 leading-7 text-neutral-20">
			You may also lodge a complaint with the <a
				class="underline underline-offset-4"
				href="https://ndpc.gov.ng/"
				rel="noreferrer">Nigeria Data Protection Commission</a
			> or the data-protection authority where you live or work.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-semibold">Security, children, and changes</h2>
		<p class="mt-4 leading-7 text-neutral-20">
			We use reasonable technical and organizational safeguards, but no online system is completely
			secure. This general-audience research site is not directed to children, and we do not
			knowingly request children's personal data. We may update this notice when our practices or
			legal obligations change. Material changes will be identified by the date at the top of this
			page.
		</p>
	</section>
</article>
