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
  const [moveable, setMoveable] = useState(false);

  const fakeData = [
    { _id: 1, x_min: 210, y_min: 110, x_max: 250, y_max: 140 },
    { _id: 2, x_min: 50, y_min: 60, x_max: 100, y_max: 130 },
    { _id: 3, x_min: 200, y_min: 10, x_max: 280, y_max: 30 },
    { _id: 4, x_min: 500, y_min: 300, x_max: 650, y_max: 380 },
  ];

  const [boxes, setboxes] = useState(fakeData);

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

  const onInputChange = (e: any) => {
    console.log('onInputChange');
  };

  const handleMouseMove = (e: any) => {
    console.log('mouse move');

    if (!moveable) return;
    // if (fakeData.length > 1) {
    //   return;
    // }

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.x;
    const clickY = e.clientY - rect.y;
    // const newBox = { ...fakeData[0] };
    const newBox = { _id: boxes.length + 1, x_min: 0, y_min: 0, x_max: 0, y_max: 0 };

    if (
      Math.abs(clickX - newBox.x_min) >
      Math.abs(clickX - newBox.x_max)
    ) {
      newBox.x_max = clickX;
    } else {
      newBox.x_min = clickX;
    }

    if (
      Math.abs(clickY - newBox.y_min) >
      Math.abs(clickY - newBox.y_max)
    ) {
      newBox.y_max = clickY;
    } else {
      newBox.y_min = clickY;
    }

    // fakeData.push(newBox
    console.log('NEW BOXES ', newBox);
    setboxes([...fakeData, newBox])
    console.log('BOXES : ', boxes);
  };

  return (
    <div className="content-wrapper">
      <div className="image-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // className="image"
          width={'700'}
          height={'400'}
          // viewBox={'0 0 700 400'}
          onClick={() => setMoveable(!moveable)}
        >
          <image
            className="image"
            xlinkHref={environment.blobURL + '/' + url}
            x="0"
            y="0"
            width={700}
            height={400}
            onMouseMove={handleMouseMove}
          />

          {boxes.length > 0 &&
            boxes.map((box) => (
              <rect
                key={box._id}
                x={box.x_min}
                y={box.y_min}
                width={Math.abs(box.x_max - box.x_min)}
                height={Math.abs(box.y_max - box.y_min)}
                style={{ fill: 'none', stroke: 'darkred', strokeWidth: '3' }}
              />
            ))}
        </svg>

        {/* <img
          className="image"
          src={environment.blobURL + '/' + url}
          alt="selected"
        /> */}

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
              name="y_min"
              value={'400'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="x_max"
              value={'100'}
              onChange={onInputChange}
            />
            <input
              className="coordinates-input-edit"
              type="text"
              name="y_max"
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
