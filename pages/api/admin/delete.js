
import { supabaseAdmin } from '../../../utils/supabaseServer'
import { checkAdmin } from '../../../utils/adminAuth'
export default async function handler(req,res){
  const a = checkAdmin(req); if (!a.ok) return res.status(401).json({ error: a.error })
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'missing id' })
  const { data } = await supabaseAdmin.from('images').select('full_path').eq('id', id).single()
  if (data && data.full_path) { await supabaseAdmin.storage.from('full_images').remove([data.full_path]).catch(()=>null); await supabaseAdmin.storage.from('previews').remove([`${id}/preview.jpg`]).catch(()=>null) }
  await supabaseAdmin.from('images').delete().eq('id', id)
  res.json({ ok: true })
}
