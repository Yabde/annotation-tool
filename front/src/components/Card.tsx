import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import axios from '../utils/axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { environment } from '../environment/environment';

import './Card.css';

type Props = {
  imageInfo: any;
};

export const Card: React.FC<Props> = ({ imageInfo }) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="image-item">
          <Link to={`/image/${imageInfo.id}`} className="image">
            <img
                className="img-wrapped"
                src={environment.blobURL + '/' + imageInfo.url}
                alt="selected"
            />
          </Link>
        </div>

        <div className="image-info">
          <div className="info-data">This image contains :</div>
          <div className="card-button-wrapper">
            <button className="card-button annotate">Annotate</button>
            <button className="card-button delete">
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
