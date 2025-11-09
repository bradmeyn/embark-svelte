<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Field from '$lib/components/ui/field';
	import { addDay } from '$lib/remotes/day.remote';
	import Spinner from '../ui/spinner/spinner.svelte';

	import { addDays } from '$lib/remotes/day.remote';

	import { Plus, Trash } from '@lucide/svelte';

	let {
		itineraryId,
		dayCount
	}: {
		itineraryId: string;
		dayCount: number;
	} = $props();

	let days = $derived([dayCount + 1]);

	function addMore() {
		days = [...days, days.length + dayCount + 1];
	}

	function removeAt(index: number) {
		if (days.length <= 1) return;
		days = days.filter((_, i) => i !== index);
	}

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}
		>Add a Day</Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add more days to your trip</Dialog.Title>
			<Dialog.Description>Please provide details for the new day.</Dialog.Description>
		</Dialog.Header>

		{#each addDays.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<form {...addDays} class="space-y-3">
			{#each days as day, i (i)}
				<div class="group rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
					<div class="flex items-start gap-3">
						<div
							class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 text-sm font-semibold text-primary"
						>
							Day {day}
						</div>

						<Field.Field class="flex-1">
							<Field.Label for={`days-${i}-location`} class="text-xs font-medium text-gray-700">
								Location
							</Field.Label>
							<Input
								{...addDays.fields.days[i].location.as('text')}
								placeholder="e.g., Tokyo, Paris, New York"
								disabled={!!addDays.pending}
								class="placeholder:text-gray-400"
							/>
							<Field.Error />
						</Field.Field>

						<Button
							size="icon-sm"
							onclick={() => removeAt(i)}
							disabled={!!addDays.pending || days.length <= 1}
							variant="ghost"
						>
							<Trash class="h-4 w-4" />
						</Button>
					</div>

					<!-- hidden fields -->
					<input {...addDays.fields.days[i].dayNumber.as('number')} class="hidden" value={day} />
					<input type="hidden" name={`days[${i}].itineraryId`} value={itineraryId} />
				</div>
			{/each}

			<div class="flex items-center justify-between pt-2">
				<Button
					size="sm"
					onclick={addMore}
					disabled={!!addDays.pending}
					variant="outline"
					class="gap-2 border-orange-200 text-primary hover:bg-orange-50"
				>
					<Plus class="h-4 w-4" />
					Add Another Day
				</Button>
			</div>

			<div class="mt-4 flex justify-end">
				<Dialog.Footer>
					<Button type="submit" disabled={!!addDay.pending}>
						{#if addDay.pending}
							<Spinner class="size-4" />
						{:else}
							Add Days
						{/if}
					</Button>
					<Button type="button" variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
				</Dialog.Footer>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
