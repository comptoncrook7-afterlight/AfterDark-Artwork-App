
import { supabaseAdmin } from '../../../utils/supabaseServer'
import { checkAdmin } from '../../../utils/adminAuth'
export default async function handler(req,res){
  const a = checkAdmin(req); if (!a.ok) return res.status(401).json({ error: a.error })
  const { data } = await supabaseAdmin.from('images').select('id,title,preview_url,prompt_meta,created_at').order('created_at',{ascending:false})
  res.json(data||[])
}
