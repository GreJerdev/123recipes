'use strict';

var express = require('express'),
    router = express.Router();


router.get('/', (req, res) => res.send('Hello World from recipe'))
router.post('/', (req, res) => res.send('Hello World from recipe'))
router.put('/', (req, res) => res.send('Hello World from recipe'))
router.delete('/', (req, res) => res.send('Hello World from recipe'))



module.exports = router;