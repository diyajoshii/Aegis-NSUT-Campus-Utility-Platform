const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

const storage = multer.memoryStorage();
const upload = multer({ storage });

let gfs;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    gfs = Grid(db, mongoose.mongo);
  })
  .catch(err => console.error(err));

router.post('/', upload.single('file'), (req, res) => {
  const writestream = gfs.createWriteStream({
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  writestream.on('close', (file) => {
    res.json({ url: `/api/files/${file._id}` });
  });

  writestream.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });

  writestream.write(req.file.buffer);
  writestream.end();
});

module.exports = router;