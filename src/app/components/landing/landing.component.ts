import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  roomUuid: string;

  constructor(private socket: SocketService) { }

  ngOnInit(): void {
  }

  createRoom(name: string) {
    this.roomUuid = this.socket.createRoom(name);
  }

}
