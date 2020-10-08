const proxy_check = require('proxycheck-node.js'); 
const check = new proxy_check({api_key: '1q1044-64767d-9mq027-58e033'}); 
const result = check.check('159.8.114.34',{port:8123}).then(result => console.log(result));
