import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { AppPipe, Format,OrderBy,FromDatePipe } from './app.pipe';
import { SortableComponent } from './sortable/sortable.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'challenge', component: ChallengeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChallengeComponent,
    AppPipe,
    Format,
    OrderBy,
    FromDatePipe,
    SortableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
