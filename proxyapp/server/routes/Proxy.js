const express = require('express')
const proxy = express.Router()
const fetch = require('node-fetch')
const db = require('../database/db.js')
var Http = require('http');
const { func } = require('prop-types');
const { permittedCrossDomainPolicies } = require('helmet');
const proxy_check = require('proxycheck-node.js'); 
var dateFormat = require('dateformat');

proxy.post('/testurlbasic',(req,res)=>{
    const ip=req.body.ip
    const port=req.body.port
        
    now = Date.now();
    now=dateFormat(now, "yyyy-mm-dd hh:MM:ss");
    var sqlUpdate = "UPDATE proxylist SET lastTestDate='"+now+"' where ipAddress='"+ip+"';Select * from proxylist;"
    db.getConnection((err, connection) => {
        if (err) {
        console.log(err);
            //res.sendStatus(500)
            }
        connection.query(sqlUpdate, function (err, results) {
            if (err) {
                console.log(err)
               // res.sendStatus(500)
            }
            else{  
                
                const check = new proxy_check({api_key: '1q1044-64767d-9mq027-58e033'}); 
                const result = check.check(ip,{port:port}).then(result => 
                    {
                        if (result.status==="ok"){
              console.log({proxyList:results[1], test_info:{ip:ip, port:port, status:200, message:"Proxy:  "+result[ip].proxy}});
                            
              res.send({proxyList:results[1], test_info:{ip:ip, port:port, status:200, message:"Proxy:  "+result[ip].proxy}})
                        }
                        else{
                            res.send({proxyList:results[1], test_info:{ip:ip, port:port, status:false, message:{code:result.message}}})
                        }
                    }
                    );

            }
        })
    })
})

proxy.post('/testurl',(req,res)=>{
    const ip=req.body.ip
    const port=req.body.port
    console.log("TEST URL");

    var request = Http.request({
        host: ip,
        // proxy IP
        port: port,
        // proxy port
        method: 'GET',
        timeout:3000,
        path: 'https://www.google.com/' // full URL as path
        }, function (response) {
        console.log(response.statusCode);
        
        res.send({ip:ip, port:port,status:response.statusCode, message:null})
        

        
    });
    
    request.on('error', function(error){
        console.log(error)
        res.send({ip:ip,port:port,status:false, message:error})
    })  
   
    request.end()

})
proxy.get('/update', (req, res)=> {
    
    var sql = "Select * from proxylist;"
    db.getConnection((err, connection) => {
        if (err) {
        console.log(err);
            //res.sendStatus(500)
            }
        connection.query(sql, function (err, results) {
            if (err) {
                console.log(err)
               // res.sendStatus(500)
            }
            else{  
                                  
               res.send({proxy:results})                }
            })
        })
})
module.exports = proxy