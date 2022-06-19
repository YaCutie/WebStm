import {UserActions, userActionsType} from "./user.action";

export const USER_REDUCER_NODE = 'user';

export interface UserState {
  id: number;
}

const initialState: UserState = {
  id: 0,
}

export const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case userActionsType.login:
      return {
        ...state,
        id: action.payload.id
      }
    case userActionsType.load:
      return {
        ...action.payload.state
      }
    case userActionsType.logout:
      return {
        ...state,
        id: 0
      }
    default:
      return state
  }
}
