
import { supabaseClient } from '../utils/supabaseClient'
import { useState } from 'react'
export default function Login(){
  const [email,setEmail]=useState(''); const [msg,setMsg]=useState('')
  async function submit(e){ e.preventDefault(); const { error } = await supabaseClient.auth.signInWithOtp({ email }); if (error) setMsg(error.message); else setMsg('Check your email for a login link.') }
  return (<div className="container"><h1>Login</h1><form onSubmit={submit}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /><button className="button" type="submit">Send magic link</button></form><div style={{marginTop:12}}>{msg}</div></div>)
}
