'use strict';

var express = require('express'),
    router = express.Router();


router.get('/', (req, res) => res.send('Hello World from authentication'))
router.post('/', (req, res) => res.send('Hello World from authentication'))
router.put('/', (req, res) => res.send('Hello World from authentication'))
router.delete('/', (req, res) => res.send('Hello World from authentication'))


module.exports = router;