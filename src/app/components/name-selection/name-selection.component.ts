import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-name-selection',
  templateUrl: './name-selection.component.html',
  styleUrls: ['./name-selection.component.scss']
})
export class NameSelectionComponent implements OnInit {

  private readonly storageName: string = 'selectedName';

  name: string;

  @Input() label: string = '¿Cual es tu nombre?';

  @Input() actionLabel: string;

  @Output() readonly action: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.restoreName();
  }

  emit() {
    if (this.name) {
      this.action.emit(this.name);
      this.saveName();
    }
  }

  restoreName() {
    const storedName = sessionStorage.getItem(this.storageName);
    if (storedName) {
      this.name = storedName;
    }
  }

  saveName() {
    sessionStorage.setItem(this.storageName, this.name);
  }
}
