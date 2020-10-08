import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import proxy from '../reducers/proxy';
import {updateData} from './../actions/Actions'
import {connect} from "react-redux"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
 function Main(props) {
  const classes = useStyles();

 const updateData=()=>{
    props.updateData()
 }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Proxy Hub
          </Typography>
         
         
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps=state=>({
    //test:state.proxy.test
})


export default (connect(mapStateToProps,{updateData})(Main));