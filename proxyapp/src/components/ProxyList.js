import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import proxy from '../reducers/proxy';
import {updateData,testUrl,resetTestInfo,testUrlBasic} from '../actions/Actions'
import {connect} from "react-redux"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Moment from 'react-moment';
import SimpleDialog from './TestInfo'
import Button from '@material-ui/core/Button'
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
//function createData(ip, port, country, type, speed) {
  //return { ip, port, country, type, speed };
//}

//const rows = [
  //createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //createData('Eclair', 262, 16.0, 24, 6.0),
  //createData('Cupcake', 305, 3.7, 67, 4.3),
  //createData('Gingerbread', 356, 16.0, 49, 3.9),
//];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

 function ProxyList(props) {
  const classes = useStyles();
  const {proxies} = props
  const [open, setOpen] = React.useState(false);
  const [testInfo, setData]=React.useState({})
  const handleTestURL=(ip,port)=>{
    
    
    //setData({ip:ip, port:port})
    props.testUrl(ip,port)
    setOpen(true);

  }
  const handleTestBasic=(ip,port)=>{
    
    
    //setData({ip:ip, port:port})
    props.testUrlBasic(ip,port)
    setOpen(true);

  }
  const handleClose = () => {
    props.resetTestInfo()
    setOpen(false);
  };
  useEffect(() => {
   
    // Update the document title using the browser API
    props.updateData()
  }, [ ]);
  
  if (proxies.length===0){
    return (
      <Loader
      style={{marginTop:50}}
	     type="Bars"
	     color="#00BFFF"
	     height={100}
	     width={100}
	     timeout={0} //3 secs

	  />
    )
  }
  else{
  return (
    <>
          <SimpleDialog open={open} testInfo={testInfo} onClose={handleClose} />

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>IP</StyledTableCell>
            <StyledTableCell align="right">Port</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Last_Checked</StyledTableCell>
            <StyledTableCell align="right">Updated</StyledTableCell>
            <StyledTableCell align="right">Provider</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {proxies.map((value, index)=> (
            <StyledTableRow key={value.ipAddress}>
              <StyledTableCell component="th" scope="row">
                {value.ipAddress}
              </StyledTableCell>
              <StyledTableCell align="right">{value.port}</StyledTableCell>
              <StyledTableCell align="right">
              <Moment format="YYYY/MM/DD hh:mm:ss">

                {value.createdAt}
                </Moment>
                </StyledTableCell>
              <StyledTableCell align="right">
              <Moment format="YYYY/MM/DD hh:mm:ss">{value.updatedAt}</Moment></StyledTableCell>
              <StyledTableCell align="right">
              <Moment format="YYYY/MM/DD hh:mm:ss">{value.lastTestDate}</Moment></StyledTableCell>
              <StyledTableCell align="right">{value.url}</StyledTableCell>
              <StyledTableCell align="right"><Button color="primary" onClick={()=>handleTestURL(value.ipAddress, value.port)}> Test URL</Button>
              <Button color="primary" onClick={()=>handleTestBasic(value.ipAddress, value.port)}> Test Basic </Button>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
        }
}
const mapStateToProps=state=>({
  proxies:state.proxy.proxyList
})


export default (connect(mapStateToProps,{updateData,testUrl,resetTestInfo,testUrlBasic})(ProxyList));