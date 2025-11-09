import { form, query } from '$app/server';
import { z } from 'zod';
import { getCurrentUser } from '$lib/remotes/auth.remote';
import { db } from '$db';
import { dayTable } from '$db/schemas/itinerary';
import { error } from '@sveltejs/kit';
import { daySchema, daysArraySchema } from '$lib/schemas/itinerary';
import { eq } from 'drizzle-orm';

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
	await getDays(days[0].itineraryId);
	return inserted;
});

export const deleteDay = form(
	z.object({ dayId: z.string() }),
	async ({ dayId }: { dayId: string }) => {
		const user = await getCurrentUser();
		if (!user) {
			error(401, 'Unauthorized');
		}

		const day = await db.delete(dayTable).where(eq(dayTable.id, dayId)).returning();

		return { success: true, day };
	}
);
