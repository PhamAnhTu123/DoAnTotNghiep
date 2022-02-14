import React, {useEffect, useState} from 'react';
import Dashboard from './Dashboard';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';


const AdminUser = () => {
  const [value, setValue] = React.useState('1');
  const [bussinesses, setBussinesses] = useState([]);
  const [users, setUsers] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/owners?limit=50', {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem('admin')}`,
        }
    }).then(res => {
      setBussinesses(res.data.docs);
    });

    axios.get('http://localhost:8080/api/v1/users?limit=50', {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem('admin')}`,
        }
    }).then(res => {
      setUsers(res.data.docs);
    });
  }, []);

  console.log(bussinesses)
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
          Quản lý người dùng
        </Link>
      </Breadcrumbs>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Người dùng" value="1" />
                <Tab label="Chủ doanh nghiệp" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên tài khoản</TableCell>
                      <TableCell align="left">Tên đầy đủ</TableCell>
                      <TableCell align="left">email</TableCell>
                      <TableCell align="left">Hoạt động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {user.userName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.fullname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell align="left">
                          <Button variant='contained' color='error' href={`bussinesses/${user.id}`} size='small'>Xóa tài khoản</Button>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên tài khoản</TableCell>
                      <TableCell align="left">Tên Chủ Doanh Nghiệp</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Hoạt động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bussinesses.map((bussiness) => (
                      <TableRow
                        key={bussiness.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {bussiness.userName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.fullname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.email}
                        </TableCell>
                        <TableCell align="left">
                          <Button variant='contained' color='error' href={`bussinesses/${bussiness.id}`} size='small'>Xóa tài khoản</Button>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </Dashboard>
  )
}

export default AdminUser
