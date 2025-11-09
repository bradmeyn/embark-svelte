<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { MoreVertical } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import DeleteDialog from './delete-dialog.svelte';
	import AddItineraryDialog from '../itinerary/add-itinerary-dialog.svelte';
	import EditTripDialog from './edit-trip-dialog.svelte';
	import type { TripWithItineraries } from '$db/schemas/itinerary';

	let { trip }: { trip: TripWithItineraries } = $props();

	const onclick = (e: Event) => e.preventDefault();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} class="mr-4" variant="ghost" size="sm"><MoreVertical /></Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Trip Menu</DropdownMenu.Label>

			<DropdownMenu.Item {onclick}><AddItineraryDialog tripId={trip.id} /></DropdownMenu.Item>
			<DropdownMenu.Item {onclick}><EditTripDialog {trip} /></DropdownMenu.Item>

			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<DeleteDialog label={'trip'} onDelete={() => {}} />
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
