import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load .env automatically
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

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary credentials in .env');
  process.exit(1);
}

const videoPath = path.resolve('raw/gym_tour/gym_tour.mp4');
if (!fs.existsSync(videoPath)) {
  console.error('Video file not found at:', videoPath);
  process.exit(1);
}

const publicId = 'peakform/gym-tour';
const timestamp = Math.round(Date.now() / 1000);
const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

const fileBuffer = fs.readFileSync(videoPath);
const formData = new FormData();
formData.append('file', new Blob([fileBuffer], { type: 'video/mp4' }));
formData.append('public_id', publicId);
formData.append('api_key', apiKey);
formData.append('timestamp', timestamp.toString());
formData.append('signature', signature);

console.log(`Uploading ${videoPath} (${(fileBuffer.length / (1024*1024)).toFixed(2)} MB) to Cloudinary video endpoint...`);

try {
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();
  if (json.secure_url) {
    console.log('✓ Video uploaded successfully!');
    console.log('Direct URL:', json.secure_url);
    console.log('Optimized Streaming URL:', `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/v1/${publicId}.mp4`);
    console.log('Poster image URL:', `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_auto,q_auto/v1/${publicId}.jpg`);
  } else {
    console.error('✗ Upload failed:', json.error?.message || json);
  }
} catch (err) {
  console.error('Error during upload:', err);
}
