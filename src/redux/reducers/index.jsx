import { STARTFETCHING, ENDFETCHING, ADDOPPORTUNITIES, TEST, END, SELECTOPPORTUNITY, ADDFAVORITES, REMOVEFAVORITE } from "../actions";

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
    case ADDFAVORITES:
      return { ...state, favorites: [...state.favorites, ...action.payload] };
    // case REMOVEFAVORITE:
    //   return { ...state, favorites: [...state.favorites.filter(action.payload)] };
    case REMOVEFAVORITE:
      console.log(action.payload)
      return { ...state, favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id) };
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
  favorites: [],
};
