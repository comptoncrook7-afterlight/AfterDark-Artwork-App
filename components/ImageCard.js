export default function ImageCard({ image, onOpen }) {
// image: { id, title, url, description }
return (
<div style={{borderRadius:8, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>
<img src={image.url} alt={image.title || 'image'} style={{width:'100%', height:180, objectFit:'cover'}} onClick={()=>onOpen(image)} />
<div style={{padding:8}}>
<div style={{fontWeight:600}}>{image.title || 'Untitled'}</div>
</div>
</div>
);
}