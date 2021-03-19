import axios from '../utils/axios';

// Upload on mongo + azure blob storage
const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append('file', file);

    return axios.post('/uploadImageIntoDb', formData, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
        onUploadProgress
    });
};

// get all image + annotation
const getFiles = () => {
    return axios.get('/allImagesAnnotated');
};

const FileUploadService = {
    upload,
    getFiles
};

export default FileUploadService;