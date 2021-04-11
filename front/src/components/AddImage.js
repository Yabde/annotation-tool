import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
// import UploadService from '../services/FileUploadService';
import { useAuth } from '../auth/AuthContext';

import './AddImage.css';
import Message from './Message';
import Card from './Card';

function AddImage() {
  const [fileInputState, setfileInputState] = useState('');
  const [selectedFile, setselectedFile] = useState([]);
  const [imageArray, setimageArray] = useState([]);
  const [progressInfos, setprogressInfos] = useState({ val: [] });
  const [message, setmessage] = useState([]);
  const [fileInfos, setfileInfos] = useState([]);
  const progressInfosRef = useRef(null);
  const { user } = useAuth();

  const [previewImage, setpreviewImage] = useState('');

  console.log('USER : ', user);

  function fileInputChange(e) {
    console.log('input changed');
    if (e.target.files?.length === 0) return;
    const file = e.target.files[0];
    previewFile(file);
    setselectedFile(file);
    setfileInputState(e.target.value);
  }

  const previewFile = (file) => {
    console.log('set preview file');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewImage(reader.result);
    };
    reader.onerror = () => {
      console.error('ERROR !');
    };
  };

  function handleSubmitFile(e) {
    console.log('submit');
    e.preventDefault();
    if (!selectedFile) return;
    uploadImage(previewImage);
  }

  async function uploadImage(image) {
    console.log('upload');

    await axios
      .post(
        '/uploadImageIntoDb',
        JSON.stringify({ image: image, userId: user._id }),
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              'Upload Progress : ',
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            );
          },
        }
      )
      .then((res) => {
        console.log(res);
        setfileInputState('');
        setpreviewImage('');
      });
  }

  useEffect(() => {
    let isCurrent = true;

    console.log('RELOAD');
    axios.get('/getImageFromDb').then((res) => {
      if (isCurrent && res) {
        console.log('get images : ', res);
        setimageArray(res.data);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="addImage">
      {/* <Message message="test" /> */}
      <p>AddImage</p>
      <form onSubmit={handleSubmitFile}>
        <div className="input-file">
          <input
            multiple
            type="file"
            name="image_file"
            value={fileInputState}
            // onChange={fileSelectHandler}
            onChange={fileInputChange}
          />
          <button
            className="button-submit"
            type="submit"
            // onClick={fileUploadHandler}
            disabled={selectedFile?.length === 0}
          >
            Upload
          </button>
        </div>
      </form>

      <div className="image-tempo">
        {previewImage && <img src={previewImage} alt="selected" />}
      </div>

      <div className="image-container">
        {imageArray.map((imageInfo) => {
          console.log('URL : ', imageInfo)
          return (
            <Card
              key={imageInfo.id} 
              imageInfo={imageInfo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddImage;
