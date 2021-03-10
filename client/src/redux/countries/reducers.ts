import { ActionTypes } from "../../types";

const initialState = {
  data: [] as Array<Object> | [],
  isLoading: false as boolean,
  error: null as string | null,
  currentLanguage: "en"
};

type InitialStateType = typeof initialState;

const posts = (
  state: InitialStateType = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "countries/REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "countries/SUCCESS": {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    }
    case "countries/SET_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case "countries/SET_LANGUAGE": {
      return {
        ...state,
        currentLanguage: action.payload.lang
      }
    }
    default:
      return state;
  }
};

export default posts;
