const Router = require('express');
const userController = require('../controllers/userController.js');

const userRouter = new Router();

userRouter.post('/signIn',userController.signIn);
userRouter.post('/signUp',userController.signUp);
userRouter.put('/changePassword',userController.changePassword);
userRouter.delete('/deleteUser',userController.deleteUser);
userRouter.post('/logOut',userController.logOut);

module.exports = userRouter;