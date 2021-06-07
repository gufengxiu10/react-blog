import axios from "axios";
import { Dispatch } from "redux";
import { normalize, schema } from "normalizr";
const article = new schema.Entity("articles");
const check = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "te",
    });
  };
};

const info = (id: number) => {
  return async (dispatch: Dispatch, ownProps: any) => {
    const result = await axios.get("/article/" + id);
    dispatch({
      type: "INFO",
      data: result.data,
      id: id,
    });
  };
};

const changeField = (field: string, value: any) => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: "changeField",
      field: field,
      value: value,
    });
};

export default { Info: info };
