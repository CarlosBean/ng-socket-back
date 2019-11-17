import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { connectedUsers } from "../sockets/socket";

const router = Router();

router.get("/messages", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Its OK"
  });
});

router.get("/messages/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    ok: true,
    message: "Its OK",
    data: id
  });
});

router.get("/users", (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any, clients: string[]) => {
    if (err) {
      return res.json({ ok: false, err });
    }

    res.json({ ok: true, clients });
  });
});

router.get("/users/detail", (req: Request, res: Response) => {
  res.json({ ok: true, clients: connectedUsers.getUsers() });
});

router.post("/messages", (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;

  const payload = { from, body };
  const server = Server.instance;

  server.io.emit("new-message", payload);

  res.json({
    ok: true,
    message: "message sent successfully",
    data: { from, body }
  });
});

router.post("/messages/:id", (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;

  const payload = { from, body };
  const server = Server.instance;

  server.io.in(id).emit("private-message", payload);

  res.json({
    ok: true,
    message: "message sent successfully",
    data: { id, from, body }
  });
});

export default router;
