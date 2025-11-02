<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import type { Day } from '$lib/server/db/schemas/itinerary';
	let { day }: { day: Day } = $props();
</script>

<Accordion.Item value={`day-${day.id}`}>
	<Accordion.Trigger>Day {day.dayNumber}: {day.location}</Accordion.Trigger>
	<Accordion.Content class="flex flex-col gap-4 text-balance">
		{#if day.overview}
			<h2 class="text-2xl font-semibold">Overview: {day.overview}</h2>
		{/if}

		<!-- {#if day.activities && day.activities.length}
			<h3 class="mt-4 text-xl font-semibold">Activities:</h3>
			<ul class="list-inside list-disc">
				{#each day.activities as activity}
					<li class="mb-2">
						<strong
							>{activity.time ?? ''}{activity.duration ? ` (${activity.duration})` : ''} - {activity.title}</strong
						><br />
						{#if activity.description}{activity.description}<br />{/if}
						{#if activity.cost}<strong>Cost:</strong> {activity.cost}<br />{/if}
					</li>
				{/each}
			</ul>
		{/if} -->
	</Accordion.Content>
</Accordion.Item>
