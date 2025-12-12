
import { supabaseAdmin } from '../../../utils/supabaseServer'
export default async function handler(req,res){
  const { id } = req.query
  const { data } = await supabaseAdmin.from('images').select('full_path').eq('id', id).single()
  if (!data) return res.status(404).end()
  const { data: signed } = await supabaseAdmin.storage.from('full_images').createSignedUrl(data.full_path, 600)
  res.redirect(signed.signedUrl)
}
