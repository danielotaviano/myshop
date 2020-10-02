import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, name, password, password_confirmation } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      name,
      password,
      password_confirmation,
    });

    return res.json(user);
  }
}
