import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
    res.send('Hello form student!');
}