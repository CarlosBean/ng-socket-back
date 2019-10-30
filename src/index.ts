import Server from './classes/server';
import router from './router/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.init();

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', router);

server.start(() => {
    console.log(`Server running on port: ${server.port}`);
});