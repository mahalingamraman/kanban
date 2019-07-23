import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../models/board';
import { Store } from '@ngrx/store';
import { BoardState } from '../../store/board.state';
import { DeleteBoard } from '../../store/board.actions';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  @Input() board: Board;

  constructor(private store: Store<BoardState>) { }

  ngOnInit() {
  }

  removeBoard(id) {
    this.store.dispatch(new DeleteBoard(id));
  }
}
