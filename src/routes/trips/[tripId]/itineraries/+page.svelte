<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { getItineraries, addItinerary } from '../../../../lib/remotes/itinerary.remote';

	let newItinary = {
		id: 4,
		name: 'Paris 2025',
		description: 'Our trip to paris 2025'
	};

	async function handleAdd() {
		await addItinerary(newItinary).updates(getItineraries());
	}
</script>

<div class="container mx-auto max-w-3xl py-16">
	<h1 class="font-serif text-3xl font-light">Your Itineraries</h1>

	<svelte:boundary>
		{#snippet pending()}
			<div>Loading...</div>
		{/snippet}

		{#if addItinerary.pending}
			<div>Loading after create...</div>
		{/if}

		{#if (await getItineraries()).length === 0}
			<h2>No Itineraries Yet</h2>
			<p>You haven't created any itineraries yet</p>
		{/if}

		<ul>
			{#each await getItineraries() as { name }}
				<li class="mb-4 rounded-lg border p-4 shadow-sm">
					<p class="text-muted-foreground">{name}</p>
				</li>
			{/each}
		</ul>

		<Button onclick={handleAdd}>Create Itinerary</Button>
	</svelte:boundary>
</div>
