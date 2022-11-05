const router = require("express").Router();
const userauth = require('../middleware/userauth');
const { usersignup, usersignin, userUpdate, fetchOne} = require('../controllers/usercontroller.js');
// const { forgotPassword, resetPassword, fetchAll, fetchOne} = require('../controllers/usercontroller.js')

//user sign up
router.post('/signup', usersignup);

//user sign in
router.post('/signin', usersignin);

//user update profile
router.put('/update/:id', userUpdate);

//find one user
router.get('/:id', fetchOne);

//user forgotPassword
// router.post('/forgotpassword', forgotPassword);

//user resetPassword
// router.put('/resetpassword/:resetPasswordToken', resetPassword);

module.exports = router;