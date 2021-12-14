import React, { useState } from 'react';
import { Typography, FormControl, Button, Stack, Box, Grid, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Add } from '@mui/icons-material';

import Dashboard from '../components/Dashboard'

const BussinessManagement = () => {
  const [category, setCategory] = useState('category');

  return (
    <Dashboard>
      <Box sx={{ backgroundColor: 'white' }}>
        <Stack
          sx={{ margin: '5px' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant='h5' color='text.secondary'>Bussiness management</Typography>
          <Button startIcon={<Add />} variant='outlined'>Add your bussiness</Button>
        </Stack>
        <Box component="form" noValidate sx={{ mt: 3, marginRight: 2, }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="bussinessName"
                required
                fullWidth
                id="bussinessName"
                label="Bussiness Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="availableTime"
                label="Available Time"
                name="availableTime"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label='Categories'
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Request
          </Button>
        </Box>
      </Box>
    </Dashboard>
  )
}

export default BussinessManagement

