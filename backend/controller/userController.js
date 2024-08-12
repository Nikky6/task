const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        if (result.length > 0) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already Registered' });
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const userId = result.insertId;
                db.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({
                        user: rows[0],
                        message: 'User registered successfully'
                    });
                });
            });
        });
    });
};


const loginUser = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
         if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
        if (result.length === 0) {
            console.log('Invalid Credentials!');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    });
};


const getAllUsers = (req,res)=>{
    db.query('SELECT * FROM users',(err,result)=>{
        if(err){
            return res.ststus(404).json({message: 'not found'})
        }
        res.status(200).json(result);
    })
}


const getUser = (req, res) => {
    const userId = req.user.id;
    db.query('SELECT  email, name FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result[0]);
    });
};


const updateUser = (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.json({ message: 'Profile updated successfully' });
    });
};


module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    getAllUsers
}