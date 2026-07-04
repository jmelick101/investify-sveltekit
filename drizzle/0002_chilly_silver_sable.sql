CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"action" varchar(100) NOT NULL,
	"resource_type" varchar(50) NOT NULL,
	"resource_id" varchar(255),
	"details" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"interest" varchar(100) DEFAULT 'General Inquiry' NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "category" varchar(100) DEFAULT 'Market Updates' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "read_time" varchar(50) DEFAULT '5 min read';--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "author_bio" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "author_image" varchar(500);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "related_article_ids" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;