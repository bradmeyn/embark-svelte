ALTER TABLE "activity" DROP CONSTRAINT "activity_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "day" DROP CONSTRAINT "day_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "itinerary" DROP CONSTRAINT "itinerary_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "activity" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "day" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "itinerary" DROP COLUMN "user_id";