import { Router } from 'express';
import UserController from '../controllers/UserController';

const createUserRouter = Router();

const userController = new UserController();

createUserRouter.post('/create-user', userController.create);

export default createUserRouter;
