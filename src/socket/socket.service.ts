import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;

    console.log('Client connected: ', clientId);

    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });
  }

  sendDataToClients(data: string | any): void {
    this.socketGateway.sendMessageToAllClients(data);
  }
}
