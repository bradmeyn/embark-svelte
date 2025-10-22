DROP TABLE "destination" CASCADE;--> statement-breakpoint
ALTER TABLE "day" RENAME COLUMN "number" TO "day_number";--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "location" varchar(255);--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "cost" varchar(100);--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "date" timestamp;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "location" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "country" varchar(255) NOT NULL;