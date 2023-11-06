require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require("helmet");

const prefix = '/api';

const fs = require("fs");
// Get SSL certificate
const certificate = fs.readFileSync("certification/certificate.pem");
const options = { server: { sslCA: certificate } };

const mongoose = require('mongoose');
const dbUrl = process.env.DATABASE_URL;

// Connect to database
mongoose.connect(dbUrl)
.then(() => 
{
    console.log('Connected to database')
})
.catch((err) => 
{
    console.log(err)
}, options);

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.json());

app.use(helmet());

// CORS
// Code Attribution
// The IIE. 2021. APDS7311 LAB GUIDE 2023. The Independent Institute of Education: Unpublished.
app.use((reg,res,next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

const userRouter = require('./routes/users');
app.use(prefix + '/users', userRouter);

const postRouter = require('./routes/posts');
app.use(prefix + '/posts', postRouter);

module.exports = app;