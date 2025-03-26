import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable, startWith } from "rxjs";
import { Asignacion } from "../models";
import { RifaService } from "../services/rifa.service";

@Component({
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"],
  providers: [RifaService],
})
export class FindComponent implements OnInit {
  assignacion: Asignacion[] = [];

  participantes: string[];

  item: Asignacion;

  myControl = new UntypedFormControl("");

  filteredOptions: Observable<string[]>;

  private readonly storageName = "ya";

  constructor(
    private activatedRoute: ActivatedRoute,
    private rifa: RifaService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      // TODO Unsubscribe
      .subscribe(({ list }) => {
        if (list) {
          const store = localStorage.getItem(this.storageName);
          this.assignacion = this.rifa.desencriptar(list);
          if (store) {
            this.descubrir(store);
          }
          console.log(this.assignacion);
          this.participantes = this.assignacion.map((a) => a.from);
        }
      });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      filter(() => !!this.participantes),
      map((value) => this._filter(value || ""))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (value.length < 3) {
      return [];
    }
    return this.participantes.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  descubrir(name) {
    const nombre = name.toLocaleLowerCase();
    const store = localStorage.getItem(this.storageName);
    if (store && store !== nombre) {
      return;
    }
    this.item = this.assignacion.find(
      (item) => item.from.toLocaleLowerCase() === nombre
    );
    if (this.item) {
      localStorage.setItem(
        this.storageName,
        this.item.from.toLocaleLowerCase()
      );
    }
  }
}
