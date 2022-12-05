import { Injectable } from "@angular/core";
import { JSEncrypt } from "jsencrypt";
import { Asignacion, Grupo } from "../models";

@Injectable()
export class RifaService {
  encriptar(asignacion: Asignacion[]): string {
    const a = [...asignacion];
    const chunk = [];
    while (a.length > 0) {
      chunk.push(a.splice(0, 5));
    }
    const aStr = chunk
      .map((c) =>
        this.encrypt(c.map(({ from, to }) => from + "-" + to).join(";"))
      )
      .join("#####");
    return aStr;
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

  generate(participantes: string[], grupos?: Grupo[]): Asignacion[] {
    const assignacion = [];
    let papelitos = participantes;
    const fnAssignacion = (name: string, source: string[]) => {
      const to = this.getRandomName(name, source);
      assignacion.push({ from: name, to });
      papelitos = papelitos.filter((n) => n !== to);
    };
    if (!grupos || grupos.length <= 1) {
      participantes.forEach((name) => fnAssignacion(name, papelitos));
    } else {
      grupos.forEach((grupo, idx) => {
        grupo.participantes.forEach((name) => {
          const exPapelitos = papelitos.filter(
            (p) => !grupo.participantes.includes(p)
          );
          fnAssignacion(name, exPapelitos);
        });
      });
    }
    if (this.hasDuplicates(assignacion)) {
      return this.generate(participantes, grupos);
    }
    return assignacion;
  }

  desencriptar(list: string): Asignacion[] {
    const items = list
      .split("#####")
      .map((row) => this.encrypt(row, true))
      .join(";");
    return items.split(";").map((item) => {
      const [from, to] = item.split("-");
      return { from, to };
    });
  }

  getRandomName(name: string, lista: string[]): string {
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

  getRandom(length: number): number {
    return Math.floor(Math.random() * length);
  }

  hasDuplicates(lista: { from: string; to: string }[]): boolean {
    return !!lista.find((item) => item.to === item.from);
  }
}
