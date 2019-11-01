import { Socket, Server } from 'socket.io';
import { UserList } from '../classes/user-list'
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export function eventDataTime(): string {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} `;
}

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('disconnected client', eventDataTime());
        connectedUsers.deleteUser(client.id);
    });
}

export const message = (client: Socket, io: Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('message received: ', payload);
        io.emit('new-message', payload);
    });
}

export const configUser = (client: Socket) => {
    client.on('config-user', (payload: { name: string }, callback: any) => {
        connectedUsers.updateUser(client.id, payload.name);
        callback({
            ok: true,
            message: `user ${payload.name} configurated`
        })
    });
}

