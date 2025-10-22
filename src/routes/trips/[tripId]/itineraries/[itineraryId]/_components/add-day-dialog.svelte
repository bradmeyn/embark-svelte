<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Field from '$lib/components/ui/field';
	import { addDay } from '$lib/remotes/day.remote';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Add a Day</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add a Day to your trip</Dialog.Title>
			<Dialog.Description>Please provide details for the new day.</Dialog.Description>
		</Dialog.Header>

		<form {...addDay}>
			<Field.Field>
				<Field.Label for="name">City</Field.Label>
				<Input
					id="name"
					{...addDay.fields.location.as('text')}
					autocomplete="off"
					placeholder="Tokyo"
					disabled={addDay.pending > 1}
				/>
				<Field.Error />
			</Field.Field>

			<Field.Field>
				<Field.Label for="name">Country</Field.Label>
				<Input
					id="name"
					{...addDay.fields.country.as('text')}
					autocomplete="off"
					placeholder="Japan"
					disabled={addDay.pending > 1}
				/>
				<Field.Error />
			</Field.Field>

			<div class="mt-4 flex justify-end">
				<Dialog.Footer>
					<Button type="submit" disabled={addDay.pending > 1}>
						{#if addDay.pending}
							<LoadingSpinner />
						{:else}
							Create Day
						{/if}
					</Button>
					<Button type="button" variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
				</Dialog.Footer>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
