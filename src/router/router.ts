import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Its OK'
    });
});

router.get('/messages/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        message: 'Its OK',
        data: id
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;

    res.json({
        ok: true,
        message: 'message sent successfully',
        data: { body, from }
    });
});

export default router;