<script lang="ts">
	import { getItinerary } from '$lib/remotes/itinerary.remote';
	import { page } from '$app/state';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import DayItinerary from './_components/day-itinerary.svelte';
	import GetStarted from './_components/get-started.svelte';

	const itinerary = $derived(await getItinerary(page.params.itineraryId!));
	import * as Accordion from '$lib/components/ui/accordion/index.js';
</script>

<div>
	<h1 class="sr-only">Itinerary Details</h1>
	<svelte:boundary>
		{#snippet pending()}
			<LoadingSpinner />
		{/snippet}
		<h1 class="mb-4 font-serif text-4xl font-light">{itinerary.name}</h1>

		{#if !(itinerary?.days && itinerary.days.length)}
			<GetStarted />
		{:else}
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-semibold">Days</h2>
				<Button>Add Destination</Button>
			</div>
			<Accordion.Root type="single" class="w-full sm:max-w-[70%]">
				{#each itinerary.days as day}
					<DayItinerary {day} />
				{/each}
			</Accordion.Root>
		{/if}
	</svelte:boundary>
</div>
