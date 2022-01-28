import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Chip, Link, CardActions, Avatar, Grid, Container, Box, Stack, Button, Rating, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Phone, Directions, ThumbUp } from '@mui/icons-material';
import Header from '../components/Header';
import axios from 'axios';

const Bussiness = () => {
  const { id, category } = useParams();
  const [bussiness, setBussiness] = useState({});
  const [reviews, setReviews] = useState([]);
  const [ratingValue, setRatingValue] = React.useState(0);
  const [bussinesses, setBussinesses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState({});
  const [image, setImage] = useState({});
  const [url, setUrl] = useState('');
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSave = () => {
    setOpenSave(true);
  };

  const handleCloseSave = () => {
    setOpenSave(false);
  };

  const handleCloseCollection = () => {
    setOpenCollection(false);
  };

  const onSelect = (event) => {
    setImage(event.target.files[0]);
  }

  const onColectionSelect = (event) => {
    console.log(event)
    setCollection(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      title: data.get('title'),
      content: data.get('content'),
    });
    await axios.post('http://localhost:8080/api/v1/reviews', {
      bussiness: bussiness.id,
      title: data.get('title'),
      content: data.get('content'),
      point: ratingValue,
      image: url,
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => {
      console.log(res)
      setOpen(false)
    });
  };

  const handleSubmitCollection = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      title: data.get('title'),
      content: data.get('content'),
    });
    await axios.post('http://localhost:8080/api/v1/collections', {
      collectionName: data.get('title'),
      collectionDescription: data.get('content'),
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setOpenCollection(false));
    await axios.get('http://localhost:8080/api/v1/users/me/collection', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => {
      setCollections(res.data);
    });
  };

  const handleSubmitSave = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      title: data.get('title'),
      content: data.get('content'),
    });
    await axios.put(`http://localhost:8080/api/v1/collections/${collection.id}`, {
      bussiness: bussiness.id,
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setOpenSave(false));
  };

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
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}`).then(res => {
      console.log(res.data)
      setBussiness(res.data)
    });
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}/news?limit=4`).then(res => {
      setNews(res.data.docs)
    })
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}/services`).then(res => {
      setServices(res.data)
    })
    axios.get(`http://localhost:8080/api/v1/bussinesses?limit=5&category=${category}`).then(res => {
      setBussinesses(res.data.docs);
    })
    axios.get('http://localhost:8080/api/v1/users/me/collection', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => {
      setCollections(res.data);
    });
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}/reviews?limit=10`)
      .then(res => {
        setReviews(res.data.docs)
      })
  }, [id, category]);

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
                <Rating name="read-only" precision={0.5} size='large' value={bussiness.rating ? bussiness.rating.reduce((avg, rate) => {return avg+rate}, 0)/bussiness.rating.length : 4} readOnly />
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
              <Button onClick={handleClickOpen} variant='contained' color='error' size='large'>
                Write a review
              </Button>
              <Button variant='outlined' color='error' size='large'>
                Add Photo
              </Button>
              <Button variant='outlined' color='error' size='large'>
                Share
              </Button>
              <Button onClick={handleClickOpenSave} variant='outlined' color='error' size='large'>
                Save
              </Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Đánh Giá</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Để lại đánh giá của bạn để doanh nghiệp càng ngày càng phát triển
                </DialogContentText>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Tiêu đề"
                    name="title"
                    autoComplete="title"
                    autoFocus
                  />
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Nội dung"
                    name='content'
                    style={{ width: '100%', height: '100px' }}
                  />
                  <Typography variant='h6' color='text.secondary'>Đánh Giá</Typography>
                  <Rating
                    name="size-large"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                    size="large" />
                  <Typography variant='h6' color='text.secondary'>Thêm Ảnh</Typography>
                  <input onChange={onSelect} type='file' multiple />
                  <button onClick={handleUpload}>Upload</button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đánh Giá
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openSave} onClose={handleCloseSave}>
              <DialogTitle>Lưu Vào Danh Sách</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Lưu danh sách yêu thích của bạn
                </DialogContentText>
                <Box component="form" onSubmit={handleSubmitSave} noValidate sx={{ mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Danh sách</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={collection}
                      label='Categories'
                      onChange={onColectionSelect}
                    >
                      {
                        collections.map((collection) => (
                          <MenuItem key={collection.id} value={collection}>{collection.collectionName}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <Stack spacing={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Lưu danh sách
                    </Button>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenCollection(true)
                      }}
                    >
                      Tạo danh sách mới
                    </Button>
                  </Stack>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSave}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openCollection} onClose={handleCloseCollection}>
              <DialogTitle>Thêm Danh Sách Yêu Thích</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tạo Danh Sách yêu thích mới của bạn
                </DialogContentText>
                <Box component="form" onSubmit={handleSubmitCollection} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Tiêu đề"
                    name="title"
                    autoComplete="title"
                    autoFocus
                  />
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Nội dung"
                    name='content'
                    style={{ width: '100%', height: '100px' }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Thêm Danh Sách
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCollection}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <hr />
            <Typography underline='none' sx={{ marginTop: 2 }} variant='h6'>Thông Báo</Typography>
            <Grid container spacing={2}>
              {
                news.map(info => (
                  <Grid key={info.id} item xs={12}>
                    <Card sx={{ display: 'flex' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={info.image}
                        alt="Live from space album cover"
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h6">
                            {info.title}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {info.content}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <Link underline='none' href='#'>
              <Typography textAlign='center' variant='subtitle2'>xem thêm thông báo</Typography>
            </Link>
            <hr />
            <Typography sx={{ marginTop: 2 }} variant='h6'>Dịch Vụ</Typography>
            <Grid container spacing={2}>
              {
                services.map(service => (
                  <Grid key={service.id} item xs={6}>
                    <Card sx={{ display: 'flex', justifyContent: "space-between" }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h6">
                            {service.serviceName}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {service.serviceDescription}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {service.servicePrice} VND
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={service.image}
                        alt={service.image}
                      />
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <Link underline='none' href='#'>
              <Typography textAlign='center' variant='subtitle2'>xem thêm dịch vụ</Typography>
            </Link>
            <hr />
            <Typography sx={{ marginTop: 2 }} variant='h6'>Đánh Giá ({bussiness.rating ? bussiness.rating.length : '0'})</Typography>
            <Grid container spacing={2}>
              {
                reviews.map(review => (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={2}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={review.user.avatar}
                            sx={{ width: 56, height: 56 }}
                          />
                          <Typography gutterBottom variant="h5" component="div">
                            {review.user.userName}
                          </Typography>
                        </Stack>
                        <Rating value={review.point} size='large' readOnly />
                        <Typography gutterBottom variant="h5" component="div">
                          {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.content}
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="300"
                        image={review.image}
                      />
                      <CardActions>
                        <Button size="small" color='error' variant='outlined' startIcon={<ThumbUp />}>Hữu ích</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: 'solid 1px #bababa', borderRadius: '5px' }}>
              <Stack
                sx={{ padding: '5px', borderBottom: 'solid 1px #bababa' }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant='h6'>
                  {bussiness.phone || 'null'}
                </Typography>
                <Phone />
              </Stack>
              <Typography color='blue' sx={{ marginLeft: '5px' }} variant='h6'>
                Direction
              </Typography>
              <Stack
                sx={{ padding: '5px' }}
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
            <Typography sx={{ marginTop: 2 }} gutterBottom variant='h6'>Có thể bạn sẽ thích</Typography>
            <Stack
              spacing={2}
            >
              {
                bussinesses.filter(buss => buss.id !== bussiness.id).map(bussiness => (
                  <Card key={bussiness.id} sx={{ maxHeight: 350 }}>
                    <CardMedia
                      component="img"
                      sx={{ height: '200px', width: '100%' }}
                      image={bussiness.images[0]}
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {bussiness.bussinessName}
                        </Typography>
                        <Rating name="read-only" precision={0.5} value={bussiness.rating.reduce((avg, rate) => { return avg + rate }, 0) / bussiness.rating.length} readOnly />
                        <Stack direction="row" spacing={1}>
                          {
                            bussiness.tags ? bussiness.tags.map((tag) => (
                              <Chip label={tag} key={tag} />
                            )) : 'null'
                          }
                        </Stack>
                      </CardContent>
                    </Box>
                  </Card>
                ))
              }
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Bussiness
