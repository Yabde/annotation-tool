import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

import { environment } from '../environment/environment';
import { FaRegTrashAlt, FaEye, FaEdit } from 'react-icons/fa';

import './ImageDetail.css';

type Props = {
  imageName: any;
};

export const ImageDetail: React.FC<Props> = ({ imageName }) => {
  const [url, seturl] = useState('');

  useEffect(() => {
    let isCurrent = true;
    axios
      .post('/getImageById', JSON.stringify({ imageId: imageName }))
      .then((res) => {
        if (isCurrent && res) {
          seturl(res.data.imageUrl);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  function onInputChange(e) {
    console.log('onInputChange');
    
  }

  return (
    <div className="content-wrapper">
      <div className="image-wrapper">
        <img
          className="image"
          src={environment.blobURL + '/' + url}
          alt="selected"
        />

        <button className="download-button">Download annotations</button>
      </div>

      <div className="annotations-wrapper">
        <div className="annotations-card">
          <div className="annotation-actions">
            <p className="annotation-title">Premier</p>
            <button className="watch-button">
              <FaEye />
            </button>
            <button className="edit-button">
              <FaEdit />
            </button>
            <button className="delete-button">
              <FaRegTrashAlt />
            </button>
          </div>

          <div className="annotation-coordinates">
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'100'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'400'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'100'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'300'}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="annotations-card">
          <div className="annotation-actions">
            <p className="annotation-title">Second</p>
            <button className="watch-button">
              <FaEye />
            </button>
            <button className="edit-button">
              <FaEdit />
            </button>
            <button className="delete-button">
              <FaRegTrashAlt />
            </button>
          </div>

          <div className="annotation-coordinates">
          <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'100'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'400'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'100'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_min"
              value={'300'}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageDetail;
