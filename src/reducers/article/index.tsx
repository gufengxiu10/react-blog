import { detail as detailInterface } from "@/types/article";

const detail: any = {
  info: {},
};

export default {
  article: (state: any = detail, action: any) => {
    switch (action.type) {
      case "biii":
        return action.payload.data;
      case "te":
        return 100;
      case "INFO":
        const info: any = {};
        info[action.id] = action.data;
        console.log(Object.assign({}, detail, { info }));
        return Object.assign({}, detail.info, action.data);
      case "changeField":
        console.log(state);
        const st: any = {};
        st[action.field] = action.value;
        return Object.assign({}, state, st);
    }
    return state;
  },
};
