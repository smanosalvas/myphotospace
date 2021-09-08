const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImageToGCPStorage, getAllImagesByUser } = require('../services/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fields: 1,
        fieldNameSize: 200,
        fileSize: 5000000
    },
    fileFilter: function (_req, file, cb) {
        checkFileFilter(file, cb);
    }
});

function checkFileFilter(file, cb) {
    console.log(file.mimetype)
    if(!file.mimetype.startsWith('image/')){
        cb(new Error('Please, send an image'));
    }
    cb(null, true);
}

router.get('/', async (req, res) => {
    try {
        res.status(200).send(await getAllImagesByUser());
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        await uploadImageToGCPStorage(req.file);
        res.status(200).send('upload a picture ' + req.body.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/search', (req, res) => {
    if(!req.query.q) {
        return res.status(500).send('Buscar por algun termino');
    }
    res.status(200).send('Query an image by: ' + req.query.q);
});

module.exports = router;
