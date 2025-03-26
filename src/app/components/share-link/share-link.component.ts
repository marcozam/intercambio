import { Component, Input, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {

  url: string;

  @Input() label: string = 'Compartir codigo';

  @Input() section: string = 'join';

  @Input() code: string;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.url = `${environment.siteUrl}/${this.section}/${this.code}`;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.url);
    this.snackBar.open('Link copiado!', 'OK', { duration: 2000 })
  }

}
