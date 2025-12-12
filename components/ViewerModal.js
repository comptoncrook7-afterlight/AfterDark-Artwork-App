import { useEffect } from 'react';

export default function ViewerModal({ image, onClose }) {
useEffect(() => {
function onKey(e){ if (e.key === 'Escape') onClose(); }
window.addEventListener('keydown', onKey);
return () => window.removeEventListener('keydown', onKey);
}, [onClose]);

if (!image) return null;

return (
<div style={{
position:'fixed', inset:0, background:'rgba(0,0,0,0.7)',
display:'flex', justifyContent:'center', alignItems:'center',
zIndex:2000
}} onClick={onClose}>
<div style={{maxWidth:'90%', maxHeight:'90%'}} onClick={(e)=>e.stopPropagation()}>
<img src={image.url} alt={image.title} style={{width:'100%', height:'auto', borderRadius:8}} />
<div style={{color:'#fff', marginTop:8}}>{image.description}</div>
<button style={{marginTop:10, padding:'8px 12px'}} onClick={onClose}>Close</button>
</div>
</div>
);
}
