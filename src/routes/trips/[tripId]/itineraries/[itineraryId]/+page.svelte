<script lang="ts">
	import { getItinerary } from '$lib/remotes/itinerary.remote';
	import Button from '$lib/components/ui/button/button.svelte';
	import DayItinerary from '$lib/components/itinerary/day-itinerary.svelte';
	import GetStarted from '$lib/components/itinerary/get-started.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { daysArraySchema } from '$lib/schemas/itinerary';
	import AddDayDialog from '$lib/components/itinerary/add-day-dialog.svelte';

	let { params } = $props();

	const itinerary = $derived(await getItinerary(params.itineraryId));

	$inspect(itinerary);
</script>

<div class="container mx-auto max-w-3xl">
	<div class="mb-4">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/trips">Trips</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />

				<Breadcrumb.Item>
					<Breadcrumb.Page>{itinerary.name}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<div class="flex items-start justify-between">
		<h1 class="mb-4 font-serif text-4xl font-light">{itinerary.name}</h1>
		{#if itinerary.days.length > 1}
			<AddDayDialog itineraryId={itinerary.id} dayCount={itinerary.days.length} />
		{/if}
	</div>
	{#if itinerary.days.length === 0}
		<GetStarted itineraryId={itinerary.id} />
	{:else}
		<Accordion.Root type="single" class="w-full ">
			{#each itinerary.days as day}
				<DayItinerary {day} />
			{/each}
		</Accordion.Root>
	{/if}
</div>
