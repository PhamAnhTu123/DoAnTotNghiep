import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { CssBaseline, Grid, Container, Stack, Avatar, Typography, Button, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { CardActionArea } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Collection = () => {
  const [collection, setCollection] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/collections/${id}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => {
      console.log(res)
      setCollection(res.data);
    });
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data))
  }, [id])

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
            src="/static/images/avatar/1.jpg"
            sx={{ width: 80, height: 80 }}
          />
          <Stack spacing={1}>
            <Typography variant='h4'>{user.userName}</Typography>
            <Typography variant='subtitle2' color='text.secondary'>Email</Typography>
            <Typography variant='h6'>{user.email}</Typography>
            <Typography variant='subtitle2' color='text.secondary'>Full name</Typography>
            <Typography variant='h6'>{user.fullname}</Typography>
          </Stack>
          <Button variant='outlined' size='large'>
            Chỉnh Sửa
          </Button>
        </Stack>
      </Container>
      <Box sx={{ backgroundColor: '#dedede' }}>
        <Container maxWidth='lg'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Cá Nhân
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/getting-started/installation/"
            >
              Danh Sách
            </Link>
            <Typography color="text.primary">{collection.collectionName}</Typography>
          </Breadcrumbs>
          <Typography gutterBottom variant='h5'>
            {collection.collectionName}
          </Typography>
          <Grid container spacing={2}>
            {
              collection.bussinesses ? collection.bussinesses.map(bussiness => (
                <Grid item xs={4}>
                  <Card>
                    <CardActionArea href={`me/collections/${collection.id}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={bussiness.bussiness.images[0]}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {bussiness.bussiness.bussinessName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {bussiness.bussiness.bussinessDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )) : 'null'
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Collection
