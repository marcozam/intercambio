import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-gift",
  templateUrl: "./gift.component.html",
  styleUrls: ["./gift.component.scss"],
})
export class GiftComponent implements OnInit {
  width: number = 60;

  @Input()
  size: number = 50;

  @Input()
  color: string = "#ffc857";

  @Input()
  ribbonColor: string = "#db3a34";

  boxTop: {
    width: number;
    height: number;
  };

  ribbon: {
    width: number;
    height: number;
  };

  constructor() {}

  ngOnInit(): void {
    this.boxTop = {
      width: this.size * 1.4,
      height: this.size * 0.3,
    };
    this.ribbon = {
      width: this.size * 0.4,
      height: this.size * 0.2,
    };
    this.width = this.size * 1.2;
  }
}
