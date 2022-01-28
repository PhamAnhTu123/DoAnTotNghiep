import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Button, Avatar, Box, Menu, MenuItem, Rating, TextField, Stack, Divider, Grid, Typography, Link } from '@mui/material';
import { Plumbing, Restaurant, Search, Home, DeliveryDining } from '@mui/icons-material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import '../css/LandingPage.css';
import useStyles from '../css/LandingPage';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function LandingPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [bussinesses, setBussinesses] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    window.localStorage.removeItem('token');
    window.location.reload()
  };

  const search = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('firstName'))
    navigate(`/bussinesses/search?q=${data.get('firstName')}`)
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users/me', {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(res => setUser(res.data))

    axios.get('http://localhost:8080/api/v1/bussinesses?limit=3')
      .then(res => {
        console.log(res.data)
        setBussinesses(res.data.docs)
      })
  }, [])

  const getUser = () => {
    if (window.localStorage.getItem('token')) {
      return (
        <Stack alignItems="center" direction='row' spacing={2}>
          <Typography variant='h6' color='white'>{user.userName}</Typography>
          <Button onClick={handleClick}>
            <Avatar alt={user.userName} src={user.avatar}/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Trang cá Nhân</MenuItem>
            <MenuItem onClick={handleClose}>Đăng Xuất</MenuItem>
          </Menu>
        </Stack>
      )
    } else {
      return (
        <Box>
          <Link className={classes.navLogin} href='/login' underline='none'>
            Đăng Nhập
          </Link>
          <Link className={classes.navButton} sx={{ marginLeft: 2 }} underline='none'>
            <Button color='error' variant="outlined">Đăng ký</Button>
          </Link>
        </Box>
      )
    }
  }

  return (
    <>
      <CssBaseline />
      <div className='main'>
        <div className='header'>
          <Container className='navbar' maxWidth='lg'>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Link className={classes.navItem} href='#' underline='none'>
                  Để lại đánh giá
                </Link >
                <Link className={classes.navItem} href='#' underline='none'>
                  Sự kiện
                </Link>
                <Link className={classes.navItem} href='#' underline='none'>
                  Trò chuyện
                </Link>
                <Link className={classes.navItem} href='#' underline='none'>
                  Melp cho doanh nghiệp
                </Link>
              </Box>
              {getUser()}
            </Stack>
          </Container>
          <Container>
            <img className={classes.logo} src='https://i2.wp.com/www.bluepearltax.com/wp-content/uploads/2017/05/yelp-logo-small-el-paso-bookkeeper.png?fit=218%2C140&ssl=1' alt='asds' />
          </Container>
          <Container>
            <Box onSubmit={search} component='form'>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="Find"
                    label="Find"
                    size='small'
                    variant="standard"
                    autoFocus
                  />
                </Grid>
                <Grid sx={{ borderLeft: 'solid 1px black' }} item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    id="Near"
                    label="Near"
                    name="lastName"
                    variant="standard"
                    autoComplete="family-name"
                    size='small'
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button sx={{ height: '100%' }} type='submit' color='error' variant="contained" size='large'><Search /></Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container sx={{ marginTop: 2 }} maxWidth='md'>
            <Grid container>
              <Grid item sm={3}>
                <Button href="http://localhost:3000/bussinesses/điện nước" startIcon={<Plumbing />} color='error' variant="text" size='medium'>Điện nước</Button>
              </Grid>
              <Grid item sm={3}>
                <Button href="http://localhost:3000/bussinesses/Restaurants" startIcon={<Restaurant />} color='error' variant="text" size='medium'>Nhà Hàng</Button>
              </Grid>
              <Grid item sm={3}>
                <Button href="http://localhost:3000/bussinesses/dọn nhà" startIcon={<Home />} color='error' variant="text" size='medium'>Dọn nhà</Button>
              </Grid>
              <Grid item sm={3}>
                <Button href="http://localhost:3000/bussinesses/vận chuyển" startIcon={<DeliveryDining />} color='error' variant="text" size='medium'>vận chuyển</Button>
              </Grid>
            </Grid>
          </Container>
          <Typography variant='h5' sx={{ marginTop: 25, color: 'white' }} textAlign='center'>
            Enjoy your trip
          </Typography>
        </div>
        <div className={classes.firstCardLine}>
          <Container maxWidth="md">
            <Typography textAlign='center' variant='h5' sx={{ color: 'red', fontWeight: 'bold', padding: 2 }} >
              Tìm các dịch vụ tốt nhất ở Đà Nẵng
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://media.istockphoto.com/photos/smartphone-repairman-man-securing-a-screw-picture-id1183921783?k=20&m=1183921783&s=612x612&w=0&h=63dsA2gdsNhmewpMezfbjAc62Zen0IoOt7kI2RcB2KA="
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                      Sửa Điện Thoại
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="http://localhost:3000/bussinesses/điện thoại" size="small">Xem qua</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item sm={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                      Khách Sạn
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="http://localhost:3000/bussinesses/khách sạn" size="small">Xem qua</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item sm={3} spacing={1}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://nancyshousekeepingservi.b-cdn.net/wp-content/uploads/2019/04/Goleta-House-Cleaning.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                      Giặt Ủi
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href="http://localhost:3000/bussinesses/giặt ủi" size="small">Xem qua</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item sm={3} spacing={1}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWBe2jvy-j7W6InIGJEO0IX26qQVumCm4xauEq4QMlsuggtYU69T9KM9DhA9SLBwnSDY&usqp=CAU"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography href="http://localhost:3000/bussinesses/massage" textAlign='center' gutterBottom variant="h6" component="div">
                      Massage
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Xem qua</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div>
          <Typography sx={{ color: 'red', paddingTop: '15px' }} textAlign='center' gutterBottom variant='h6'>Yelp Da Nang</Typography>
          <Container sx={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Link href='#' underline='none'>
                Da nang
              </Link >
              <Link href='#' underline='none'>
                Ha Noi
              </Link>
              <Link href='#' underline='none'>
                Tp HCM
              </Link>
              <Link href='#' underline='none'>
                Hai Phong
              </Link>
              <Link href='#' underline='none'>
                Ha Long
              </Link>
              <Link href='#' underline='none'>
                Dong Hoi
              </Link>
              <Link href='#' underline='none'>
                Can Tho
              </Link>
              <Link href='#' underline='none'>
                Ha Tinh
              </Link>
              <Link href='#' underline='none'>
                Binh Duong
              </Link>
              <Link href='#' underline='none'>
                Hoi An
              </Link>
            </Stack>
          </Container>
          <Typography sx={{ color: 'red', paddingTop: '15px' }} textAlign='center' gutterBottom variant='h6'>Hot bussinesses</Typography>
          <Container maxWidth='md'>
            <Grid container spacing={2}>
              {
                bussinesses.map(bussiness => (
                  <Grid item sm={4}>
                    <Link href={`http://localhost:3000/bussinesses/${bussiness.category.categoryName}/${bussiness.id}`} underline='none'>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={bussiness.images[0]}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {bussiness.bussinessName}
                          </Typography>
                          <Rating name="read-only" value={bussiness.rating.reduce((avg, rate) => {return avg+rate}, 0)/bussiness.rating.length} readOnly />
                          <Typography variant="body2" color="text.secondary">
                            {bussiness.bussinessDescription}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))
              }
            </Grid>
          </Container>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link href='#' sx={{ padding: 1 }}>Xem thêm nhiều dịch vụ nổi tiếng khác</Link>
          </Stack>
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
    </>
  );
}

export default LandingPage;