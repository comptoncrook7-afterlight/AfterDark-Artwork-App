
Follow these steps exactly:

1. Create accounts: GitHub, Vercel, Supabase, Stripe, (optional) Printful.
2. Push this repo to GitHub.
3. Create Supabase project; run `supabase_schema.sql` in SQL Editor.
4. Create storage buckets: `full_images` (private), `previews` (public).
5. Set env variables from `.env.example` in `.env.local` and Vercel.
6. Install deps: `npm install`.
7. Run locally: `npm run dev`.
8. Admin: go to `/admin`, enter ADMIN_SECRET, upload images at `/admin/upload`.
9. Configure Stripe products/prices and webhook; set STRIPE_* env variables.
10. Deploy to Vercel and set environment variables in project settings.
11. Add Vercel cron for `/api/cron/daily-unlock` once per day.
