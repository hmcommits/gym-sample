import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const cloudName = 'me9hwxub';
const apiKey = '621155855568615';
const apiSecret = 'UVES4t1aX8ZUAeYO1nhQoIgsabU';

async function main() {
  const cropW = 706;
  const cropH = 941;
  const left = 797;

  const targetPath = path.resolve('public/assets/trainer-nikita.webp');
  
  // Crop Nikita centered at face and save as high-quality WebP
  await sharp('raw/trainers/trainer4.png')
    .extract({ left, top: 0, width: cropW, height: cropH })
    .webp({ quality: 90 })
    .toFile(targetPath);

  console.log('Saved local trainer-nikita.webp');

  const publicId = 'peakform/trainer-nikita';
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

  const formData = new FormData();
  formData.append('file', new Blob([fs.readFileSync(targetPath)]));
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();
  console.log('Upload result for trainer-nikita:', json.secure_url || json);
  return json.version;
}

main();
