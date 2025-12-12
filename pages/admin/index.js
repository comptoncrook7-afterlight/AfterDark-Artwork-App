'use client';

import { useState } from 'react';

export default function AdminPage() {
const [message, setMessage] = useState('');

const handleUpload = async (event) => {
const file = event.target.files[0];
if (!file) return;

const formData = new FormData();
formData.append('file', file);

try {
const res = await fetch('/api/upload', {
method: 'POST',
body: formData,
});

const data = await res.json();

if (!res.ok) throw new Error(data.error || 'Upload failed');

setMessage('Upload successful! URL: ' + data.url);
} catch (err) {
console.error(err);
setMessage('Upload failed: ' + err.message);
}
};

return (
<div>
<h2>Upload Image</h2>
<input type="file" onChange={handleUpload} />
<p>{message}</p>
</div>
);
}