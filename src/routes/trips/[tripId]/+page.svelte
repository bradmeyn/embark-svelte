<script lang="ts">
	import { getTrip } from '$lib/remotes/trip.remote';
	import { page } from '$app/state';

	const trip = $derived(await getTrip(page.params.tripId!));
	import AddItinerary from './_components/add-itinerary.svelte';
</script>

<div class="container mx-auto max-w-3xl py-16">
	<svelte:boundary>
		{#snippet pending()}
			<div role="status" class="animate-pulse space-y-6" aria-hidden="false">
				<span class="sr-only">Loading itineraries...</span>

				<!-- heading skeleton -->
				<div class="h-10 w-3/5 rounded bg-gray-200 dark:bg-gray-700"></div>

				<!-- list skeleton -->
				<ul class="space-y-4">
					{#each Array(3) as _, i}
						<li class="mb-4 rounded-lg border p-4 shadow-sm">
							<div class="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
							<div class="mt-2 h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
						</li>
					{/each}
				</ul>
			</div>
		{/snippet}
		<h1 class="font-serif text-3xl font-light">{trip.name} Itineraries</h1>

		{#if trip.itineraries.length === 0}
			<h2>No Itineraries Yet</h2>
			<p>You haven't created any itineraries yet</p>
		{/if}

		<ul>
			{#each trip.itineraries as itinerary}
				<li>
					<a
						href={`/trips/${trip.id}/itineraries/${itinerary.id}`}
						class="mb-4 block rounded-lg border p-4 text-muted-foreground shadow-sm hover:border-primary"
						><h2>{itinerary.name}</h2>
						<small>
							{itinerary.days.length} Days
						</small>
					</a>
				</li>
			{/each}
		</ul>
	</svelte:boundary>
	<AddItinerary tripId={page.params.tripId!} />
</div>
