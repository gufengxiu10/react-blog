import { detail as detailInterface } from "@/types/article";

const detail: detailInterface = {};

export default {
  article: (state: detailInterface = detail, action: any) => {
    switch (action.type) {
      case "biii":
        return action.payload.data;
      case "te":
        return 100;
    }
    return state;
  },
};
