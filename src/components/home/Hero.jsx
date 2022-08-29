import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import video from "../../data/video.mp4"
import { LoggedIn } from '../../reducers/loginSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '80vh',
    position: 'relative',
    '& video': {
      objectFit: 'cover',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
}));

const Hero = () => {
  const dispatch = useDispatch();
useEffect(()=>{
  console.log("hey")
  dispatch(LoggedIn())
},[])
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={video}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
      <div className={classes.overlay}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography variant="h3" component="h1" className={classes.title}>
            Title Goes Here
          </Typography>
          <Button color="primary" variant="contained">
            Click Me
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default Hero;