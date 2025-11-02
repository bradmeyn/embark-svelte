import { form, query } from '$app/server';
import { z } from 'zod';
import { getCurrentUser } from '$lib/remotes/auth.remote';
import { db } from '$db';
import { dayTable } from '$db/schemas/itinerary';
import { error } from '@sveltejs/kit';
import { daySchema, daysArraySchema } from '$lib/schemas/itinerary';

export const addDay = form(daySchema, async ({ location, itineraryId, dayNumber }) => {
	const user = await getCurrentUser();
	if (!user) error(401, 'Unauthorized');

	await db
		.insert(dayTable)
		.values({
			dayNumber,
			location,

			itineraryId
		})
		.returning();

	return { success: true };
});

export const getDays = query(z.string(), async () => {
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}
	const days = await db.select().from(dayTable);

	return days;
});

export const addDays = form(daysArraySchema, async ({ days }) => {
	console.log('Adding days:', days);
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}

	const inserted = await db
		.insert(dayTable)
		.values(
			days.map(({ dayNumber, location, itineraryId }) => ({
				dayNumber,
				location,
				itineraryId,
				userId: user.id
			}))
		)
		.returning();
	return inserted;
});
