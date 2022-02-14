import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Dashboard from './Dashboard';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rowers = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullname', headerName: 'Tên đầy đủ', width: 130 },
  { field: 'userName', headerName: 'Tên tài khoản', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
];


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [bussinesses, setBussinesses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/bussinesses?limit=${100}`).then(res => {
      setBussinesses(res.data.docs)
      console.log(res.data.docs)
    });
    axios.get(`http://localhost:8080/api/v1/users?limit=${100}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('admin')}`,
      }
    }).then(res => {
      setUsers(res.data.docs)
      console.log(res.data.docs)
    });
    axios.get(`http://localhost:8080/api/v1/owners?limit=${100}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('admin')}`,
      }
    }).then(res => {
      setOwners(res.data.docs)
      console.log(res.data.docs)
    });
  }, [])

  return (
    <Dashboard>

      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant='h5'>Danh sách người dùng</Typography>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={6} lg={6}>
        <Typography variant='h5'>Danh sách chủ doanh nghiệp</Typography>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <DataGrid
              rows={owners}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
        <Typography variant='h5'>Danh sách doanh nghiệp</Typography>
          <Paper sx={{ p: 2, height: 300, display: 'flex', flexDirection: 'column' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên doanh nghiệp</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Trạng thại</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>Thời gian hoạt động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bussinesses.map((row) => (
                    <TableRow
                      onClick={() => { console.log('some') }}
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.bussinessName}
                      </TableCell>
                      <TableCell>{row.bussinessDescription}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.availableTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Dashboard>
  )
}

export default AdminDashboard
