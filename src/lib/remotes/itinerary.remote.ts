import { command, query } from '$app/server';
import { z } from 'zod';
import { getCurrentUser } from '$lib/remotes/auth.remote';
import { db } from '$db';
import { itineraryTable, dayTable } from '$db/schemas/itinerary';
import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

const itinerarySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required')
});

export const getItineraries = query(async () => {
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}

	const itineraries = await db.select().from(itineraryTable);

	return itineraries;
});

export const getItinerary = query(z.string(), async (id: string) => {
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}

	const [itinerary] = await db
		.select()
		.from(itineraryTable)
		.where(and(eq(itineraryTable.id, id)))
		.limit(1);

	// fetch days for this itinerary
	const days = await db
		.select()
		.from(dayTable)
		.where(eq(dayTable.itineraryId, id))
		.orderBy(dayTable.dayNumber);

	// attach days to the itinerary object for convenience
	return { ...itinerary, days };
});

export const addItinerary = command(itinerarySchema, async () => {
	const user = await getCurrentUser();
	if (!user) error(401, 'Unauthorized');
	return { success: true };
});
