import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GenerateComponent } from './generate/generate.component';
import { FindComponent } from './find/find.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'generate',
        component: GenerateComponent
      },
      {
        path: 'find',
        component: FindComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
