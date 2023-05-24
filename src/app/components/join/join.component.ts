import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  roomUuid: string;

  constructor(private route: ActivatedRoute, private socket: SocketService) { }

  ngOnInit(): void {
    // TODO: Destroy
    this.route.params.subscribe(({room}) => {
      console.log(`Ready to join room: ${room}`);
      this.roomUuid = room;
    })
  }

  joinRoom(name: string) {
    console.log(`Joining room: ${this.roomUuid}`);
    this.socket.joinRoom(this.roomUuid, name);
  }

}
