import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = 'bkraz3f2';

export const client = createClient({
  projectId, // Ganti dengan projectId-mu
  dataset: 'production', // Ganti dengan dataset-mu, misalnya 'production'
  apiVersion: '2023-09-20', // Gunakan versi API yang terbaru sesuai tanggal
  useCdn: true, // Jika ingin menggunakan CDN untuk hasil lebih cepat (tetapi data mungkin cache)
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  if (!source || undefined) {
    return;
  }
  return builder.image(source);
};
