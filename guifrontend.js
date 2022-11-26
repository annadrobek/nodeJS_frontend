const express = require('express');
const path = require('path');
const port = 80;
const app = express();
app.use(express.static('views/pages'))
app.set('view engine', 'ejs');
app.get("/docs", function(req, res) {res.render("pages/docs", {});});
app.get("/getSampleText4Tests", function(req, res1) 
        {
    const http = require('http');
    let request = http.get('http://localhost:5000/getSampleText4Tests', (res) => {
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
            console.log('Sample text: ' + data);
            res1.write(JSON.stringify(data));
        });
    });   
app.get("/", function(req, res1) {{
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
            var frontenddate = returnDate();
            console.log('Frontend date: ' + frontenddate);
            console.log('Backend date: ' + data);
            res1.render("pages/index", {serverdate:data, frontenddate: frontenddate});
        });
    });
});
function returnDate() {
let date_ob = new Date();
var miliseconds = date_ob.getMilliseconds()
var miliseconds = date_ob.getMilliseconds()
if (miliseconds <= 9) {
miliseconds = '00' + miliseconds
};
if (miliseconds <= 99 && miliseconds >= 10) {
miliseconds = '0' + miliseconds
};
var seconds = date_ob.getSeconds();
if (seconds <= 9) {
seconds = '0'+seconds;
};
var minutes = date_ob.getMinutes();
if (minutes <= 9) {
minutes = '0'+minutes;
};
var hour = date_ob.getHours();
if (hour <= 9) {
hour = '0'+hour;
};
var year = date_ob.getFullYear();
var month = date_ob.getMonth()+1;
if (month <= 9) {
month = '0'+month;
};
var day = date_ob.getDate();
if (day <= 9) {
day = '0'+day;
};
return day+'.'+month+'.'+year+' '+hour+':'+minutes+":"+seconds+":"+miliseconds;
}
const webserver = app.listen(port, function() {
    console.log('GUI frontend is running on port ' + port);
});
