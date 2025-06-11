import React, { useState } from 'react';


function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    //const formData = new FormData();
    //formData.append('file', file);

    // axios.post('http://urilinks.com/public', formData, {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // })
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

//    const input = document.getElementById('fileinput');
//const file = input.files;
const formData = new FormData();
formData.append('file', file);

fetch('https://urilinks.com/public', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;