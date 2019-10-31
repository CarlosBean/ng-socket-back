import { Socket, Server } from 'socket.io';

export function eventDataTime(): string {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} `;
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('disconnected client', eventDataTime());
    });
}

export const message = (client: Socket, io: Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('message received: ', payload);
        io.emit('new-message', payload);
    });
}

