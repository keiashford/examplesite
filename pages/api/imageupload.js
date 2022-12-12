import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { decode } from 'base64-arraybuffer';
// Code above is unchanged
//...
const fileName = nanoid();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  // Upload image to Supabase
  if (req.method === 'POST') {
    // TODO
    let { image } = req.body;
console.log("is there an image?");
    if (!image) {
      console.log("no image");
        return res.send({ message: 'No image provided' });
    }

    try{
    //  console.log("trying image upload");
    const contentType = image.match(/data:(.*);base64/)?.[1];
    const base64FileData = image.split('base64,')?.[1];
    //console.log("is it valid image");
    if (!contentType || !base64FileData) {
    return res.send({ message: 'Image data not valid' });
    }
    //console.log("image is valid");
    const ext = contentType.split('/')[1];
    const path = `${fileName}.${ext}`;
    const { data, error: uploadError } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(path, decode(base64FileData), {
      contentType,
      upsert: true,
    });
   // console.log("supabase data returned"+JSON.stringify(data));
    if (uploadError) {
        throw new Error('Unable to upload image to storage');
        }  
    // Construct public URL
      const url = `${process.env.SUPABASE_URL.replace(
        '.co',
        '.co'
      )}/storage/v1/object/public/keefssite/${data.path}`;
 
      return res.status(200).json({ url });
    }
    catch(e){
      console.log("there was an eror uploading");
      console.log(e.message);
      console.log(e.name);
        res.send(e.message);
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}