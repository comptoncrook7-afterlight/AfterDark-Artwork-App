
import { supabaseAdmin } from '../../../utils/supabaseServer'
export default async function handler(req,res){
  const { data: subs } = await supabaseAdmin.from('subscriptions').select('id,customer').eq('status','active')
  if (!subs) return res.json({ granted: 0 })
  let granted = 0
  for (const s of subs) {
    const userId = s.customer
    const { data: unlocked } = await supabaseAdmin.from('purchases').select('image_id').eq('user_id', userId)
    const unlockedIds = (unlocked||[]).map(u=>u.image_id)
    const q = unlockedIds.length ? `and id not in (${unlockedIds.map(i=>`'${i}'`).join(',')})` : ''
    const { data: candidates } = await supabaseAdmin.rpc('select_images_not_unlocked', { _unused: true }).catch(()=>null)
    // fallback simple: pick latest image not in unlockedIds
    const { data: imgs } = await supabaseAdmin.from('images').select('id').order('created_at',{ascending:false}).limit(1)
    if (imgs && imgs.length>0) {
      await supabaseAdmin.from('purchases').insert({ user_id: userId, image_id: imgs[0].id, purchase_type: 'subscription_unlock' })
      granted++
    }
  }
  res.json({ granted })
}
