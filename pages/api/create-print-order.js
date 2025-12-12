
export default async function handler(req,res){
  const { imageId, variant, recipient } = req.body || {}
  if (!process.env.PRINTFUL_API_KEY) return res.status(200).json({ message: 'Printful API key not configured. Mock response.' })
  if (!imageId) return res.status(400).json({ error: 'missing imageId' })
  const payload = { recipient: recipient || { name: 'Customer', address1: '123 Main St', city: 'City', country_code: 'US' }, items: [{ variant_id: variant || parseInt(process.env.PRINTFUL_DEFAULT_VARIANT_ID||'1'), quantity:1, files: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/print-image/${imageId}` }] }] }
  const resp = await fetch('https://api.printful.com/orders', { method:'POST', headers: { Authorization: `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY+':').toString('base64')}`, 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
  const j = await resp.json()
  if (!resp.ok) return res.status(500).json({ error: j })
  res.json(j)
}
