const router = require('express').Router();

router.use('/api', require('./api'));
router.use((req,res) => res.send('<h1>Wrong Route!</h1>'));