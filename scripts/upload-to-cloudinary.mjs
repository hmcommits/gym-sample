/**
 * Cloudinary Batch Asset Uploader for Peakform Fitness Club
 * 
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs
 * 
 * Reads credentials from process.env or .env:
 *   CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load .env automatically if present
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  }
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.argv[2];
const apiKey = process.env.CLOUDINARY_API_KEY || process.argv[3];
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.argv[4];

if (!cloudName || !apiKey || !apiSecret) {
  console.log('---------------------------------------------------------');
  console.log('Peakform Cloudinary Uploader');
  console.log('---------------------------------------------------------');
  console.log('Missing credentials! Please provide them via:');
  console.log('  1) Environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)');
  console.log('  2) Or run: node scripts/upload-to-cloudinary.mjs <cloud_name> <api_key> <api_secret>');
  console.log('---------------------------------------------------------');
  process.exit(1);
}

const assetsDir = path.resolve('public/assets');
const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.webp'));

console.log(`Found ${files.length} WebP assets to upload to Cloudinary [${cloudName}/peakform]...`);

async function uploadFile(file) {
  const filePath = path.join(assetsDir, file);
  const publicId = `peakform/${path.parse(file).name}`;
  const timestamp = Math.round(Date.now() / 1000);
  
  // Cloudinary signature calculation: sorted params (folder/public_id, timestamp)
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

  const formData = new FormData();
  formData.append('file', new Blob([fs.readFileSync(filePath)]));
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();
  if (json.secure_url) {
    console.log(`✓ Uploaded ${file} -> ${json.secure_url}`);
    return { file, url: json.secure_url };
  } else {
    console.error(`✗ Error uploading ${file}:`, json.error?.message || json);
    return null;
  }
}

async function run() {
  const results = [];
  for (const file of files) {
    const res = await uploadFile(file);
    if (res) results.push(res);
  }
  
  console.log('\n--- UPLOAD SUMMARY ---');
  console.log(`Successfully uploaded ${results.length}/${files.length} images.`);
  console.log('Now set PUBLIC_CLOUDINARY_CLOUD_NAME=' + cloudName + ' in your .env to stream directly from Cloudinary CDN!');
}

run();
