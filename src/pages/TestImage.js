/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const TestImage = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleSelect = (event) => {
    for (let file of event.target.files) {
      setImages((prevState) => [...prevState, file]);
    }
  }

  const handleUpload = () => {
    images.map(image => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed", (snapshot) => {

      }, (error) => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setUrls((prevState) => [...prevState, url])
          })
      })
    })
  }

  console.log(images, urls);

  return (
    <div>
      <input onChange={handleSelect} type='file' multiple/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default TestImage
