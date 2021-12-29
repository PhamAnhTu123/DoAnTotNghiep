import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { CssBaseline, Grid, Container, Box, Stack, Button, Rating, Typography } from '@mui/material';
import { Phone, Directions } from '@mui/icons-material';
import Header from '../components/Header';
import axios from 'axios';

const Bussiness = () => {
  const { id } = useParams();
  const [bussiness, setBussiness] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}`).then(res => {
      setBussiness(res.data)
    });
  }, [id]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ height: "400px", marginBottom: 2, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) ), url(${bussiness.images ? bussiness.images[0] : 'null'})` }}>
        <Container sx={{ height: '100%' }} maxWidth='lg'>
          <Stack
            sx={{ height: "100%" }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='h3'>{bussiness.bussinessName}</Typography>
              <Stack
                direction='row'
                spacing={1}
              >
                <Rating value={bussiness.rating ? bussiness.rating.reduce((avg, rate) => {return avg+rate}, 0)/bussiness.rating.length : 2 } size='large' readOnly />
                <Typography color='white' variant='h6'>
                  {bussiness.rating ? bussiness.rating.length : '10'} reviews
                </Typography>
              </Stack>
              <Stack
                direction='row'
                spacing={1}
              >
                <Typography color='red' variant='h6'>
                  Open
                </Typography>
                <Typography color='white' variant='h6'>
                  {bussiness.availableTime}
                </Typography>
              </Stack>
            </Box>
            <Button sx={{ marginBottom: 2 }} color='error' variant='outlined' size='large'>
              See All Pictures
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack direction='row' spacing={2}>
              <Button variant='contained' color='error' size='large'>
                Write a review
              </Button>
              <Button variant='outlined' color='error' size='large'>
                Add Photo
              </Button>
              <Button variant='outlined' color='error' size='large'>
                Share
              </Button>
              <Button variant='outlined' color='error' size='large'>
                Save
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: 'solid 1px #7a857e', borderRadius: '5px' }}>
              <Stack
                sx={{ padding: '5px', borderBottom: 'solid 1px #7a857e' }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant='h6'>
                  {bussiness.phone || 'null'}
                </Typography>
                <Phone />
              </Stack>
              <Typography color='blue' sx={{marginLeft: '5px'}} variant='h6'>
                Direction
              </Typography>
              <Stack
                sx={{ padding: '5px', borderBottom: 'solid 1px #f5f5f5' }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant='body1'>
                  {bussiness.address}
                </Typography>
                <Directions />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Bussiness
