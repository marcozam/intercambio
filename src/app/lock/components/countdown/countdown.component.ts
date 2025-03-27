import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { interval, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

interface countDownUnits {
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnDestroy, OnChanges {
private destroy$ = new Subject<void>();
countDown$: Observable<number>;
formatedCountDown$: Observable<countDownUnits>;

@Input() seconds: number;
@Input() expiration: Date;


ngOnChanges(changes: SimpleChanges) {
  const { seconds, expiration } = changes;
  if(seconds) {
    this.startCountdown(this.seconds);
  }
  if(expiration) {
    const sec: number = Math.floor((this.expiration.getTime() - new Date().getTime()) / 1000);
    this.startCountdown(sec);
  }
}

private formatTime(seconds: number): countDownUnits {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return { minutes, seconds: sec };
}

startCountdown(seconds: number) {
  // TODO: Reset existing timer
  let countdown = seconds - 1;
  this.countDown$ = interval(1000).pipe(
    startWith(seconds),
    takeUntil(this.destroy$),
    map(() => {
      if (countdown < 0) {
        // TODO: Reset the code
        this.destroy$.next();
      }

      return countdown--;
    }));
    this.formatedCountDown$ = this.countDown$.pipe(map(s => this.formatTime(s)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
