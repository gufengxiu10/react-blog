import { DECREMENT, INCREMENT } from "@/constants";

export interface IINCREMENTAction {
  type: INCREMENT;
}

console.log(INCREMENT);

export interface IDECREMENT {
  type: DECREMENT;
}

export type ModifyAction = IINCREMENTAction | IDECREMENT;

export const increment = (): IINCREMENTAction => ({
  type: INCREMENT,
});

export const decrement = (): IDECREMENT => ({
  type: DECREMENT,
});

