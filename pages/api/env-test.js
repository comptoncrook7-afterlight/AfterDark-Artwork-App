export default function handler(req, res) {
res.status(200).json({
NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || null,
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || null,
});
}