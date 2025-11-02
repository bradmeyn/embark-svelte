import { form, query } from '$app/server';
import { z } from 'zod';
import { getCurrentUser } from '$lib/remotes/auth.remote';
import { db } from '$db';
import { itineraryTable, tripTable } from '$db/schemas/itinerary';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

const tripSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

export const getTrips = query(async () => {
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}
	const trips = await db.select().from(tripTable).where(eq(tripTable.userId, user.id));
	return trips;
});

export const getTrip = query(z.string(), async (id: string) => {
	const user = await getCurrentUser();
	if (!user) {
		error(401, 'Unauthorized');
	}

	const trip = await db.query.tripTable.findFirst({
		where: eq(tripTable.id, id),
		with: {
			itineraries: {
				with: {
					days: {
						with: {
							activities: true
						}
					}
				}
			}
		}
	});
	console.log('trip', trip);

	if (!trip) {
		error(404, 'Trip not found');
	}

	// Check if user owns this trip
	if (trip.userId !== user.id) {
		error(403, 'Forbidden');
	}

	return trip;
});

export const addTrip = form(tripSchema, async ({ name }) => {
	const user = await getCurrentUser();
	if (!user) error(401, 'Unauthorized');

	const [newTrip] = await db
		.insert(tripTable)
		.values({
			name,
			userId: user.id
		})
		.returning();

	await db.insert(itineraryTable).values({
		name: `${name} 1`,
		tripId: newTrip.id
	});
	return { success: true };
});
