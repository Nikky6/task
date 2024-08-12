const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/database');
const router = require('./routes/userRoutes');
const cors = require('cors')
dotenv.config();





app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(cors())
app.use(express.json());
app.use('/api', router)


const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

