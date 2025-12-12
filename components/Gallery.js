import ImageCard from './ImageCard';

export default function Gallery({ images = [], onOpen }) {
return (
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
gap: 20,
padding: 20
}}>
{images.map(img => <ImageCard key={img.id} image={img} onOpen={onOpen} />)}
</div>
);
}