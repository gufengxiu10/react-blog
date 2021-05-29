import { DECREMENT, INCREMENT } from "@/constants";

export interface IINCREMENTAction {
  type: INCREMENT;
}

export interface IDECREMENT {
  type: DECREMENT;
}

export type ModifyAction = IINCREMENTAction | IDECREMENT;

export const increment = (id: number): any => ({
  type: INCREMENT,
});

export const decrement = (): IDECREMENT => ({
  type: DECREMENT,
});
