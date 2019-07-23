import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardState } from '../../store/board.state';
import { CreateBoard } from '../../store/board.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  constructor(private store: Store<BoardState>, private router: Router) { }

  ngOnInit() {
  }

  saveBoard(id, name) {
    this.store.dispatch(new CreateBoard(
      {
        id: id,
        name: name,
        active: false
      }
    ));
    this.router.navigate(['boards']);
  }
}
