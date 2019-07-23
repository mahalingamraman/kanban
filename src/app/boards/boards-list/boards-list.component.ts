import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Board } from '../models/board';
import { BoardState } from '../../store/board.state';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  boards: Observable<Board[]>;

  constructor(private store: Store<BoardState>) {
    this.boards = store.select('board');
  }

  ngOnInit() {
  }

}
