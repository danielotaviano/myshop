import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import UserController from '../controllers/UserController';

const createUserRouter = Router();

const userController = new UserController();
const sessionController = new SessionController();

createUserRouter.post('/create-user', userController.create);
createUserRouter.post('/create-session', sessionController.create);

export default createUserRouter;
