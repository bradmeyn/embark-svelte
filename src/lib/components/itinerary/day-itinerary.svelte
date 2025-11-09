<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import type { Day } from '$lib/server/db/schemas/itinerary';
	import Button from '$lib/components/ui/button/button.svelte';

	import { deleteDay } from '$lib/remotes/day.remote';

	let { day }: { day: Day } = $props();
</script>

<Accordion.Item value={`day-${day.id}`}>
	<Accordion.Trigger>Day {day.dayNumber}: {day.location}</Accordion.Trigger>
	<Accordion.Content class="flex flex-col gap-4 text-balance">
		{#if day.overview}
			<h2 class="text-2xl font-semibold">Overview: {day.overview}</h2>
		{/if}

		<form {...deleteDay.for(day.id)} class="mt-4">
			<input type="hidden" name="dayId" value={day.id} />
			<Button variant="destructive" type="submit">Delete Day</Button>
		</form>
	</Accordion.Content>
</Accordion.Item>
