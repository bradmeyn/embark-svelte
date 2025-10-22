<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Field from '$lib/components/ui/field';
	import { addItinerary } from '$lib/remotes/itinerary.remote';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	let { tripId }: { tripId: string } = $props();

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Create Itinerary</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create a New Itinerary</Dialog.Title>
			<Dialog.Description>Please provide a name for your itinerary.</Dialog.Description>
		</Dialog.Header>

		<form
			{...addItinerary.enhance(async ({ form, submit }) => {
				try {
					await submit();
					form.reset();

					if (addItinerary.result?.success) {
						isOpen = false;
					}
				} catch (error) {
					console.error('Error creating itinerary:', error);
				}
			})}
		>
			<Field.Field>
				<Field.Label for="name">Trip Name</Field.Label>
				<Input
					id="name"
					{...addItinerary.fields.name.as('text')}
					autocomplete="off"
					placeholder="Japan 2025"
					disabled={addItinerary.pending > 1}
				/>
				<Field.Error />
				{#each addItinerary.fields.name.issues() as issue}
					<Field.Error>{issue.message}</Field.Error>
				{/each}
			</Field.Field>

			<input type="hidden" name="tripId" value={tripId} />

			<div class="mt-4 flex justify-end">
				<Dialog.Footer>
					<Button type="submit" disabled={addItinerary.pending > 1}>
						{#if addItinerary.pending}
							<LoadingSpinner />
						{:else}
							Create Itinerary
						{/if}
					</Button>
					<Button type="button" variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
				</Dialog.Footer>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
