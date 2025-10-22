ALTER TABLE "itineraries" RENAME TO "itinerary";--> statement-breakpoint
ALTER TABLE "itinerary" DROP CONSTRAINT "itineraries_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "itinerary" ADD CONSTRAINT "itinerary_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;