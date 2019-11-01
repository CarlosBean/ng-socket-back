import express from "express";
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.port = SERVER_PORT;
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        this.io.on('connection', client => {
            console.log('connected client   ', socket.eventDataTime());

            socket.connectClient(client);
            socket.configUser(client);
            socket.message(client, this.io);
            socket.disconnect(client);
        });
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}