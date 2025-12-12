
export function checkAdmin(req) {
  const secret = process.env.ADMIN_SECRET || ''
  const header = req.headers['x-admin-secret'] || req.headers['x-admin-token']
  if (!secret) return { ok: false, error: 'ADMIN_SECRET not configured' }
  if (!header) return { ok: false, error: 'Missing admin secret header' }
  if (Array.isArray(header) ? header[0] !== secret : header !== secret) return { ok: false, error: 'Invalid admin secret' }
  return { ok: true }
}
