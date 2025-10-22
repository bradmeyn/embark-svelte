import { z } from 'zod';

export const daySchema = z.object({
	dayNumber: z.number().min(1, 'Day number must be at least 1'),
	overview: z.string().optional(),
	location: z.string().min(1, 'Location is required'),
	country: z.string().min(1, 'Country is required'),
	itineraryId: z.string()
});

export const daysArraySchema = z.object({
	days: z.array(daySchema)
});
