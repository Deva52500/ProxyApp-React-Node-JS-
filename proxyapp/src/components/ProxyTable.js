import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {updateData,testUrl,resetTestInfo,testUrlBasic} from '../actions/Actions'
import {connect} from "react-redux"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import Moment from 'react-moment';
import SimpleDialog from './TestInfo'
import Button from '@material-ui/core/Button'
const columns = [
  { id: 'ipAddress', label: 'IP ADDRESS', minWidth: 170 },
  { id: 'port', label: 'Port', minWidth: 100 },
  {
    id: 'createdAt',
    label: 'Create Date',
    minWidth: 170,
    align: 'center',
    format: (value)=><Moment format="YYYY/MM/DD hh:mm:ss">{value}</Moment>

  },
  {
    id: 'updatedAt',
    label: 'Updated Date',
    minWidth: 170,
    align: 'center',
    format: (value)=><Moment format="YYYY/MM/DD hh:mm:ss">{value}</Moment>

  },
  {
    id: 'lastTestDate',
    label: 'Last Test Date',
    minWidth: 170,
    align: 'center',
    format: (value)=><Moment format="YYYY/MM/DD hh:mm:ss">{value}</Moment>
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 170,
    align: 'center',
  },
];





const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '80vh',
  },
});

 function ProxyTable(props) {
  const classes = useStyles(); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {proxies} = props
  const [open, setOpen] = React.useState(false);
  const [testInfo, setData]=React.useState({})
  const handleTestURL=(ip,port)=>{
    //setData({ip:ip, port:port})
    props.testUrl(ip,port)
    setOpen(true);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
  console.log(proxies.length);
  
  return (
    <Paper className={classes.root}>
                  <SimpleDialog open={open} testInfo={testInfo} onClose={handleClose} />

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                  align="center"
                  style={{ minWidth: 100 }}
                >
                  Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proxies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format  ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell >
                  <Button color="primary" onClick={()=>handleTestURL(row.ipAddress, row.port)}> Test URL</Button>
                <Button color="primary" onClick={()=>handleTestBasic(row.ipAddress, row.port)}> Test Proxy </Button>

                      </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={proxies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
const mapStateToProps=state=>({
    proxies:state.proxy.proxyList
  })
  

export default (connect(mapStateToProps,{updateData,testUrl,resetTestInfo,testUrlBasic})(ProxyTable));