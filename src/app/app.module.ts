import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatCardModule } from '@angular/material/card';
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar"

import { AppComponent } from "./app.component";
import { GenerateComponent } from "./generate/generate.component";
import { FindComponent } from "./find/find.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GroupAssignationComponent } from "./group-assignation/group-assignation.component";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { GiftComponent } from "./gift/gift.component";
import { LandingComponent } from './components/landing/landing.component';
import { NameSelectionComponent } from './components/name-selection/name-selection.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { JoinComponent } from './components/join/join.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LiveRaffleComponent } from './components/live-raffle/live-raffle.component';
import { EmbarazoComponent } from './embarazo/embarazo.component';
import { TestComponent } from './test/test.component';
import { LocksComponent } from "./lock/locks/locks.component";
import { LockDetailsComponent } from "./lock/lock-details/lock-details.component";
import { LockModule } from "./lock/lock.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { OAuthInterceptor } from "src/auth/services";

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
    EmbarazoComponent,
    TestComponent,
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
    LockModule,
    RouterModule.forRoot([
      {
        path: "poc",
        component: EmbarazoComponent,
      },
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
        path: "lock",
        component: LocksComponent,
      },
      {
        path: "lock/:uuid",
        component: LockDetailsComponent,
      },
      {
        path: "",
        redirectTo: "landing",
        pathMatch: "full",
      },
      {
        path: "auth",
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
      }
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
