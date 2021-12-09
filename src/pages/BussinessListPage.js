import React from 'react'
import Header from '../components/Header'
import { CssBaseline,Pagination, Rating, Chip, Box, Link, Card, CardContent, CardMedia, Breadcrumbs, Container, Stack, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const BussinessListPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Box>
        <Container maxWidth='lg'>
          <Breadcrumbs aria-label="breadcrumb" separator='›'>
            <Link underline='hover' href='#' color="inherit">
              Da Nang
            </Link>
            <Link underline='hover' href='#' color="inherit">
              Home Service
            </Link>
          </Breadcrumbs>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant='h6'>
              The best 10 home services in Da Nang
            </Typography>
            <Button
              color='error'
              id="basic-button"
              endIcon={<ArrowDropDown />}
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Sort
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
              <MenuItem onClick={handleClose}>Recommended</MenuItem>
              <MenuItem onClick={handleClose}>Highest Rated</MenuItem>
              <MenuItem onClick={handleClose}>Most Reviewed</MenuItem>
            </Menu>
          </Stack>
        </Container>
        <Container maxWidth='md'>
          <Stack spacing={2}>
          <Link href='#' underline='none'>
            <Card sx={{ maxHeight: 250, display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ height: '100%', width: 300 }}
                image="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Luxury Home Services, Full Access
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                  <Stack direction="row" spacing={1}>
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                  </Stack>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    some random text, iam just don't know what to do next, maybe just as long as i can
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Link>
          <Link href='#' underline='none'>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ height: '100%', width: 300 }}
                image="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Luxury Home Services, Full Access
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                  <Stack direction="row" spacing={1}>
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                  </Stack>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    some random text, iam just don't know what to do next, maybe just as long as i can
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Link>
          <Link href='#' underline='none'>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ height: '100%', width: 300 }}
                image="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Luxury Home Services, Full Access
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                  <Stack direction="row" spacing={1}>
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                  </Stack>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    some random text, iam just don't know what to do next, maybe just as long as i can
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Link>
          <Link href='#' underline='none'>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ height: '100%', width: 300 }}
                image="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Luxury Home Services, Full Access
                  </Typography>
                  <Rating name="read-only" value={3} readOnly />
                  <Stack direction="row" spacing={1}>
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                    <Chip size='small' label="Chip Filled" />
                  </Stack>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    some random text, iam just don't know what to do next, maybe just as long as i can
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Link>
          <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default BussinessListPage
