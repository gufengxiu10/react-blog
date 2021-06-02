import axios from "axios";

const ku = (dispatch: any) => {
  return dispatch({
    type: "te",
  });
};

const list = () => {
  return async (dispatch: any) => {
    const result = await axios.get("/article");
    return dispatch({
      type: "biii",
      payload: result,
    });
  };
};

export default { list };
