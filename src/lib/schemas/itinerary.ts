import { z } from 'zod';

export const daySchema = z.object({
	dayNumber: z.number().int().min(1, 'Day number must be at least 1'),
	overview: z.string().optional(),
	location: z.string().min(1, 'Location is required'),
	itineraryId: z.string()
});

export const daysArraySchema = z.object({
	days: z.array(daySchema)
});
// .superRefine((obj, ctx) => {
// 	const nums = obj.days.map((d) => d.dayNumber);
// 	// check duplicates
// 	const dupes = nums.filter((n, i) => nums.indexOf(n) !== i);
// 	if (dupes.length) {
// 		ctx.addIssue({
// 			code: 'custom',
// 			message: `Duplicate day numbers: ${[...new Set(dupes)].join(', ')}`
// 		});
// 	}
// 	// check contiguous starting at 1
// 	const sortedUnique = [...new Set(nums)].sort((a, b) => a - b);
// 	for (let i = 0; i < sortedUnique.length; i++) {
// 		const expected = i + 1;
// 		if (sortedUnique[i] !== expected) {
// 			ctx.addIssue({
// 				code: 'custom',
// 				message: `Day numbers must start at 1 and be contiguous; missing ${expected}`
// 			});
// 			break;
// 		}
// 	}
// });
