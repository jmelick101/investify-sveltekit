ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_referred_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "withdrawals" DROP CONSTRAINT "withdrawals_wallet_id_wallets_id_fk";
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_referred_by_users_id_fk" FOREIGN KEY ("referred_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "investments_user_id_idx" ON "investments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "investments_status_idx" ON "investments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "notifications_user_id_read_idx" ON "notifications" USING btree ("user_id","read");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "withdrawals_user_id_idx" ON "withdrawals" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "withdrawals_status_idx" ON "withdrawals" USING btree ("status");