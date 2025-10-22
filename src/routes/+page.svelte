<script lang="ts">
	import Header from '$lib/components/header.svelte';

	import ArrowRight from '@lucide/svelte/icons/arrow-right';
</script>

<div class="container mx-auto">
	<div class="mx-auto my-16 max-w-3xl">
		<h1 class="mb-4 text-center font-serif text-8xl font-light text-orange-700">Where to next?</h1>
		<p class="text-center font-serif text-lg font-light">
			Embark on a journey of a lifetime with our AI-powered travel planner.
		</p>

		<div>
			<div class="mt-8 flex items-center justify-center gap-4">
				<a
					href="/chat"
					class="flex items-center gap-2 rounded-full bg-orange-700 px-4 py-2 text-lg font-semibold text-white transition duration-200 hover:bg-emerald-700"
				>
					<span>Agent</span>
					<ArrowRight class="ml-2 h-4 w-4" />
				</a>
				<a
					href="/itineraries"
					class="flex items-center gap-2 rounded-full bg-orange-700 px-4 py-2 text-lg font-semibold text-white transition duration-200 hover:bg-emerald-700"
				>
					<span>Plan Now</span>
					<ArrowRight class="ml-2 h-4 w-4" />
				</a>
			</div>
		</div>
	</div>
</div>
