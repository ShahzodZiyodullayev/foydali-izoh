import { ActionType } from "../contents/actionType";

export const setUser = (data) => {
  return {
    type: ActionType.setUser,
    payload: data,
  };
};
