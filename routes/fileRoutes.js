const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { File } = require('../models');
const path = require('path');
const fs = require('fs');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', authenticateUser,  async (req, res) => {
    try {
        const files = await File.findAll();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/upload', authenticateUser, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file found to upload' });
        }

        const { originalname, mimetype, size, path } = req.file;
        const file = await File.create({
            name: originalname,
            type: mimetype,
            size,
            path,
            userId: req.user.id
        });

        res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/download/:id', authenticateUser, async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if(file.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const filePath = path.join(__dirname, '..', file.path);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File does not exist on server' });
        }

        res.download(filePath, file.name); // Trigger download
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if(file.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Delete file from storage
        const filePath = path.join(__dirname, '..', file.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from DB
        await file.destroy();

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;