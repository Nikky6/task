const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    const token = authHeader.replace('Bearer ', '').trim();    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};




module.exports = { authenticate }