import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Consultas } from '../poc';

@Component({
  selector: 'app-embarazo',
  templateUrl: './embarazo.component.html',
  styleUrls: ['./embarazo.component.scss']
})
export class EmbarazoComponent implements OnInit {

  semanasEmbarazoCtrl = new UntypedFormControl();

  consulta: any;

  constructor() { }

  ngOnInit(): void {
    this.semanasEmbarazoCtrl.valueChanges.subscribe(value => {
      const consultas = Consultas.filter(c => c.inicio <= value && c.fin >= value);
      this.consulta = consultas.length > 0 ? consultas[0] : null;
    });
  }

}
