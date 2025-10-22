<script lang="ts">
	import CreateTripDialog from './_components/add-trip-dialog.svelte';
	import { getTrips } from '../../lib/remotes/trip.remote';
</script>

<div class="container mx-auto max-w-3xl">
	<h1 class="mb-4 font-serif text-4xl font-light">Your Trips</h1>

	<svelte:boundary>
		{#snippet pending()}
			<div>Loading...</div>
		{/snippet}

		{#if (await getTrips()).length === 0}
			<div class="space-y-4 py-10 text-center">
				<h2 class="font-serif text-2xl font-light">No Trips Yet</h2>
				<p class="text-muted-foreground">
					You haven't created any trips yet. Add your first trip to start planning.
				</p>

				<CreateTripDialog />
			</div>
		{:else}
			<ul>
				{#each await getTrips() as { id, name }}
					<li class="mb-4 rounded-lg border p-4 shadow-sm">
						<a href={`/trips/${id}`} class="text-xl text-muted-foreground">{name}</a>
					</li>
				{/each}
			</ul>

			<CreateTripDialog />
		{/if}
	</svelte:boundary>
</div>
