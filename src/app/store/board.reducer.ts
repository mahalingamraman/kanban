import { Board } from '../boards/models/board';
import { Actions, CREATE_BOARD, DELETE_BOARD } from './board.actions';

const initialState: Board = {
  id: '1',
  name: 'Andrien',
  active: true
};

export function BoradReducer(
  state: Board[] = [initialState],
  action: Actions) {

  switch (action.type) {
    case CREATE_BOARD:
      return [...state, action.payload];

    case DELETE_BOARD:
      return state.filter(({ id }) => id !== action.id);

    default:
      return state;
  }
}
