import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../components/Header'
import { CssBaseline, Pagination, Rating, Chip, Box, Link, Card, CardContent, CardMedia, Breadcrumbs, Container, Stack, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const BussinessListPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bussinesses, setBussinesses] = useState([]);
  const { category } = useParams();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/bussinesses?category=${category}`).then(res => {
      setBussinesses(res.data.docs)
    });
  }, [category])

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
              {category}
            </Link>
          </Breadcrumbs>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant='h6'>
              The best 10 {category} in Da Nang
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
            {
              bussinesses.map(bussiness => (
                <Link key={bussiness.id} href={`${category}/${bussiness.id}`} underline='none'>
                  <Card sx={{ maxHeight: 250, display: 'flex' }}>
                    <CardMedia
                      component="img"
                      sx={{ height: '100%', width: 300 }}
                      image={bussiness.images[0]}
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {bussiness.bussinessName}
                        </Typography>
                        <Rating name="read-only" value={bussiness.rating.reduce((avg, rate) => {return avg+rate}, 0)/bussiness.rating.length} readOnly />
                        <Stack direction="row" spacing={1}>
                          {
                            bussiness.tags ? bussiness.tags.map((tag) => (
                              <Chip label={tag} key={tag} />
                            )) : 'null'
                          }
                        </Stack>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {bussiness.bussinessDescription}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Link>
              ))
            }
            <Pagination onChange={(event) => {console.log(event.target.value)}} count={3} variant="outlined" shape="rounded" />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default BussinessListPage
