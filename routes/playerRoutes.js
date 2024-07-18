const express = require('express');
const router = express.Router();

// import all controllers below this only
const playerController = require('../controllers/playerController')


// write api's below this only
router.post('/register-player', playerController.registerPlayer);                              //api for register user


router.get('/test', async(req,res) => {
    res.send("hello from player router");
});



module.exports = router;