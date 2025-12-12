
import { supabaseAdmin } from '../../utils/supabaseServer'
export default async function handler(req,res){
  try{
    const { data } = await supabaseAdmin.from('images').select('id,title,preview_url,prompt_meta').order('created_at',{ascending:false})
    return res.json(data || [])
  }catch(e){
    console.error(e); return res.json([])
  }
}
