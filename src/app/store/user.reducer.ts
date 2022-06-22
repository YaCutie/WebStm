import {UserActions, userActionsType} from "./user.action";

export const USER_REDUCER_NODE = 'user';

export interface UserState {
  id: number;
  token: string;
}

const initialState: UserState = {
  id: 0,
  token: ""
}

export const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case userActionsType.login:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token
      }
    case userActionsType.load:
      return {
        ...action.payload.state
      }
    case userActionsType.logout:
      return {
        ...state,
        id: 0,
        token: ""
      }
    default:
      return state
  }
}
