import React from 'react';
/* eslint-disable no-unused-vars */
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, TextField, Container, Grid, Button, Stack, FormControl, Select } from '@mui/material';
import { Plumbing, Restaurant, Search, Home, ArrowDropDown } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const useStyles = makeStyles((theme) => ({
  logo: {
    width: '150px',
    height: '80px',
  },
  bar: {
    borderBottom: 'solid 1px #f5f5f5'
  }
})
);

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box marginBottom='15px' className={classes.bar}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <img className={classes.logo} src='https://i2.wp.com/www.bluepearltax.com/wp-content/uploads/2017/05/yelp-logo-small-el-paso-bookkeeper.png?fit=218%2C140&ssl=1' alt='asds' />
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
        <Stack direction='row' spacing={1}>
          <Button size='large' variant="outlined">Login</Button>
          <Button color='error' size='large' variant="contained">Sign up</Button>
        </Stack>
      </Stack>
      <Container maxWidth='md'>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Button
            color='error'
            endIcon={<Restaurant/>}
          >
            Restaurant
          </Button>
          <Button
            color='error'
            endIcon={<Home/>}
          >
            Home Services
          </Button>
          <Button
            color='error'
            endIcon={<Plumbing/>}
          >
            Auto Service
          </Button>
          <Button
            color='error'
            id="basic-button"
            endIcon={<ArrowDropDown/>}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            More
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
