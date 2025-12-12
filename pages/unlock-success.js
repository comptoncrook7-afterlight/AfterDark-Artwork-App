
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function UnlockSuccess(){
  const r = useRouter(); const { imageId } = r.query
  const [url,setUrl] = useState(null)
  useEffect(()=>{ if (!imageId) return; fetch(`/api/full-image/${imageId}`).then(r=>r.json()).then(j=>setUrl(j.url)) },[imageId])
  return (<div className="container"><h1>Purchase successful</h1><p>If the unlock is ready click below:</p>{url? <a className="button" href={url}>View full image</a> : <div className="small">Processing...</div>}</div>)
}
