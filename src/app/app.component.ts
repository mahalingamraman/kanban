///<reference path="store/app.actions.ts"/>
import { Component, OnInit } from '@angular/core';
import { Item } from './store/item.model';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';
import { getBacklog, getDoing, getDone, getEntities } from './store/app.selectors';
import {
  ADD_BACKLOG, ADD_DOING, ADD_DONE, CREATE_ITEM, CreateItem, default as PayloadAction, REM_BACKLOG, REM_DOING,
  REM_DONE
} from './store/app.actions';
import * as CustomerActions from './store/customer.actions';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { animate, style, transition, trigger } from '@angular/animations';
import { CustomerState } from './store/customer.state';
import { Customer } from './store/customer.modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: '0', transform: 'rotate(-5deg)' }),
        animate('.5s ease-out', style({ opacity: '1', transform: 'rotate(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: '1', transform: 'rotate(0)' }),
        animate('.2s ease-out', style({ opacity: '0', transform: 'rotate(5deg)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {

  currentCardNum = 0;
  customers$: Observable<any>;
  customers: Customer[];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    console.log('########################');
    console.log(this.store.select('applicationState'));
    console.log('########################');
    this.customers$ = this.store.select('applicationState');
  }

  ngOnInit() {
    this.getCustomers();
    this.customers$.subscribe((state: CustomerState) => this.customers = state.customers);
  }

  getCustomers() {
    this.store.dispatch(new CustomerActions.loadCustomersAction());
    console.log('########################');
    console.log(this.store.select('applicationState'));
    console.log('########################');
  }
  createItem(text: string) {
    const card = {
      id: this.currentCardNum++,
      text: text
    };
    const createItemAction: PayloadAction<Item> = {
      type: CREATE_ITEM,
      payload: card
    };
    this.store.dispatch(createItemAction);
    this.moveToBacklog(card.id);
    return card;
  }

  moveToBacklog(id: number) {
    const addBacklog: PayloadAction<number> = { type: ADD_BACKLOG, payload: id };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(addBacklog);
    this.store.dispatch(remDoing);
    this.store.dispatch(remDone);
  }

  moveToDoing(id: number) {
    const remBacklog: PayloadAction<number> = { type: REM_BACKLOG, payload: id };
    const addDoing: PayloadAction<number> = { type: ADD_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(remBacklog);
    this.store.dispatch(addDoing);
    this.store.dispatch(remDone);
  }

  moveToDone(id: number) {
    const remBacklog: PayloadAction<number> = { type: REM_BACKLOG, payload: id };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const addDone: PayloadAction<number> = { type: ADD_DONE, payload: id };
    this.store.dispatch(remBacklog);
    this.store.dispatch(remDoing);
    this.store.dispatch(addDone);
  }


  /**
   * Dialog
   */

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { text: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result !== '') {
        this.createItem(result);
      }
    });
  }

}
