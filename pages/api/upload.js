import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable-serverless';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
if (req.method !== 'POST')
return res.status(405).json({ error: 'Method not allowed' });

const form = new formidable.IncomingForm();

form.parse(req, async (err, fields, files) => {
if (err) return res.status(500).json({ error: err.message });

const file = files.file;
if (!file) return res.status(400).json({ error: 'No file uploaded' });

try {
// Read uploaded image
const fileData = fs.readFileSync(file.path);

// Correctly load watermark as buffer (Windows-safe)
const watermarkPath = path.join(process.cwd(), 'public', 'watermark.png');
const watermarkBuffer = fs.readFileSync(watermarkPath);

// Apply watermark
const watermarkedBuffer = await sharp(fileData)
.composite([
{
input: watermarkBuffer,
gravity: 'southeast',
blend: 'over',
opacity: 0.5,
},
])
.png()
.toBuffer();

// Upload watermarked file
const filePath = `${Date.now()}_${file.name}`;
const { error: storageError } = await supabase.storage
.from('images')
.upload(filePath, watermarkedBuffer, {
contentType: 'image/png',
});

if (storageError) throw storageError;

// Get public URL
const { data: urlData, error: urlError } = supabase.storage
.from('images')
.getPublicUrl(filePath);

if (urlError) throw urlError;

// Insert into DB
const { error: dbError } = await supabase.from('images').insert([
{
title: file.name,
url: urlData.publicUrl,
description: '',
},
]);

if (dbError) throw dbError;

return res.status(200).json({ url: urlData.publicUrl });
} catch (err) {
console.error(err);
return res.status(500).json({ error: err.message });
}
});
}