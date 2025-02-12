const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Enviar un mensaje
router.post('/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.json({ ok: true });
    } catch (error) {
        res.status(400).json({ ok: false, error: 'Could not send message' });
    }
});

// Obtener mensajes del usuario autenticado
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({ to: req.user._id });
        res.json({ ok: true, messages });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error getting messages' });
    }
});

// Eliminar un mensaje
router.delete('/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (error) {
        res.status(400).json({ ok: false, error: 'Could not delete message' });
    }
});

module.exports = router;
