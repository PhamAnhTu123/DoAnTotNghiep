import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DashboardContent from './Dashboard';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Grid, Paper, Button, Stack, Divider, Typography, Chip, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';

const AdminBussinessDetail = () => {
  const [bussiness, setBussiness] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const render = () => {
    if(bussiness.status === 'PENDING') {
      return ( 
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ marginTop: 1, marginBottom: 1 }}
        >
          <Button variant='contained' onClick={handleAccept} color='primary'>Duyệt</Button>
          <Button variant='outlined' onClick={handleReject} color='error'>Từ chối</Button>
        </Stack>
      )
    }
    return (
      <Typography variant='h5' textAlign='center' color='text.secondary'>Bussiness Detail</Typography>
    )
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/bussinesses/${id}`).then(res => {
      setBussiness(res.data)
    });
  },[id]);

  const handleAccept = () => {
    axios.put(`http://localhost:8080/api/v1/bussinesses/${id}/ACCEPTED`, {}, {
      headers: {
        "Authorization" : `Bearer ${window.localStorage.getItem('admin')}`,
      }
    }).then(res => {
      console.log(res);
      navigate('/dashboard/bussinesses');
    })
  }

  const handleReject = () => {
    axios.put(`http://localhost:8080/api/v1/bussinesses/${id}/DECLINED`, {}, {
      headers: {
        "Authorization" : `Bearer ${window.localStorage.getItem('admin')}`,
      }
    }).then(res => {
      console.log(res);
      navigate('/dashboard/bussinesses');
    })
  }

  console.log(bussiness);
  return (
    <DashboardContent>
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
        <Typography color='text.primary'>{bussiness.bussinessName}</Typography>
      </Breadcrumbs>
      {render()}
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              height: 300,
            }}
          >
            <Typography variant='h6' color='text.secondary' gutterBottom>
              Thông tin doanh Nghiệp
            </Typography>
            <Stack
              direction="column"
              spacing={1}
            >
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Ten Doanh Nghiep :</Typography>
                <Typography variant='subtitle1'>
                  {bussiness.bussinessName}
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
                <Typography variant='subtitle1' color='text.secondary'>tags :</Typography>
                {
                  bussiness.tags ? bussiness.tags.map((tag) => (
                    <Chip label={tag} key={tag}/>
                  )) : 'null'
                }
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              height: 300,
            }}
          >
            <Typography variant='h6' color='text.secondary' gutterBottom>
              người đăng ký
            </Typography>
            <Stack
              direction="column"
              spacing={1}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={bussiness.owner ? bussiness.owner.avatar : 'null'}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant='subtitle1'>
                  {bussiness.owner ? bussiness.owner.fullname : 'null'}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Email :</Typography>
                <Typography variant='subtitle1'>{bussiness.owner ? bussiness.owner.email : 'null'}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>Ten Day Du :</Typography>
                <Typography variant='subtitle1'>{bussiness.owner ? bussiness.owner.fullname : 'null'}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Typography variant='subtitle1' color='text.secondary'>So Dien Thoai :</Typography>
                <Typography variant='subtitle1'>091123123</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        {/* Recent Orders */}
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
    </DashboardContent>
  )
}

export default AdminBussinessDetail
