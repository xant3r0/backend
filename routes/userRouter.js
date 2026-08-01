const Router = require('express');
const userController = require('../controllers/userController.js');

const userRouter = new Router();

userRouter.post('/login',userController.signIn);
userRouter.post('/register',userController.signUp);
userRouter.put('/change-password',userController.changePassword);
userRouter.delete('/delete-user',userController.deleteUser);
userRouter.post('/logout',userController.logOut);

module.exports = userRouter;