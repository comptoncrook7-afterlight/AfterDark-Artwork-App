export default function ImageCard({ image, onOpen }) {
return (
<div style={{borderRadius:8, overflow:'hidden', background:'#111', cursor:'pointer'}}>
<img src={image.url} alt={image.title} style={{width:'100%', height:180, objectFit:'cover'}} onClick={()=>onOpen(image)} />
<div style={{padding:8}}>
<div style={{fontWeight:600}}>{image.title || 'Untitled'}</div>
</div>
</div>
);
}
