import { STARTFETCHING, ENDFETCHING, ADDOPPORTUNITIES, TEST, END, SELECTOPPORTUNITY } from "../actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case TEST:
      return { ...state, count: state.count + 1 };
    case STARTFETCHING:
      return { ...state, fetching: true };
    case ENDFETCHING:
      return { ...state, fetching: false };
    case ADDOPPORTUNITIES:
      return { ...state, opportunities: [...state.opportunities, ...action.payload] };
    case END:
      return { ...state, end: true };
    case SELECTOPPORTUNITY:
      return { ...state, selectedOpportunity: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  count: 0,
  opportunities: [],
  selectedOpportunity: false,
  fetching: true,
  end: false,
};