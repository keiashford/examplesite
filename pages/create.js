import axios from 'axios';
import ImageUpload from '../components/imageupload';
import { toast } from 'react-hot-toast';
import {useState} from 'react';
import React from 'react';
import {setValues} from 'react';

const Create = () => {

  let img_path;

  function setImageUrl(path)
  {
    img_path=path;
  }

  function getImageUrl()
  {
    return img_path;
  }

const initialValues = null;
var rawImageData=null;
  
async function prepareUpload(image)
{
rawImageData=image;

}
        async function upload(image) {
          //console.log("uploadfunction"+JSON.stringify(image));
        if (!image)
        {
        console.log("no image!");
        
            return true;
          }
        let toastId;
        try {
          console.log(" upload function trying");
          //  setDisabled(true);
           // toastId = toast.loading('Uploading...');
            console.log("awaiting");
          //try{
            const { data } = await axios.post('/api/imageupload', { image });
          //}
         /* catch(e)
          {
            console.log(e);
          console.log(e.response.data);
          
          
          }*/
          console.log(" awaiting done");
          console.log("success uploading "+JSON.stringify(data));

          
          setImageUrl(data?.url);
          console.log("success uploading "+data.url);
          toast.success('Successfully uploaded', { id: toastId });
           return true;
        } catch (e) {
            toast.error('Unable to upload', { id: toastId });
            if (e.response.data.includes("Body exceeded"))
          {

            alert("image is bigger than 1mb please choose a smaller image");
          }
            //setImageUrl('');
        return false;
          } finally {
         
        }
    }

      const [inputs, setInputs] = useState({
      image:"",
    title:"your title",
    description:"desc",
    price:23,
    guests:2,
    beds:6,
    baths:12,

    }
    );    
    function changeBeds(e)
    {
  setInputs({ ...inputs, beds: parseInt(e.target.value)})
  }  
  function changeGuests(e)
  {
setInputs({ ...inputs, guests: parseInt(e.target.value)})
}  
function changeBaths(e)
{
setInputs({ ...inputs, baths: parseInt(e.target.value)})
}  
function changePrice(e)
{
setInputs({ ...inputs, price: parseInt(e.target.value)})
}  
function changeDesc(e)
    {
  setInputs({ ...inputs, description: e.target.value})
  }  
    
   
    function changeTitle(e)
    { 
      setInputs({ ...inputs, title: e.target.value})
    }

     async function addHome() 
  {
    var result=await upload(rawImageData);
    console.log("img path"+img_path);
    console.log("result "+result);
    inputs.image=img_path;
    if(result==true)
    {
    await axios.post('/api/homes', inputs);
    window.location.href = '/';
    console.log("pushed");
  }
    // code below is unchanged
            //...
  };
  
  
  const { image, ...initialFormValues } = initialValues ?? {
    image: '',
    title: '',
    description: '',
    price: 0,
    guests: 1,
    beds: 1,
    baths: 1,
  };

  return (
    <div>
      <div className="verticalflex">
        <h1>List your home</h1>
        <p>
          Fill out the form below to list a new home.
        </p>
        
        
  <div>Title:{inputs.title}</div>
  <input  name="title" type="text"  onChange={changeTitle}/>

    Beds:{inputs.beds}
    <input name="beds" type="text"  onChange={changeBeds} />
    Guests:{inputs.guests}
    <input name="guests" type="text"  onChange={changeGuests} />
    Baths:{inputs.baths}
    <input name="baths" type="text"  onChange={changeBaths} />
    Description:{inputs.description}
    <input name="description" type="text"  onChange={changeDesc} />
    Price:{inputs.price}
    <input name="price" type="text"  onChange={changePrice} />

  

        <button
          
            onClick={() => addHome()}
          >
            add home
            </button>
            
            <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
         onChangePicture={prepareUpload}
        />
       

        
        
      </div>
    </div>
  );
};

export default Create;