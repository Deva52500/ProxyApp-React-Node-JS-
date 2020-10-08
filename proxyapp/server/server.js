const { createServer } = require('http');
const fs = require('fs');

const compression = require('compression');
const morgan = require('morgan')
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const server = createServer(app)
var path = require('path');
var helmet = require('helmet')
const Proxy = require('./routes/Proxy')

const fetch = require('node-fetch')
const db = require('./database/db.js')
var dateFormat = require('dateformat');

const dev = app.get('env') !== 'production'
//const normalizePort = port => parseInt(port, 10)
const PORT =5020;
//const sendNotifications = require('./sockets/Notifications')
const tools=require('./tools')
/* HTTPS Configuration options */




/* Creates https server */


app.use(helmet())
app.set('trust proxy', 1) // trust first proxy
/* Key for user token */
//process.env.SECRET_KEY = 'secretkey'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/* For production environment route to index.html */
if (dev) {

  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, '../build')));

  app.get('/'
    , (req, res) => {
      res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })

}

if (!dev) {

  app.use(morgan('dev'))

  
}


app.use(cors());
/* Allows all cors options */
app.options('*', cors());
/* Routes to APIs */
app.use('/api/proxy', Proxy)





/*Middleware to log API request or respond errors to AWS CloudWatch  */

//var response= tools.checkProxy()
//console.log(response);

setInterval(() => {
  console.log("request sent ");
  urls=['https://gimmeproxy.com/api/getProxy','https://api.getproxylist.com/proxy','http://pubproxy.com/api/proxy']
  urls.forEach(url => {
  fetch(url,{
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }

}).then(res=>res.json())
.then(respond=>{
    if (respond.data){
      console.log("pubproxy");
      data=respond.data
    ip=data[0].ip
    port=data[0].port
    last_checked=data[0].last_checked
    }
    else{
      console.log("others");
      data=respond
    ip=data.ip
    port=data.port
    }
    
    now = Date.now();
    now=dateFormat(now, "yyyy-mm-dd hh:MM:ss");

    var sql = "Insert into proxylist (ipAddress,port,createdAt,updatedAt,lastTestDate, url) Values  ('"+ip+"',"+port+",'"+now+"','"+now+"','"+now+"','"+url+"')"
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
                console.log("worked");
                
               // res.send({proxy:res.data})
            }
        })
    })
})
});
       
}, 600000);

/* Starts http server */
server.listen(PORT, err => {
  //if (err) throw err;

  console.log("Server started on "+ PORT)
})
/* Starts https server */
//httpsServer.listen(5030);

process.on('uncaughtException', err => {
  console.log(err);
})

process.on('SIGTERM', function () {
  server.close(function () {
    process.exit(0);
  });
});
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });

