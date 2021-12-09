import React from 'react';
import { CssBaseline, Container, Button, Box, Rating, TextField, Stack, Divider, Grid, Typography, Link } from '@mui/material';
import { Plumbing, Restaurant, Search, Home, DeliveryDining } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import '../css/LandingPage.css';
import useStyles from '../css/LandingPage';

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
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className='main'>
        <div className='header'>
          <Container className='navbar' maxWidth='lg'>
            <Link className={classes.navItem} href='#' underline='none'>
              Write a review
            </Link >
            <Link className={classes.navItem} href='#' underline='none'>
              Event
            </Link>
            <Link className={classes.navItem} href='#' underline='none'>
              Talk
            </Link>
            <Link className={classes.navItem} href='#' underline='none'>
              Melp for bussiness
            </Link>
            <Link className={classes.navLogin} sx={{ marginLeft: '500px' }} href='#' underline='none'>
              log in
            </Link>
            <Link className={classes.navButton} sx={{ marginLeft: '15px' }} href='#' underline='none'>
              <Button color='error' variant="outlined">Sign up</Button>
            </Link>
          </Container>
          <Container>
            <img className={classes.logo} src='https://i2.wp.com/www.bluepearltax.com/wp-content/uploads/2017/05/yelp-logo-small-el-paso-bookkeeper.png?fit=218%2C140&ssl=1' alt='asds' />
          </Container>
          <Container>
            <Box component='form'>
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
                    required
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
                  <Button sx={{ height: '100%' }} color='error' variant="contained" size='large'><Search /></Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container sx={{ marginTop: 2 }} maxWidth='md'>
            <Grid container>
              <Grid item sm={3}>
                <Button startIcon={<Plumbing />} color='error' variant="text" size='medium'>Plumber</Button>
              </Grid>
              <Grid item sm={3}>
                <Button startIcon={<Restaurant />} color='error' variant="text" size='medium'>Restaurant</Button>
              </Grid>
              <Grid item sm={3}>
                <Button startIcon={<Home />} color='error' variant="text" size='medium'>Home service</Button>
              </Grid>
              <Grid item sm={3}>
                <Button startIcon={<DeliveryDining />} color='error' variant="text" size='medium'>Delivery</Button>
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
              Find the best bussiness in town
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
                      Phone Repair
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take a look</Button>
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
                      Hotel
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take a look</Button>
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
                      Dry cleaning
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take a look</Button>
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
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                      Massage
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Take a look</Button>
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
              <Grid item sm={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://leerit.com/media/blog/uploads/2015/04/08/tu-vung-tieng-anh-ve-nha-hang.jpeg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Machiya
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      French food for two people each table, totally free space
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://www.sashimihome.com/wp-content/uploads/Sushi-v%C3%A0-Sashimi-Gi%E1%BB%91ng-v%C3%A0-Kh%C3%A1c-Nhau-Nh%C6%B0-N%C3%A0o.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Shushi Dushi
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      Best shushi in town, come from legit traditional japanese family
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={4} spacing={1}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://www.kitchensanctuary.com/wp-content/uploads/2018/01/Crispy-Chilli-Beef-Noodles-recipe-square-FS.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Hongkong Beef noodle
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      Favorite beef noodle and  chinese food
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link sx={{padding: 1}}>See more hot and new bussinesses</Link>
          </Stack>
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
    </>
  );
}

export default LandingPage;