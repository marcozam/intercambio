import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Asignacion, Grupo } from "../models";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { RifaService } from "../services/rifa.service";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-generate",
  templateUrl: "./generate.component.html",
  styleUrls: ["./generate.component.scss"],
  providers: [RifaService],
})
export class GenerateComponent implements OnInit {
  private readonly storageName = "participants";

  url: string;

  participantesLabel = "Participantes";

  participantes: string[] = [];

  numeroGrupos: number = 1;

  grupos: Grupo[] = [];

  @ViewChildren(".grupo") groupElements;

  @ViewChild("participantInput") participantInput: ElementRef<HTMLInputElement>;

  title = "intercambio";

  assignacion: Asignacion[] = [];

  constructor(private rifa: RifaService) {}

  ngOnInit(): void {
    const storage = sessionStorage.getItem(this.storageName);
    if (storage) {
      this.participantes = JSON.parse(storage);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  run() {
    this.assignacion = this.rifa.generate(this.participantes, this.grupos);
    const encryptedData = this.rifa.encriptar(this.assignacion);
    this.url = encodeURIComponent(encryptedData);
    navigator.clipboard.writeText(this.url);
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  nombreParticipanteCtrl = new FormControl();

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.participantes.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.nombreParticipanteCtrl.setValue(null);
    this.storeParticipantes();
  }

  remove(fruit: string): void {
    const index = this.participantes.indexOf(fruit);

    if (index >= 0) {
      this.participantes.splice(index, 1);
    }
    this.storeParticipantes();
  }

  storeParticipantes() {
    sessionStorage.setItem(
      this.storageName,
      JSON.stringify(this.participantes)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.participantes.push(event.option.viewValue);
    this.participantInput.nativeElement.value = "";
    this.nombreParticipanteCtrl.setValue(null);
  }

  familyCountChanged(familyCount: number) {
    this.numeroGrupos = familyCount;
    this.generateGroups();
  }

  private generateGroups() {
    this.grupos = Array.from({ length: this.numeroGrupos }, (v, i) => ({
      nombre: `Familia ${i + 1}`,
      participantes: [],
    }));
    this.grupos[0].participantes = [...this.participantes];
  }
}
