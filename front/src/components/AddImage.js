import React from 'react';

import './AddImage.css';

function AddImage() {
  function submitImage() {
    return;
  }

  function handleFileUpload() {
    return;
  }

  return (
    <div className="addImage">
      <p>AddImage</p>
      <form>
        <div class="input-file">
          <input type="file" name="image_file" onChange={handleFileUpload} />
          <button className="button-submit" type="submit" onClick={submitImage}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddImage;
