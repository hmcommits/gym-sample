import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const cloudName = 'me9hwxub';
const apiKey = '621155855568615';
const apiSecret = 'UVES4t1aX8ZUAeYO1nhQoIgsabU';

async function uploadFile(localPath, publicId) {
  const filePath = path.resolve(localPath);
  const timestamp = Math.round(Date.now() / 1000);
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
  console.log(`Uploaded ${publicId}:`, json.secure_url, `version: v${json.version}`);
  return json;
}

async function run() {
  const heroRes = await uploadFile('public/assets/hero.webp', 'peakform/hero');
  const heroMobRes = await uploadFile('public/assets/hero-mobile.webp', 'peakform/hero-mobile');
  console.log('Done!', { heroVersion: `v${heroRes.version}`, heroMobileVersion: `v${heroMobRes.version}` });
}

run();
