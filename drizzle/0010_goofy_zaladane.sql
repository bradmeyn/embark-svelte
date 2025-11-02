ALTER TABLE "activity" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "location" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "cost" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "day" ALTER COLUMN "location" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "itinerary" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "day" DROP COLUMN "country";