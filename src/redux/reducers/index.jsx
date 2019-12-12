import {
  STARTFETCHING, ENDFETCHING, ADDOPPORTUNITIES, TEST, END, SELECTOPPORTUNITY, ADDFAVORITES, REMOVEFAVORITE, LOGGEDIN, ADDUSER, LOGOUT, CTA,
} from '../actions';

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
    case REMOVEFAVORITE:
      return { ...state, favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id) };
    case END:
      return { ...state, end: true };
    case SELECTOPPORTUNITY:
      return { ...state, selectedOpportunity: action.payload };
    case LOGGEDIN:
      return state.loggedIn;
    case ADDUSER:
      return { ...state, loggedIn: true, user: true };
    case LOGOUT:
      return {
        ...state, loggedIn: false, user: false, favorites: [],
      };
    case CTA:
      return { ...state, showCTA: action.payload };
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
  loggedIn: false,
  user: false,
  showCTA: false,
};
