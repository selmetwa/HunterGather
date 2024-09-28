import { supabaseClient } from '$lib/supabase';
import { sha1 } from 'js-sha1';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';


export const saveScreenshot = async (url: string) => {
  const res = await fetch('https://screenshot-from-url.fly.dev/screenshot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const bufferObject = await res.json();
  const buffer = Buffer.from(bufferObject.screenshot.data); // Create a Buffer from your data
  const hasher = sha1.create();
  const uniqueValue = `${url}-${uuidv4()}`; // Append a UUID
  const id = hasher.update(uniqueValue).hex();

	const { data, error } = await supabaseClient.storage
		.from('screenshots')
		.upload(id, buffer, {
			contentType: 'image/png'
		});

	if (error) {
		console.error('Error uploading file:', error.message);
	} else {
		console.log('File uploaded successfully:', data);
	}

	return id;
};
