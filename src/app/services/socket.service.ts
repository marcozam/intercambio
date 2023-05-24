import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Socket, io } from 'socket.io-client';
import { UtilitiesService } from "./utilities";
import { DeviceService } from "./device.service";

// TODO: Move to its own file
interface Room {
  uuid: string;
  name?: string;
  participants: RoomParticipant[];
}

interface RoomParticipant {
  device: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SocketService {

  socket: Socket;

  private _room$: BehaviorSubject<Room> = new BehaviorSubject(null);

  get room$() {
    return this._room$.asObservable();
  }

  constructor(private utilities: UtilitiesService, private device: DeviceService) {
    this.setupConnection();
  }

  setupConnection() {
    const device = this.device.getDeviceKey();
    this.socket = io('http://localhost:3000', { auth: { device } });
    this.socket.on('report-response', (data: string) => {
      console.log(data);
    });
    this.socket.on('room-change', room => {
      console.log('Room updated', room);
      this._room$.next(room);
    })
  }

  request() {
    this.socket.emit('report-request', { PRCI: 'XXXX', pageSize: 500 });
  }

  createRoom(creator: string): string {
    const roomUuid = this.utilities.uuidv4();
    const device = this.device.getDeviceKey();
    this.socket.emit('create-room', { roomUuid, creator });
    this._room$.next({
      uuid: roomUuid,
      name: 'TBD',
      participants: [{
        device,
        name: creator, 
      }],
    })
    return roomUuid;
  }

  joinRoom(roomUuid: string, name: string): void {
    this.socket.emit('join-room', { roomUuid, name });
  }
}
