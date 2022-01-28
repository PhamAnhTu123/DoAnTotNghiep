import React, {useEffect, useState} from 'react'
import Header from '../components/Header';
import { CssBaseline, Grid, Container, Stack, Avatar, Typography, Button, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me/collection', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => {
      setCollections(res.data);
    });
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data))
  },[])
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
          <Typography gutterBottom sx={{ padding: 2 }} variant='h5'>
            Danh sách đã lưu
          </Typography>
          <Grid container spacing={2}>
            {
              collections.map(collection => (
                <Grid item xs={4}>
                  <Card>
                    <CardActionArea href={`me/collections/${collection.id}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://picsum.photos/200/200"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {collection.collectionName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {collection.collectionDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default UserProfile
