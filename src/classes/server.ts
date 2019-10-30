import express from "express";
import { SERVER_PORT } from '../global/environment';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.port = SERVER_PORT;
        this.app = express();
    }

    static init() {
        return new Server();
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}