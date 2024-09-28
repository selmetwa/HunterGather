import { supabaseClient } from '$lib/supabase';
import { chromium } from 'playwright';
import fs from 'fs';
import { sha1 } from 'js-sha1';

export const saveScreenshot = async (url: string) => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.screenshot({ path: `static/screenshot.png` });
	await browser.close();

	const screenshot = fs.readFileSync(`static/screenshot.png`);

  const hasher = sha1.create();
  const id = hasher.update(url).hex();

	// Upload the screenshot to Supabase storage
	const { data, error } = await supabaseClient.storage
		.from('screenshots') // Replace with your bucket name
		.upload(id, screenshot, {
			contentType: 'image/png'
		});

	if (error) {
		console.error('Error uploading file:', error.message);
	} else {
		console.log('File uploaded successfully:', data);
	}

	return id;
};
