import { ModifyAction } from "@/actions";
import { DECREMENT, INCREMENT } from "@/constants";

const time = (state = 100, action: ModifyAction): number => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const git = (state = 100, action: any): any => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default { time, git };
