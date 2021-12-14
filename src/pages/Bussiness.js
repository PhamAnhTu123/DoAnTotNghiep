import React from 'react'
import { CssBaseline, Grid, Container, Box, Stack, Button, Rating, Typography } from '@mui/material';
import { Phone, Directions } from '@mui/icons-material';
import Header from '../components/Header';

const Bussiness = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ height: "400px", marginBottom: 2, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) ), url(https://efh.edu.vn/wp-content/uploads/2019/11/room-service-1200x600.jpg.webp)' }}>
        <Container sx={{ height: '100%' }} maxWidth='lg'>
          <Stack
            sx={{ height: "100%" }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='h3'>Gold Rush</Typography>
              <Stack
                direction='row'
                spacing={1}
              >
                <Rating value={4} size='large' readOnly />
                <Typography color='white' variant='h6'>
                  100 reviews
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
                  8:00 AM - 10:00 PM (Everyday)
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
                  0986629198
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
                  50 Ha Huy Tan, Quan Thanh Khe, Da Nang
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
