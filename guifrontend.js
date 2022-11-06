const express = require('express');
const path = require('path');
const port = 80;
const app = express();
app.set('view engine', 'ejs');
app.get("/", function(req, res1) {
    const http = require('http');
    let request = http.get('http://localhost:5000/getServerDate', (res) => {
        let data ='';
        if (res.statusCode !== 200) {
            console.error('Did not get an OK from the server.');
            res.resume();
            return;
        }
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('close', () => {
            console.log('Retrieved all data ' + data);
            res1.render("/opt/frontend/views/pages/index", {serverdate:data});
        });
    });
});
const webserver = app.listen(port, function() {
    console.log('GUI frontend is running on port ' + port);
});
