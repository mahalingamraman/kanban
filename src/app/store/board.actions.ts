import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Board } from '../boards/models/board';

export const CREATE_BOARD = 'Board_Create';
export const DELETE_BOARD = 'Board_Delete';

export class CreateBoard implements Action {
    readonly type = CREATE_BOARD;

    constructor(public payload: Board) { }
}

export class DeleteBoard implements Action {
    readonly type = DELETE_BOARD;

    constructor(public id: string) { }
}

export type Actions = CreateBoard | DeleteBoard;
