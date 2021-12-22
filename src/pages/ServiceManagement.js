import React, { useState, useEffect } from 'react';
import { Typography, FormControl,Paper, Button, Stack, Box, Grid, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Add } from '@mui/icons-material';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

const ServiceManagement = () => {
  const [bussiness, setBussiness] = useState('');
  const [bussinesses, setBussinesses] = useState([]);
  const [image, setImage] = useState({});
  const [url, setUrl] = useState('');

  const onSelect = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSelect = (event) => {
    setBussiness(event.target.value)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('servicePrice'));
    axios.post('http://localhost:8080/api/v1/services', {
      bussiness,
      serviceName: data.get('serviceName'),
      serviceDescription: data.get('serviceDescription'),
      servicePrice: parseInt(data.get('servicePrice')),
      image: url,
      }, {
        headers: {
          "Authorization" : `Bearer ${window.localStorage.getItem('owner')}`,
          
        },
      }).then(res => console.log(res))
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/owners/me/bussinesses', {
      headers: {
        "Authorization" : `Bearer ${window.localStorage.getItem('owner')}`,
      }
    }).then(res => {
      setBussinesses(res.data)
    });
  }, []);

  return (
    <Dashboard>
      <Paper sx={{ backgroundColor: 'white' }}>
        <Stack
          sx={{ margin: '5px' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant='h5' color='text.secondary'>Service management</Typography>
          <Button startIcon={<Add />} variant='outlined'>Add your Service</Button>
        </Stack>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, marginRight: 2, marginLeft: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="bussinesses">Business</InputLabel>
                <Select
                  labelId="bussiness"
                  id="demo-simple-select"
                  value={bussiness}
                  onChange={handleSelect}
                  label='Bussinesses'
                >
                  {
                    bussinesses.map((buss) => (
                      <MenuItem value={buss.id}>{buss.bussinessName}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="serviceName"
                required
                fullWidth
                id="serviceName"
                label="Service Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="price"
                label="Service Price"
                name="servicePrice"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="serviceDescription"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Typography variant='h6' color='text.secondary'>Add Images</Typography>
          <input onChange={onSelect} type='file' multiple/>
          <button onClick={handleUpload}>Upload</button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Request
          </Button>
        </Box>
      </Paper>
    </Dashboard>
  )
}

export default ServiceManagement
