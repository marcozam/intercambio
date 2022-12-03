import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";

import { AppComponent } from "./app.component";
import { GenerateComponent } from "./generate/generate.component";
import { FindComponent } from "./find/find.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, GenerateComponent, FindComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "generate",
        component: GenerateComponent,
      },
      {
        path: "find",
        component: FindComponent,
      },
      {
        path: "",
        redirectTo: "generate",
        pathMatch: "full",
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
