
import { supabaseAdmin } from '../../../utils/supabaseServer'
export default async function handler(req,res){
  const { id } = req.query
  // NOTE: In production, verify user ownership/purchase. This example returns signed URL for any request for simplicity.
  const { data } = await supabaseAdmin.from('images').select('full_path').eq('id', id).single()
  if (!data) return res.status(404).json({ error: 'not found' })
  const { data: signed } = await supabaseAdmin.storage.from('full_images').createSignedUrl(data.full_path, 120)
  res.json({ url: signed.signedUrl })
}
