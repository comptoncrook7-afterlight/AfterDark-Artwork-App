
import Stripe from 'stripe'
import { supabaseAdmin } from '../../utils/supabaseServer'
export const config = { api: { bodyParser: false } }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
async function buffer(req){ const chunks=[]; for await(const c of req) chunks.push(c); return Buffer.concat(chunks) }
export default async function handler(req,res){
  const sig = req.headers['stripe-signature']
  let event
  try{ event = stripe.webhooks.constructEvent(await buffer(req), sig, process.env.STRIPE_WEBHOOK_SECRET) }
  catch(e){ console.error(e); return res.status(400).send('webhook error') }
  try{
    if (event.type === 'checkout.session.completed'){
      const session = event.data.object
      const imageId = session.success_url && session.success_url.split('imageId=')[1]
      if (imageId){
        await supabaseAdmin.from('purchases').insert({
          user_id: session.customer || session.customer_email || 'unknown',
          image_id: imageId,
          purchase_type: 'one_time',
          stripe_payment_id: session.id
        })
      }
    } else if (event.type === 'customer.subscription.created' || event.type === 'invoice.payment_succeeded'){
      const sub = event.data.object
      await supabaseAdmin.from('subscriptions').upsert({
        id: sub.id,
        customer: sub.customer,
        status: sub.status,
        current_period_end: new Date((sub.current_period_end||sub.current_period_start)*1000).toISOString()
      })
    }
  }catch(e){ console.error(e) }
  res.json({received:true})
}
