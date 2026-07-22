const Router = require('express');
const userController = require('../controllers/userController.js');

const router = new Router();

router.post('/signIn',userController.signIn);
router.post('/signUp',userController.signUp);
router.put('/changePassword',userController.changePassword);
router.delete('/deleteUser',userController.deleteUser);

module.exports = router;