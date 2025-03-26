import { Component, inject, OnInit } from '@angular/core';
import { LockService } from '../lock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locks',
  templateUrl: './locks.component.html',
  styleUrls: ['./locks.component.scss']
})
export class LocksComponent implements OnInit {

  lockService: LockService = inject(LockService);
  locks$: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    console.log('something');
    this.locks$ = this.lockService.getList();
  }

}
