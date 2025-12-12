export default function handler(req, res) {
res.status(200).json({
NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
HAS_SUPABASE_SERVICE_KEY: !!process.env.SUPABASE see_SERVICE_KEY,
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
HAS_STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
});
}