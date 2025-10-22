<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';

	import Input from '$lib/components/ui/input/input.svelte';
	import * as Field from '$lib/components/ui/field';
	import { addDays } from '$lib/remotes/day.remote';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import { page } from '$app/state';
	import { daysArraySchema } from '$lib/schemas/itinerary';
	import { Trash } from '@lucide/svelte';

	// start with 3 day input rows
	let days = $state([0, 1, 2]);

	function addMore() {
		days = [...days, days.length];
	}

	function removeAt(index: number) {
		if (days.length <= 1) return;
		days = days.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-4">
	<header>
		<h2 class="text-2xl font-semibold">Get started — add your first days</h2>
		<p class="text-muted-foreground">Provide 1 or more days to get your itinerary going.</p>
	</header>

	<form {...addDays.preflight(daysArraySchema)} class="space-y-4">
		{#each days as _, i (i)}
			<div class="rounded border p-3">
				<div class="grid grid-cols-1 items-end gap-3 sm:grid-cols-3">
					<Field.Field>
						<Field.Label for={`days-${i}-dayNumber`}>Day Number</Field.Label>
						<Input
							{...addDays.fields.days[i].dayNumber.as('number')}
							value={i + 1}
							placeholder="1"
							disabled={addDays.pending > 1}
						/>
						<Field.Error />
					</Field.Field>

					<Field.Field>
						<Field.Label for={`days-${i}-location`}>Location</Field.Label>
						<Input
							{...addDays.fields.days[i].location.as('text')}
							placeholder="Tokyo"
							disabled={addDays.pending > 1}
						/>
						<Field.Error />
					</Field.Field>

					<Field.Field>
						<Field.Label for={`days-${i}-country`}>Country</Field.Label>
						<Input
							id={`days-${i}-country`}
							name={`days[${i}].country`}
							autocomplete="off"
							placeholder="Japan"
							disabled={addDays.pending > 1}
						/>
						<Field.Error />
					</Field.Field>
				</div>

				<!-- hidden itineraryId per day -->
				<input type="hidden" name={`days[${i}].itineraryId`} value={page.params.itineraryId} />

				<div class="mt-2 flex justify-end">
					<Button size="icon-sm" onclick={() => removeAt(i)} disabled={addDays.pending > 1}>
						<Trash />
					</Button>
				</div>
			</div>
		{/each}

		<div class="flex items-center justify-between">
			<button
				type="button"
				class="text-sm underline"
				onclick={addMore}
				disabled={addDays.pending > 1}
			>
				Add another day
			</button>

			<div class="flex space-x-2">
				<Button type="submit" disabled={addDays.pending > 1}>
					{#if addDays.pending}
						<LoadingSpinner />
					{:else}
						Create Days
					{/if}
				</Button>
				<Button type="button" variant="outline" onclick={() => /* no-op inline cancel */ null}
					>Cancel</Button
				>
			</div>
		</div>
	</form>
</div>
