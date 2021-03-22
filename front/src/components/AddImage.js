import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import UploadService from '../services/FileUploadService';

import './AddImage.css';
import Message from './Message';

function AddImage() {
  const [fileInputState, setfileInputState] = useState('');
  const [selectedFile, setselectedFile] = useState([]);
  const [progressInfos, setprogressInfos] = useState({ val: [] });
  const [message, setmessage] = useState([]);
  const [fileInfos, setfileInfos] = useState([]);
  const progressInfosRef = useRef(null);

  const [previewImage, setpreviewImage] = useState('');

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
    console.log('image to uplaod : ', image);

    await axios
      .post('/uploadImageIntoDb', JSON.stringify({ image: image }), {
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress : ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%'
          );
        },
      })
      .then((res) => {
        console.log(res);
        setfileInputState('');
        setpreviewImage('');
      });
  }

  function fileSelectHandler(e) {
    console.log('file selected');
    setselectedFile(e.target.files[0]);
    // setselectedFile((selectedFile) => [...selectedFile, ...e.target.files]);
    // console.log('selectedFiles : ', selectedFile);

    // const fd = new FormData();
    // fd.append('image', e.target.files[0], e.target.files[0].name);
    // console.log('fd : ', fd);

    previewFile(e.target.files[0]);
  }

  function fileUploadHandler(e) {
    e.preventDefault();
    console.log('upload button');
    console.log('après bouton : ', selectedFile);
    console.log('NAME : ', selectedFile.name);

    axios
      .post('/uploadImageIntoDb', selectedFile, {
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress : ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%'
          );
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setpreviewImage(reader.result);
  //   };
  // };

  // useEffect(() => {
  //   const fd = new FormData();
  //   fd.append('image', selectedFile, selectedFile.name);

  //   axios
  //     .post('upload-image', fd, {
  //       onUploadProgress: (progressEvent) => {
  //         console.log(
  //           'Upload Progress : ',
  //           Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%'
  //         );
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, [selectedFile]);

  return (
    <div className="addImage">
      <Message message="test" />
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
      <div className="image-tempo">
        <img
          src={
            'https://imagetool.blob.core.windows.net/blob-container/0e94721f81957b52b97fe8ef9784189832ee712cd0a05e5ef9a50393ac59dde5.jpg?sv=2020-02-10&ss=b&srt=sco&sp=rwdlacx&se=2021-03-22T08:22:45Z&st=2021-03-22T00:22:45Z&spr=https&sig=L%2B5kSES2oG6tSWNBL%2Be1AW5JELHblu9tmRjCynvcAQw%3D'
          }
          alt="selected"
        />
      </div>
    </div>
  );
}

export default AddImage;
