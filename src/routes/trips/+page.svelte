<script lang="ts">
	import CreateTripDialog from './_components/add-trip-dialog.svelte';
	import { getTrips } from '../../lib/remotes/trip.remote';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-3xl">
	<h1 class="mb-4 font-serif text-4xl font-light">Your Trips</h1>

	<svelte:boundary>
		{#snippet pending()}
			<div class="space-y-4 py-6" role="status" aria-live="polite">
				<!-- list skeleton -->
				<ul class="mt-4 space-y-4">
					{#each Array(4) as _, i}
						<li class="group mb-4 rounded-lg border-2 p-6 shadow-sm">
							<div class="flex items-center justify-between gap-2">
								<div class="flex-1">
									<div
										class="mb-3 h-6 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
									></div>
									<div class="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
								</div>
								<div class="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/snippet}

		{#if (await getTrips()).length === 0}
			<div
				class="space-y-4 rounded-lg border border-orange-100 bg-orange-50 p-6 py-10 text-center shadow-sm"
			>
				<h2 class="font-serif text-3xl font-light text-primary">No Trips Yet</h2>
				<p class="text-muted-foreground">
					You haven't created any trips yet. Add your first trip to start planning.
				</p>
				<CreateTripDialog />
			</div>
		{:else}
			<ul>
				{#each await getTrips() as { id, name }}
					<li class="group mb-4 cursor-pointer rounded-lg border-2 shadow-sm hover:border-primary">
						<a
							href={`/trips/${id}`}
							class="text-light flex items-center justify-between gap-2 p-6 font-serif text-2xl text-muted-foreground"
						>
							<span>{name}</span>
							<ArrowRight
								class="transition-transform group-hover:translate-x-1 group-hover:text-primary"
							/>
						</a>
					</li>
				{/each}
			</ul>

			<CreateTripDialog />
		{/if}
	</svelte:boundary>
</div>
