import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CssBaseline, Container,TextField, Stack, Avatar, Typography, Button} from '@mui/material';
import axios from 'axios';

const EditUser = () => {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({
    email: "",
    userName: "",
    fullname: "",
    avatar: "",
  })
  const [image, setImage] = useState({});
  const [url, setUrl] = useState('');


  const onSelect = (event) => {
    setImage(event.target.files[0]);
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setEditedUser({
      ...editedUser,
      [evt.target.name]: value
    });
  };

  const handleSubmit = async () => {
    console.log(editedUser);
    await axios.put('http://localhost:8080/api/v1/users/me', {
      email: editedUser.email,
      userName: editedUser.userName,
      fullname: editedUser.fullname,
      avatar: url,
    }, {
      headers: {
        "Authorization" : `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => console.log(res))
  }

  const handleUpload = (event) => {
    event.preventDefault();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", (snapshot) => {

    }, (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setUrl(url)
        })
    })
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setEditedUser({
      email: res.data.email,
      userName: res.data.userName,
      fullname: res.data.fullname,
      avatar: res.data.avatar,
    }))
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ marginBottom: 2 }} maxWidth='md'>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Avatar
            alt="Remy Sharp"
            src={editedUser.avatar}
            sx={{ width: 80, height: 80 }}
          />
          <Stack spacing={1}>
            <Typography variant='subtitle2' color='text.secondary'>Tên tài khoản</Typography>
            <TextField name='userName' value={editedUser.userName} onChange={handleChange}/>
            <Typography variant='subtitle2' color='text.secondary'>Thay đại diện</Typography>
            <input onChange={onSelect} type='file'/>
            <button onClick={handleUpload}>Upload</button>
            <Typography variant='subtitle2' color='text.secondary'>Email</Typography>
            <TextField name='email' onChange={handleChange} value={editedUser.email}/>
            <Typography variant='subtitle2' color='text.secondary'>tên đầy đủ</Typography>
            <TextField name='fullname' onChange={handleChange} value={editedUser.fullname}/>
          </Stack>
          <Button onClick={handleSubmit} variant='outlined' size='large'>
            Lưu
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default EditUser
