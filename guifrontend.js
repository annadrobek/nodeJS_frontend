const express = require('express');
const path = require('path');
const port = 80;
const app = express();
app.use(express.static('views/pages'))
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
 let date_ob = new Date();
            var miliseconds = date_ob.getMilliseconds()
            if (miliseconds <= 9) {
                miliseconds = '00' + miliseconds
            };
            if (miliseconds <= 99 && miliseconds >= 10) {
                miliseconds = '0' + miliseconds
            };
            var seconds = date_ob.getSeconds();
            if (seconds <= 9) {
                seconds = '0' + seconds;
            }
            var minutes = date_ob.getMinutes();
            if (minutes <= 9) {
                minutes = '0' + minutes;
            }
            var hour = date_ob.getHours();
            if (hour <= 9) {
                hour = '0' + hour;
            }
            var year = date_ob.getFullYear();
            var month = date_ob.getMonth() + 1;
            if (month <= 9) {
                month = '0' + month;
            }
            var day = date_ob.getDate();
            if (day <= 9) {
                day = '0' + day;
            }
            var data1 = day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ":" + seconds + ":" + miliseconds;
            console.log('Clientdate ' + data1);
            console.log('Retrieved all data ' + data);
            res1.render("pages/index", {serverdate:data, frontenddate: data1});
        });
    });
});
const webserver = app.listen(port, function() {
    console.log('GUI frontend is running on port ' + port);
});
