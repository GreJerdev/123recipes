'use strict';

var express = require('express'),
    router = express.Router();


router.get('/list', (req, res) => res.send('Hello World from recipe'))
router.get('/', (req, res) => res.send('Hello World from recipe'))

router.post('/', (req, res) => res.send('Hello World from recipe'))
router.post('/add-items',(req, res) => res.send('Hello World from recipe'))
router.post('/remove-items',(req, res) => res.send('Hello World from recipe'))

router.put('/', (req, res) => res.send('Hello World from recipe'))
router.delete('/', (req, res) => res.send('Hello World from recipe'))



module.exports = router;