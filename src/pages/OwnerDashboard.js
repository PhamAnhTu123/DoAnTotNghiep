import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Grid, Paper, Button, Stack, Typography, Box, Chip, FormControl, TextField, Select, MenuItem, InputLabel } from '@mui/material';
// import { useNavigate } from 'react-router';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

const OwnerDashboard = () => {
  const [bussinesses, setBussinesses] = useState([]);
  const [services, setServices] = useState([]);
  const [bussiness, setBussiness] = useState({});
  const [news, setNews] = useState([]);
  const [image, setImage] = useState({});
  const [url, setUrl] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelect = (event) => {
    setImage(event.target.files[0]);
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
    axios.get(`http://localhost:8080/api/v1/owners/me/bussinesses`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('owner')}`,
      }
    }).then(res => {
      setBussinesses(res.data)
      setBussiness(res.data[0])
    })
  }, [])

  const handleSelect = async (event) => {
    const value = bussinesses.filter(item => item.id === event.target.value);
    setBussiness(value[0]);
    await axios.get(`http://localhost:8080/api/v1/bussinesses/${value[0].id}/services`).then(res => {
      setServices(res.data)
    });
    await axios.get(`http://localhost:8080/api/v1/bussinesses/${value[0].id}/news`).then(res => {
      setNews(res.data.docs)
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      title: data.get('title'),
      content: data.get('content'),
    });
    await axios.post('http://localhost:8080/api/v1/news', {
      bussiness: bussiness.id,
      title: data.get('title'),
      content: data.get('content'),
      image: url,
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('owner')}`,
      }
    }).then(res => setOpen(false));
  };

  console.log(news)

  return (
    <Dashboard>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Bussinesses
        </Link>
      </Breadcrumbs>
      <Stack
        sx={{ marginTop: 1, marginBottom: 1 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Button variant='outlined' size='small'>
          Đăng ký doanh nghiệp
        </Button>
        <Button variant='contained' onClick={handleClickOpen} size='small'>
          Thêm bài viết
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
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
              <Typography variant='h6' color='text.secondary'>Add Images</Typography>
              <input onChange={onSelect} type='file' multiple />
              <button onClick={handleUpload}>Upload</button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Stack>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper
            sx={{
              p: 2,
              height: 350,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="bussinesses">Business</InputLabel>
              <Select
                labelId="bussiness"
                id="demo-simple-select"
                value={bussiness.id}
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
            <Stack
              direction="column"
              spacing={1}
            >
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Trang Thai :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.status}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Mo Ta :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.bussinessDescription}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>De Muc :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.category ? bussiness.category.categoryName : 'null'}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Thanh Pho :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.city ? bussiness.city.cityName : 'null'}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Dia chi :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.address}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>So dien thoai :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.phone}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>tags :</Typography>
                {
                  bussiness.tags ? bussiness.tags.map((tag) => (
                    <Chip label={tag} key={tag} />
                  )) : 'null'
                }
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={5}>
          <Paper
            sx={{
              p: 2,
              height: 350,
            }}
          >
            <Typography variant='h6' color='text.secondary'>
              Dịch Vụ
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dịch vụ</TableCell>
                    <TableCell>Mô Tả</TableCell>
                    <TableCell>Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <TableRow
                      key={service.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        {service.serviceName}
                      </TableCell>
                      <TableCell>{service.serviceDescription}</TableCell>
                      <TableCell>{service.servicePrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6' color='text.secondary'>
              Tin Tức
            </Typography>
            <Grid container spacing={2}>
              {
                news.map(item => (
                  <Grid item xs={6}>
                    <Card sx={{ display: 'flex' }}>
                      <CardMedia
                        component="img"
                        sx={{ height: 100, width: 100 }}
                        image={item.image}
                        alt="Live from space album cover"
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h6">
                            {item.title}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {item.content}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6' color='text.secondary'>
              Ảnh
            </Typography>
            <ImageList sx={{ height: 450 }} cols={4} rowHeight={164}>
              {bussiness.images ? bussiness.images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              )) : 'null'}
            </ImageList>
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  )
}

export default OwnerDashboard
