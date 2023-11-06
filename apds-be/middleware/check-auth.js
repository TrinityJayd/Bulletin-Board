// Code Attribution
// The IIE. 2021. APDS7311 LAB GUIDE 2023. The Independent Institute of Education: Unpublished.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => 
{
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_this_should_be_longer_than_it_is");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};