import React, { useState } from 'react';


function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    console.log("event.target.files="+event.target.files)
    setFile(event.target.files);
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
//formData.append('file', file);

const files = file;
for (let i = 0; i < files.length; i++) {
  formData.append(`file-${i}`, files[i]);
}

fetch('https://urilinks.com', {
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