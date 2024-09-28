import { photos } from '../constants/photos';
import { supabaseClient } from '$lib/supabase';
import fetch from 'node-fetch';

/**
 * Download photos from the photos array
 * post to supabase storage
 */

// Function to download and save a photo
const downloadPhoto = async (url: string, key: string) => {
	const response = await fetch(url);
	const buffer = await response.buffer();
	const { data, error } = await supabaseClient.storage.from('screenshots').upload(key, buffer, {
		contentType: 'image/png', // Specify the correct content type (adjust if needed)
		upsert: true // Overwrite if the file already exists
	});
};

const downloadAllPhotos = async () => {
  for (const photo of photos) {
    const url = photo.src;
    const key = photo.src.split('/')[5];
    await downloadPhoto(url, key);
  }
}

downloadAllPhotos()
  .then(() => console.log('All photos downloaded'))
  .catch((err) => console.error('Error downloading photos:', err));
