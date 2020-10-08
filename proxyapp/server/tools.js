var Http = require('http');
const { func } = require('prop-types');
const { permittedCrossDomainPolicies } = require('helmet');
module.exports={
    checkProxy: function(){
        var response=null
        var req = Http.request({
            host: '159.8.114.34',
            // proxy IP
            port: 8123,
            // proxy port
            method: 'GET',
            timeout:3000,
            path: 'https://www.vanamco.com/ghostlab/' // full URL as path
            }, function (res) {
                res.on('data', function (data) {
                    req.end();
                    return "worked"
                //console.log(data.toString());
                    
            });
            
        });
        req.on('error', function(error){
            console.log(error)
            req.end();
            return "error occured"
        })  
        req.setTimeout(3000, function() {
           req.end()
           
          });

        
    }

}




