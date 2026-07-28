const Router = require('express');
const userController = require('../controllers/userController.js');

const userRouter = new Router();

userRouter.post('/login',userController.signIn);
userRouter.post('/register',userController.signUp);
userRouter.put('/changePassword',userController.changePassword);
userRouter.delete('/deleteUser',userController.deleteUser);
userRouter.post('/logout',userController.logOut);

module.exports = userRouter;