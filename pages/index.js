import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import ViewerModal from '../components/ViewerModal';
import Footer from '../components/Footer';

export default function Home() {
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(true);
const [openImage, setOpenImage] = useState(null);

useEffect(() => {
async function load() {
const { data, error } = await supabase
.from('images')
.select('id,title,url,description')
.order('id', { ascending: false })
.limit(100);

if (error) {
console.error(error);
setImages([]);
} else {
setImages(data || []);
}

setLoading(false);
}
load();
}, []);

return (
<div>
<Header />
<main style={{maxWidth:1100, margin:'24px auto', minHeight:'60vh'}}>
<h2 style={{marginLeft:20}}>Latest Artwork</h2>
{loading && <p style={{padding:20}}>Loading...</p>}
{!loading && images.length === 0 && <p style={{padding:20}}>No images yet.</p>}
{!loading && images.length > 0 && (
<Gallery images={images} onOpen={img => setOpenImage(img)} />
)}
</main>

{openImage && <ViewerModal image={openImage} onClose={() => setOpenImage(null)} />}

<Footer />
</div>
);
}
