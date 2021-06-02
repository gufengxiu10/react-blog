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
const INTE = "100";
type INTE = typeof INTE;
const count = 0;
const git = (
  state = {
    count: 0,
  },
  action: {
    type: any;
  }
): any => {
  switch (action.type) {
    case INTE:
      return state.count + 1;
    case "bai":
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default { time, git };
