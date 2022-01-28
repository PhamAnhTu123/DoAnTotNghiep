import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'
import { CssBaseline, Pagination, Rating, Chip, Box, Link, Card, CardContent, CardMedia, Breadcrumbs, Container, Stack, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const SearchPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bussinesses, setBussinesses] = useState([]);
  const [searchTerms, setSearchTerms] = useSearchParams();
  const [tabs, setTabs] = useState(5);
  const [page, setPage] = React.useState(1);
  const { category } = useParams();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = searchTerms.get('q');
  console.log(search)

  const handleChange = async (event, value) => {
    setPage(value);
    await axios.get(`http://localhost:8080/api/v1/bussinesses?limit=${5}&page=${value}`).then(res => {
      setBussinesses(res.data.docs)
      setTabs(res.data.totalPages)
    });
  };

  const scoreSort = async () => {
    await axios.get(`http://localhost:8080/api/v1/bussinesses?category=${category}&orderBy=-totalScore`).then(res => {
      setBussinesses(res.data.docs)
    });
    setAnchorEl(null);
  }

  const scoreWorst = async () => {
    await axios.get(`http://localhost:8080/api/v1/bussinesses?category=${category}&orderBy=totalScore`).then(res => {
      setBussinesses(res.data.docs)
    });
    setAnchorEl(null);
  }

  const lengthSort = async () => {
    await axios.get(`http://localhost:8080/api/v1/bussinesses?category=${category}&orderBy=-rateTimes`).then(res => {
      setBussinesses(res.data.docs)
    });
    setAnchorEl(null);
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/bussinesses?search=${search}`).then(res => {
      setBussinesses(res.data.docs)
      console.log(res.data)
      setTabs(res.data.totalPages)
    });
  }, [search])

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
              Search
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
              Sắp xếp
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
              <MenuItem onClick={lengthSort}>Nhiều đánh giá nhất</MenuItem>
              <MenuItem onClick={scoreSort}>Đánh giá cao nhất</MenuItem>
              <MenuItem onClick={scoreWorst}>Đánh giá thấp nhất</MenuItem>
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
                        <Rating name="read-only" precision={0.5} value={bussiness.totalScore} readOnly />
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
            <Pagination onChange={handleChange} page={page} count={tabs} variant="outlined" shape="rounded" />
          </Stack>
        </Container>
      </Box>
    </>
  )
};

export default SearchPage;
