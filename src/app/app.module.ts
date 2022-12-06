import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatListModule } from "@angular/material/list";

import { AppComponent } from "./app.component";
import { GenerateComponent } from "./generate/generate.component";
import { FindComponent } from "./find/find.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GroupAssignationComponent } from "./group-assignation/group-assignation.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { GiftComponent } from "./gift/gift.component";

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    FindComponent,
    GroupAssignationComponent,
    GiftComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    DragDropModule,
    FormsModule,
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
