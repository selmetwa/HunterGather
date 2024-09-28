import { supabaseClient } from "$lib/supabase";

// export const getScreenshot = async (url: string) => {
//   const { data, error: err } = await supabaseClient.storage
//     .from('screenshots')
//     .download(url.split('/')[5]);

//   let reader = new FileReader();

//   reader.readAsDataURL(data);
//   reader.onload = (e) => {
//     return e.target?.result;
//   };
// };

export const getScreenshot = async (url: string): Promise<string | undefined> => {

  const id = url.length === 40 ? url : url.split('/')[5];

  const { data, error: err } = await supabaseClient.storage
    .from('screenshots')
    .download(id);

  if (err) {
    console.error('Error downloading screenshot:', err);
    return undefined;
  }

  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.readAsDataURL(data);
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
};