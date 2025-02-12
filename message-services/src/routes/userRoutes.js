const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('crypto');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.createHash('sha256').update(req.body.password).digest('hex');
        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            image: req.body.image
        });
        await newUser.save();
        res.json({ ok: true });
    } catch (error) {
        res.status(400).json({ ok: false, error: 'User couldn\'t be registered' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        const hashedPassword = bcrypt.createHash('sha256').update(req.body.password).digest('hex');
        if (!user || user.password !== hashedPassword) {
            return res.status(401).json({ ok: false, error: 'User or password incorrect' });
        }
        const token = jwt.sign({ _id: user._id, name: user.name }, 'secretkey');
        res.json({ ok: true, token, name: user.name, image: user.image });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Server error' });
    }
});

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ ok: true, users });
});

module.exports = router;


