<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Field from '$lib/components/ui/field';
	import { addDays } from '$lib/remotes/day.remote';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	import { Plus, Trash } from '@lucide/svelte';
	import { getItinerary } from '$lib/remotes/itinerary.remote';
	import { daysArraySchema } from '$lib/schemas/itinerary';

	let {
		itineraryId
	}: {
		itineraryId: string;
	} = $props();

	let days = $state([0, 1, 2]);

	function addMore() {
		days = [...days, days.length];
	}

	function removeAt(index: number) {
		if (days.length <= 1) return;
		days = days.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6 rounded-xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
	<header class="space-y-2">
		<h2 class="font-serif text-3xl font-light text-orange-900">Get started</h2>
		<p class=" text-muted-foreground">Add days to your itinerary to begin planning your trip.</p>

		{#each addDays.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}
	</header>

	<form
		{...addDays.preflight(daysArraySchema).enhance(async ({ form, data, submit }) => {
			try {
				console.log('data:', data);
				addDays.validate({ includeUntouched: true });
				const issues = addDays.fields.allIssues();
				console.log('issues:', issues);
				await submit();
				form.reset();
				await getItinerary(itineraryId).refresh();
			} catch (error) {
				console.error(error);
			}
		})}
		class="space-y-3"
	>
		{#each days as _, i (i)}
			<div class="group rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
				<div class="flex items-start gap-3">
					<div
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 text-sm font-semibold text-primary"
					>
						Day {i + 1}
					</div>

					<Field.Field class="flex-1">
						<Field.Label for={`days-${i}-location`} class="text-xs font-medium text-gray-700">
							Location
						</Field.Label>
						<Input
							{...addDays.fields.days[i].location.as('text')}
							placeholder="e.g., Tokyo, Paris, New York"
							disabled={addDays.pending > 1}
							class="placeholder:text-gray-400"
						/>
						<Field.Error />
					</Field.Field>

					<Button
						size="icon-sm"
						onclick={() => removeAt(i)}
						disabled={addDays.pending > 1 || days.length <= 1}
						variant="ghost"
					>
						<Trash class="h-4 w-4" />
					</Button>
				</div>

				<!-- hidden fields -->
				<input {...addDays.fields.days[i].dayNumber.as('number')} class="hidden" value={i + 1} />
				<input type="hidden" name={`days[${i}].itineraryId`} value={itineraryId} />
			</div>
		{/each}

		<div class="flex items-center justify-between pt-2">
			<Button
				size="sm"
				onclick={addMore}
				disabled={addDays.pending > 1}
				variant="outline"
				class="gap-2 border-orange-200 text-primary hover:bg-orange-50"
			>
				<Plus class="h-4 w-4" />
				Add Another Day
			</Button>

			<Button type="submit" disabled={addDays.pending > 1}>
				{#if addDays.pending}
					<LoadingSpinner />
				{:else}
					Add Days
				{/if}
			</Button>
		</div>
	</form>
</div>
