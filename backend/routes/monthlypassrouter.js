const router = require("express").Router();
const { addPass } = require('../controllers/monthlypasscontroller.js');

//passAdd
router.post('/add', addPass);

module.exports = router;