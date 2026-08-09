const Router = require('express');
const userController = require('../controllers/userController.js');
const validationMiddleware = require('../middleware/validation.js');

const userRouter = new Router();

userRouter.post('/login',userController.signIn);
userRouter.post('/register', validationMiddleware,userController.signUp);
userRouter.put('/change-password',validationMiddleware,userController.changePassword);
userRouter.delete('/delete-user',userController.deleteUser);
userRouter.post('/logout',userController.logOut);

module.exports = userRouter;