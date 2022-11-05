const router = require("express").Router();
const { addPass } = require('../controllers/weeklypasscontroller.js');

//passAdd
router.post('/add', addPass);

module.exports = router;