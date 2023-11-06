const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Code Attribution
// Title: Express Brute
// Link: https://www.npmjs.com/package/express-brute
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 3,
    minWait: 1000 * 60 * 3, 
});

router.post('/signup', bruteforce.prevent, (req,res) =>
{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>
    {
        const user = new User(
        {
            username: req.body.username,
            password: hash,
            department : req.body.department
        });
        user.save()
        .then(result =>
        {
            res.status(201).json(
            {
                message: 'User created',
                result: result
            });
        })
        .catch(err =>
        {
            res.status(500).json(
            {
                error: err
            });
        });
    });
});

// Code Attribution
// The IIE. 2021. APDS7311 LAB GUIDE 2023. The Independent Institute of Education: Unpublished.
router.post('/login', bruteforce.prevent, (req,res) =>
{
    let fetchedUser;
    User.findOne({ username: req.body.username })
    .then(user =>
    {
        if(!user)
        {
            return res.status(401).json(
            {
                message: 'Auth failed'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result =>{
        if(!result)
        {
            return res.status(401).json(
            {
                message: 'Auth failed'
            });
        }
        const token = jwt.sign(
        {
            username: fetchedUser.username,
            department: fetchedUser.department
        }, 
        "secret_this_should_be_longer_than_it_is",
        {expiresIn: "1h"}
        );

        res.status(200).json(
        {
            token: token
        });
    })
    .catch(err =>
    {
        return res.status(401).json(
        {
            message: 'Auth failed'
        });
    });
});

module.exports = router;