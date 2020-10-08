import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Error from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {connect} from "react-redux"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  console.log(props.data)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Test Result</DialogTitle>
      {props.data ? 
        <>
         {props.data!== false && props.data.status=== 200 ?
        <List>
            <ListItem  button >
                <ListItemText primary={"Proxy: "+props.data.ip+":"+props.data.port} />
            </ListItem>
        <ListItem  button >
          <ListItemAvatar>
           <CheckCircle style={{color:"green"}} />
          </ListItemAvatar>
          <ListItemText primary="Result: Successfull" />

        </ListItem>
        <ListItem  button >
          <ListItemAvatar>
          <CheckCircle style={{color:"green"}} />

          </ListItemAvatar>
          <ListItemText primary={"Status Code: "+props.data.status} />

        </ListItem>
        </List>
        : props.data.status== false ?
        <List>
            <ListItem  button >
                <ListItemText primary={"Proxy: "+props.data.ip+":"+props.data.port} />
            </ListItem>
        <ListItem  button >
        <ListItemAvatar>
      <Error style={{color:"red"}} />

      </ListItemAvatar>
    <ListItemText primary={"Result: Failed"} />

    </ListItem>
    <ListItem  button >
      <ListItemAvatar>
      <Error style={{color:"red"}} />

      </ListItemAvatar>
      <ListItemText primary={"Status Code: "+props.data.message.code} />

    </ListItem>
    </List>
        :<List>
            <ListItem  button >
                <ListItemText primary={"Proxy: "+props.data.ip+":"+props.data.port} />
            </ListItem>
            <ListItem  button >
            <ListItemAvatar>
          <Error style={{color:"red"}} />

          </ListItemAvatar>
        <ListItemText primary="Result: Failed " />

        </ListItem>
        <ListItem  button >
          <ListItemAvatar>
          <Error style={{color:"red"}} />

          </ListItemAvatar>
          <ListItemText primary={"Status Code: "+props.data.status} />

        </ListItem>
        </List> }
      
        </>
      :  <Loader
      style={{marginTop:20, marginLeft:100}}
	     type="Bars"
	     color="#00BFFF"
	     height={30}
	     width={30}
	     timeout={0} //3 secs

	  />}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

 function SimpleDialogDemo(props) {
  //const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

 
 


  return (
    <div>
   
      <SimpleDialog data={props.data} open={props.open} onClose={props.onClose} />
    </div>
  );

}
const mapStateToProps=state=>({
    data:state.proxy.test_info
  })

export default (connect(mapStateToProps,{})(SimpleDialogDemo));