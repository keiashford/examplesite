import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import { decode } from 'base64-arraybuffer';

const ImageUpload = ({
  label = 'Image',
  initialImage = null,
  objectFit = 'cover',
  accept = '.png, .jpg, .jpeg, .gif',
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture = () => null,
}) => {
  const pictureRef = useRef();

  const [image, setImage] = useState(initialImage);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState(null);

  const handleOnChangePicture = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const fileName = file?.name?.split('.')?.[0] ?? 'New file';

    reader.addEventListener(
      'load',
      async function () {
        try {
          setImage({ src: reader.result, alt: fileName });
          if (typeof onChangePicture === 'function') {
            await onChangePicture(reader.result);
          }
        } catch (err) {
          toast.error('Unable to update image');
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError('');
        reader.readAsDataURL(file);
      } else {
        setPictureError('File size is exceeding 10MB.');
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="verticalflex">
      <label >{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
          >
        {image.src  &&
          <img
            src={image.src}
            alt={image?.alt ?? ''}
            
            
            className='uploadedImage'
          />
         
        }

        <div >
          {!image?.src ? (
            <div >
            
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture ? 'Uploading...' : 'Upload'}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type="file"
            accept={accept}
            onChange={handleOnChangePicture}
            className="hidden"
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-red-600 text-sm">{pictureError}</span>
      ) : null}
    </div>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  objectFit: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default ImageUpload;