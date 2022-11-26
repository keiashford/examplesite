import axios from 'axios';
import ImageUpload from '../components/imageupload';
import { toast } from 'react-hot-toast';
const Create = () => {
    
    const initialValues = null;

        async function upload(image) {
        if (!image)
            return;

        let toastId;
        try {
            setDisabled(true);
            toastId = toast.loading('Uploading...');
            const { data } = await axios.post('/api/image-upload', { image });
            setImageUrl(data?.url);
            toast.success('Successfully uploaded', { id: toastId });
        } catch (e) {
            toast.error('Unable to upload', { id: toastId });
            setImageUrl('');
        } finally {
            setDisabled(false);
        }
    }

    
  function addHome() 
  {

    const data={
        image:"",
        title:"trev",
        description:"desc",
        price:23,
        guests:2,
        beds:2,
        baths:2,
        };
        
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
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">
          Fill out the form below to list a new home.
        </p>
        <div className="mt-8">
        
        <button
            type="submit"
            onClick={addHome}
          >
            add home
            </button>
            <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />

        
        </div>
      </div>
    </div>
  );
};

export default Create;