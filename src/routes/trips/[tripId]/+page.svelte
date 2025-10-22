<script lang="ts">
	import { getTrip } from '../../../lib/remotes/trip.remote';
	import { page } from '$app/state';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	const trip = $derived(await getTrip(page.params.tripId!));
</script>

<div class="container mx-auto">
	<svelte:boundary>
		<h1 class="mb-4 font-serif text-4xl font-light">{trip.name}</h1>

		{#snippet pending()}
			<LoadingSpinner />
		{/snippet}

		{#if !trip.itineraries || !trip.itineraries.length}
			<p>No itineraries found for this trip.</p>
		{:else}
			<ul>
				{#each trip.itineraries as i}
					<li class="mb-2">
						<a href={`/trips/${trip.id}/itineraries/${i.id}`} class="text-blue-600 hover:underline"
							>{i.name}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</svelte:boundary>
</div>
