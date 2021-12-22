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


const AdminBussiness = () => {
  const [value, setValue] = React.useState('1');
  const [bussinesses, setBussinesses] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/bussinesses?limit=50').then(res => {
      setBussinesses(res.data.docs);
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
          Bussinesses
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
                <Tab label="Chưa Duyệt" value="1" />
                <Tab label="Đã Duyệt" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên Doanh Nghiệp</TableCell>
                      <TableCell align="left">Tên Chủ Doanh Nghiệp</TableCell>
                      <TableCell align="left">Thành Phố</TableCell>
                      <TableCell align="left">Đề mục</TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left">Hoạt động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bussinesses.filter(bussiness => bussiness.status === 'PENDING').map((bussiness) => (
                      <TableRow
                        key={bussiness.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {bussiness.bussinessName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.owner.fullname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.city.cityName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.category.categoryName}
                        </TableCell>
                        <TableCell align="left">{bussiness.status}</TableCell>
                        <TableCell align="left">
                          <Button variant='contained' href={`bussinesses/${bussiness.id}`} size='small'>Chi Tiết</Button>
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
                      <TableCell>Tên Doanh Nghiệp</TableCell>
                      <TableCell align="left">Tên Chủ Doanh Nghiệp</TableCell>
                      <TableCell align="left">Thành Phố</TableCell>
                      <TableCell align="left">Đề mục</TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left">Hoạt động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bussinesses.filter(bussiness => bussiness.status === 'ACCEPTED').map((bussiness) => (
                      <TableRow
                        key={bussiness.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {bussiness.bussinessName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.owner.fullname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.city.cityName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {bussiness.category.categoryName}
                        </TableCell>
                        <TableCell align="left">{bussiness.status}</TableCell>
                        <TableCell align="left">
                          <Button variant='contained' href={`bussinesses/${bussiness.id}`} size='small'>Chi Tiết</Button>
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

export default AdminBussiness
