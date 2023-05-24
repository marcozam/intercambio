import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { SocketService } from 'src/app/services';

@Component({
  selector: 'app-live-raffle',
  templateUrl: './live-raffle.component.html',
  styleUrls: ['./live-raffle.component.scss']
})
export class LiveRaffleComponent implements OnInit {

  roomUuid: string;

  constructor(private socket: SocketService, private route: ActivatedRoute) { }

  room$ = this.socket.room$.pipe(
    filter(r => !!r)
  );

  participants$ = this.room$.pipe(
    map(r => r.participants)
  );

  ngOnInit(): void {
    // TODO: Destroy
    this.route.params.subscribe(({room}) => {
      console.log(`Joining raffle: ${room}`);
      this.roomUuid = room;
    })
  }

  joinRoom(name: string) {
    this.socket.joinRoom(this.roomUuid, name);
  }
}
