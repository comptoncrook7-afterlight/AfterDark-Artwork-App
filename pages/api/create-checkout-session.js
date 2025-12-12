
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function handler(req,res){
  const { imageId } = req.query
  if (!imageId) return res.status(400).json({error:'missing imageId'})
  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items:[{
      price_data:{
        currency:'usd',
        product_data:{ name: `Alien Art ${imageId}` },
        unit_amount: Math.round((process.env.ONE_TIME_PRICE || 2.99)*100)
      },
      quantity:1
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/unlock-success?imageId=${imageId}`,
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL
  })
  res.json({ url: session.url })
}
