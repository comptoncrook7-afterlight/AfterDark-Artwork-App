
import { supabaseAdmin } from '../../utils/supabaseServer'
export default async function handler(req,res){
  const { userId } = req.query
  if (!userId) return res.json([])
  const { data: purchases } = await supabaseAdmin.from('purchases').select('image_id').eq('user_id', userId)
  const ids = (purchases||[]).map(p=>p.image_id)
  if (ids.length===0) return res.json([])
  const { data: images } = await supabaseAdmin.from('images').select('id,title,preview_url,full_path').in('id', ids)
  const out=[]
  for(const img of images){
    const { data: s } = await supabaseAdmin.storage.from('full_images').createSignedUrl(img.full_path, 120)
    out.push({ id: img.id, title: img.title, preview_url: img.preview_url, full_signed_url: s.signedUrl })
  }
  res.json(out)
}
