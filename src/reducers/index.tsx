import { ModifyAction } from "@/actions";
import { DECREMENT, INCREMENT } from "@/constants";

const time = (state = 100, action: ModifyAction): number => {
  // console.log("time", action);
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

const git = (
  state = 100,
  action: {
    type: INTE;
  }
): any => {
  // console.log("git", action);

  switch (action.type) {
    case INTE:
      return state + 1;
    default:
      return state;
  }
};

export default { time, git };
