import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from "@angular/material/snack-bar"

import { AppComponent } from "./app.component";
import { GenerateComponent } from "./generate/generate.component";
import { FindComponent } from "./find/find.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GroupAssignationComponent } from "./group-assignation/group-assignation.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { GiftComponent } from "./gift/gift.component";
import { LandingComponent } from './components/landing/landing.component';
import { NameSelectionComponent } from './components/name-selection/name-selection.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { JoinComponent } from './components/join/join.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LiveRaffleComponent } from './components/live-raffle/live-raffle.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateComponent,
    FindComponent,
    GroupAssignationComponent,
    GiftComponent,
    LandingComponent,
    NameSelectionComponent,
    ShareLinkComponent,
    JoinComponent,
    CreateRoomComponent,
    LiveRaffleComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCardModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "landing",
        component: LandingComponent,
      },
      {
        path: "join",
        component: JoinComponent,
      },
      {
        path: "join/:room",
        component: JoinComponent,
      },
      {
        path: "raffle/:room",
        component: LiveRaffleComponent,
      },
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
        redirectTo: "landing",
        pathMatch: "full",
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
