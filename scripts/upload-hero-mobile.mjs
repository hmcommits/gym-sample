import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const cloudName = 'me9hwxub';
const apiKey = '621155855568615';
const apiSecret = 'UVES4t1aX8ZUAeYO1nhQoIgsabU';

async function upload() {
  const filePath = path.resolve('public/assets/hero-mobile.webp');
  const publicId = 'peakform/hero-mobile';
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
  console.log('Upload result:', json.secure_url || json);
}

upload();
