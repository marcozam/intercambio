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
import { JSEncrypt } from "jsencrypt";
import { Grupo } from "../models";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-generate",
  templateUrl: "./generate.component.html",
  styleUrls: ["./generate.component.scss"],
})
export class GenerateComponent implements OnInit {
  list = [
    ["Jaime Antonio", "Lupita"],
    ["Yesenia", "Carlos"],
    ["Yamileth", "Mia", "Marco Jr", "Marco"],
    ["Loreni", "Israel", "Israel Jr", "Mary"],
    ["Chelita", "Julian", "Julian Antonio", "Zumey", "Yuliana"],
    ["Tia Lolita", "Toñito"],
    ["Chava"],
  ];

  participantesLabel = "Participantes";

  participantes: string[] = this.list.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );

  numeroGrupos: number = 1;

  grupos: Grupo[] = [];

  @ViewChildren(".grupo") groupElements;

  @ViewChild("participantInput") participantInput: ElementRef<HTMLInputElement>;

  busqueda = false;
  generar = !!localStorage.getItem("generar");
  title = "intercambio";
  db =
    "Am6F5nsLESo0ZibZ2Jzd9kJs5p8h0Jc+88tdq/mwuzF+GxeUqGb/auEDwcGbqMah7eFiv64fbfw4hXAYc09h+qpEUBQqpPlZ5NXrNUG+7FA8TFSw4LDOCHRmj6YuhbdTB+GVXJ75O4DalNu9DX5OzFRjXGK+0RJUwZ+rT7mJp2o=#####BDW4qU+ENNfPEULOv1he4pgvBe3frIPg//41R5APGmuX5I03aZYaK4rwXzRn2Bin4KVrhV+M1RJYLbNrQbcIQsYfAeo4gv6xkyWYQDJSdx8HYeieeR8W5BYZRioK0dDpV0112XpcyXu8IySOkQRDD2LnQkjxf8e5T6+NmgyDbWM=#####0kg34nklNxli2IrOPw1U0tJEBNXPTXd+ElPryDWMN35UfSW9kFwMKsGPvMELEjK0s8xqCZ/ktBph7v+sw0j4rpzq1Lqk+hWeXWQKFO9RNJ83oBpAxQK3GF14UabpLX5jqPifb/QlT+ZQ+OKH0zG5ONfe6z9fAZPQo90pWIBWQuM=#####TBChi6cA2OKuhqgUTlDRr/QS3mKdcSZu12F7MjPOzsNTKYLfbooUYm8RnLtjQJ/6BdqsCwrAl8D20qp1kgbXEDBEQRaTEi+sopV3kYW9TsxIQgIkgh5TMaRwaQwOXhMknlqvwR9vLNVAlthlHxrMTeyrY9Q0gwNev/ZtWi4CwiY=";
  assignacion = [];
  item: { from: string; to: string };

  ngOnInit(): void {
    if (this.db) {
      this.desencriptar();
    }
    this.generateGroups();
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

  hasDuplicates(lista: { from: string; to: string }[]): boolean {
    return !!lista.find((item) => item.to === item.from);
  }

  run() {
    this.assignacion = this.generate();
    this.encriptar();
  }

  desencriptar() {
    const items = this.db
      .split("#####")
      .map((row) => this.encrypt(row, true))
      .join(";");
    this.assignacion = items.split(";").map((item) => {
      const [from, to] = item.split("-");
      return { from, to };
    });
  }

  encriptar() {
    const a = [...this.assignacion];
    const chunk = [];
    while (a.length > 0) {
      chunk.push(a.splice(0, 5));
    }
    const aStr = chunk
      .map((c) =>
        this.encrypt(c.map(({ from, to }) => from + "-" + to).join(";"))
      )
      .join("#####");
    console.log(aStr);
  }

  encrypt(value: string, encrypted = false) {
    const enc = new JSEncrypt();
    const pubKey = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB-----END PUBLIC KEY-----`;
    const priKey = `-----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
    WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
    aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
    AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
    xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
    m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
    8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
    z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
    rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
    V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
    aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
    psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
    uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
    -----END RSA PRIVATE KEY-----`;
    encrypted ? enc.setPrivateKey(priKey) : enc.setPublicKey(pubKey);
    return encrypted ? enc.decrypt(value) : enc.encrypt(value);
  }

  generate(): { from: string; to: string }[] {
    const assignacion = [];
    const flatSingle = (arr) => [].concat(...arr);
    let papelitos = flatSingle(this.list);
    this.list.forEach((grupo, idx) => {
      grupo.forEach((name) => {
        const exPapelitos = papelitos.filter((p) => !grupo.includes(p));
        const to = this.getRandomName(name, exPapelitos);
        assignacion.push({ from: name, to });
        papelitos = papelitos.filter((n) => n !== to);
      });
    });
    if (this.hasDuplicates(assignacion)) {
      return this.generate();
    }
    return assignacion;
  }

  getRandomName(name: string, lista: string[]) {
    if (lista.length === 1) {
      return lista[0];
    }
    const rdm = this.getRandom(lista.length);
    const rdmName = lista[rdm];
    if (name === rdmName) {
      return this.getRandomName(name, lista);
    }
    return rdmName;
  }

  getRandom(length: number) {
    return Math.floor(Math.random() * length);
  }

  descubrir(name) {
    const nombre = name.toLocaleLowerCase();
    const store = localStorage.getItem("ya");
    if (store && store !== nombre) {
      return;
    }
    this.busqueda = true;
    this.item = this.assignacion.find(
      (item) => item.from.toLocaleLowerCase() === nombre
    );
    if (this.item) {
      localStorage.setItem("ya", this.item.from.toLocaleLowerCase());
    }
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
  }

  remove(fruit: string): void {
    const index = this.participantes.indexOf(fruit);

    if (index >= 0) {
      this.participantes.splice(index, 1);
    }
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
