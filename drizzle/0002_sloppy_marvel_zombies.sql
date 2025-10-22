CREATE TABLE "trip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "itinerary" RENAME COLUMN "title" TO "name";--> statement-breakpoint
ALTER TABLE "itinerary" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "itinerary" ADD COLUMN "trip_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "trip" ADD CONSTRAINT "trip_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary" ADD CONSTRAINT "itinerary_trip_id_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "itinerary" DROP COLUMN "end_date";