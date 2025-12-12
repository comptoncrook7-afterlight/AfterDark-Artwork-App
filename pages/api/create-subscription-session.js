
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function handler(req,res){
  const session = await stripe.checkout.sessions.create({
    mode:'subscription',
    line_items:[{ price: process.env.STRIPE_MONTHLY_PRICE_ID, quantity:1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/unlock-success`,
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL
  })
  res.json({ url: session.url })
}
