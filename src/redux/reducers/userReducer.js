import { ActionType } from "./../contents/actionType";

export const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setUser:
      return [...state, { ...payload }];
    default:
      return state;
  }
};
