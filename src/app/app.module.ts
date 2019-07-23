import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatListModule, MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {AppReducer} from './store/app.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { DialogComponent } from './dialog/dialog.component';
import {FormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CustomerReducer } from './store/customer.reducer';
import { CustomerEffects } from './store/customer.effects';
import { AppRoutingModule } from './app-routing.module';
import { BoradReducer } from './store/board.reducer';

import { CreateBoardComponent } from './boards/create-board/create-board.component';
import { BoardsListComponent } from './boards/boards-list/boards-list.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    CreateBoardComponent,
    BoardsListComponent,
    BoardDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    // Material modules
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    AppRoutingModule,
    // Store
    StoreModule.forRoot({
      kanban: AppReducer,
      applicationState: CustomerReducer,
      board: BoradReducer
    }),
    EffectsModule.forRoot([CustomerEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent, DialogComponent]
})
export class AppModule { }
