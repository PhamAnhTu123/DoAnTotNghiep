/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Typography, FormControl, Button, Stack, Box, Grid, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Add } from '@mui/icons-material';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

import Dashboard from '../components/Dashboard'

const BussinessManagement = () => {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState({});
  const [cities, setCities] = useState([]);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [owner, setOwner] = useState({});

  const onSelect = (event) => {
    console.log(event)
    setCategory(event.target.value);
  }

  const onCitySelect = (event) => {
    console.log(event.target.value)
    setCity(event.target.value);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/categories?limit=50').then(res => {
      setCategories(res.data.docs)
    });
    axios.get('http://localhost:8080/api/v1/cities?limit=50').then(res => {
      setCities(res.data.docs)
    });
    axios.get('http://localhost:8080/api/v1/owners/me', {
      headers: {
        "Authorization" : `Bearer ${window.localStorage.getItem('owner')}`,
      }
    }).then(res => {
      setOwner(res.data);
    });
  }, []);

  const handleSelect = (event) => {
    for (let file of event.target.files) {
      setImages((prevState) => [...prevState, file]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(window.localStorage.getItem('owner'));
    axios.post('http://localhost:8080/api/v1/bussinesses', {
      bussinessName: data.get('bussinessName'),
      bussinessDescription: data.get('bussinessDescription'),
      address: data.get('address'),
      owner: owner.id,
      city: city.id,
      availableTime: data.get('availableTime'),
      category: category.id,
      tags: data.get('tags').split(', '),
      images: urls,
      }, {
        headers: {
          "Authorization" : `Bearer ${window.localStorage.getItem('owner')}`,
          
        },
      }).then(res => console.log(res))
  }

  const handleUpload = (event) => {
    event.preventDefault();
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
  
  return (
    <Dashboard>
      <Box sx={{ backgroundColor: 'white' }}>
        <Stack
          sx={{ margin: '5px' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant='h5' color='text.secondary'>Bussiness management</Typography>
          <Button startIcon={<Add />} variant='outlined'>Add your bussiness</Button>
        </Stack>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, marginRight: 2, }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="bussinessName"
                required
                fullWidth
                id="bussinessName"
                label="Bussiness Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="availableTime"
                label="Available Time"
                name="availableTime"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="bussinessDescription"
                autoComplete="bussiness"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="tag"
                label="Tag"
                name="tags"
                autoComplete="tag"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category.categoryName}
                  label='Categories'
                  onChange={onSelect}
                >
                  {
                    categories.map((cate) => (
                      <MenuItem key={cate.id} value={cate}>{cate.categoryName}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="cities">Cities</InputLabel>
                <Select
                  labelId="cities"
                  id="demo-simple-select"
                  value={city.cityName}
                  label='Cities'
                  onChange={onCitySelect}
                >
                  {
                    cities.map((city) => (
                      <MenuItem key={city.id} value={city}>{city.cityName}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant='h6' color='text.secondary'>Add Images</Typography>
          <input onChange={handleSelect} type='file' multiple/>
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
      </Box>
    </Dashboard>
  )
}

export default BussinessManagement

