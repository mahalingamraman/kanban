import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardsListComponent } from './boards/boards-list/boards-list.component';
import { CreateBoardComponent } from './boards/create-board/create-board.component';
//import { BoardDetailsComponent } from './boards/board-details/customer-details.component';
const routes: Routes = [
  { path: 'boards', component: BoardsListComponent },
  { path: 'boards/create', component: CreateBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
