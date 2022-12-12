import axios from 'axios';
import ImageUpload from '../components/imageupload';
import { toast } from 'react-hot-toast';

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

        async function upload(image) {
          //console.log("uploadfunction"+JSON.stringify(image));
        if (!image)
        {
        console.log("no image!");
        
            return;
          }
        let toastId;
        try {
          console.log(" upload function trying");
          //  setDisabled(true);
           // toastId = toast.loading('Uploading...');
            console.log("awaiting");
          
            const { data } = await axios.post('/api/imageupload', { image });
            console.log(" awaiting done");
            console.log("success uploading "+JSON.stringify(data));

            
            setImageUrl(data?.url);
            console.log("success uploading "+data.url);
            toast.success('Successfully uploaded', { id: toastId });
        } catch (e) {
            toast.error('Unable to upload', { id: toastId });
            setImageUrl('');
        } finally {
            setDisabled(false);
        }
    }

    
  function addHome(img) 
  {

    const data={
        image:img_path,
        title:"trev",
        description:"desc",
        price:23,
        guests:2,
        beds:6,
        baths:2,
        };
        console.log("img"+img);
        console.log("initialValues"+JSON.stringify(data));
           axios.post('/api/homes', data);
              console.log("pushed");
            // code below is unchanged
            //...
           

  };
  console.log("hello");
  
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
        
        
        <button
            type="submit"
            onClick={() => addHome(image)}
          >
            add home
            </button>
            
            <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />

        
        
      </div>
    </div>
  );
};

export default Create;