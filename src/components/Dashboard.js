import React from 'react'
import {Grid,Avatar, TextField, Stack, Button, CssBaseline} from '@mui/material';
import { AccountBox, AssuredWorkload, RoomService, ExitToApp, } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
/* eslint-disable no-unused-vars */
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: '#51555c',
    height: '500px',
    borderRadius: '10px',
    margin: '10px'
  },
  dashboard: {
    height: '700px',
    backgroundColor: '#f5f5f5'
  },
  button: {
    color: 'white !important',
    width: '100%',
    textAlign: 'left',
    "&:hover": {
      borderBottom: 'solid 1px white'
    },
  },
  logo: {
    width: '100px',
    height: '50px',
    marginTop: '10px',
  },
})
);

const Dashboard = (props) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline/>
      <Grid className={classes.dashboard} container spacing={2}>
        <Grid item xs={2.5}>
          <Stack
            className={classes.sidebar}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <img className={classes.logo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1200px-Yelp_Logo.svg.png' alt='adad'/>
            <Button startIcon={<AccountBox/>} className={classes.button} variant='text' size='large'>
              Profile
            </Button>
            <Button startIcon={<AssuredWorkload/>} className={classes.button} variant='text' size='large'>
              Bussiness
            </Button>
            <Button startIcon={<RoomService/>} className={classes.button} variant='text' size='large'>
              Service
            </Button>
            <Button startIcon={<ExitToApp/>} className={classes.button} variant='text' size='large'>
              Log out
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={9.5}>
          <Stack
            sx={{margin:'10px'}}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <TextField id="outlined-search" label="Search field" type="search" />
            <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          </Stack>
          {props.children}
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
