import CreateSessionService from '@modules/user/services/CreateSessionService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const token = await createSession.execute({ email, password });

    return res.json({ token });
  }
}
