const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth')
const { validationMiddleware } = require('../middleware/validators-middleware');
const { userAuth } = require('../middleware/auth-middleware');


const { registerValidation , loginValidation } = require('../validators/auth');
const router = Router();

// router.get('/', (req, res) => {
//    return res.send('Auth route');
// });


// console.log(register);
// console.log(registerValidation);

router.get("/get-users", getUsers)
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware , register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);



module.exports = router;