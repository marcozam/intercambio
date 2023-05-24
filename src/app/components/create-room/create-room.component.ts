import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  constructor(private socket: SocketService, private router: Router) { }

  ngOnInit(): void {
  }

  createRoom(name: string) {
    const roomUuid = this.socket.createRoom(name);
    this.router.navigate(['raffle', roomUuid]);
  }

}
