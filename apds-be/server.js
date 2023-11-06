// Code Attribution
// The IIE. 2021. APDS7311 LAB GUIDE 2023. The Independent Institute of Education: Unpublished.
const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000;

const server = http.createServer({
    key: fs.readFileSync('certification/privatekey.pem'),
    cert: fs.readFileSync('certification/certificate.pem')
}, app);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
