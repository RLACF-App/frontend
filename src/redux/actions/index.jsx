
export const TEST = 'TEST';
export const STARTFETCHING = 'STARTFETCHING';
export const ENDFETCHING = 'ENDFETCHING';
export const ADDOPPORTUNITIES = 'ADDOPPORTUNITIES';
export const END = 'END';
export const SELECTOPPORTUNITY = 'SELECTEDOPPORTUNITY';
export const ADDFAVORITES = 'ADDFAVORITES';
export const REMOVEFAVORITE = 'REMOVEFAVORITE';
export const LOGGEDIN = 'LOGGEDIN';
export const ADDUSER = 'ADDUSER';
export const LOGOUT = 'LOGOUT';

export const test = () => ({
  type: TEST,
});

export const startfetching = () => ({
  type: STARTFETCHING,
});

export const endfetching = () => ({
  type: ENDFETCHING,
});

export const addopportunities = (opportunities) => ({
  type: ADDOPPORTUNITIES,
  payload: opportunities,
});

export const addfavorites = (opportunities) => ({
  type: ADDFAVORITES,
  payload: opportunities,
});

export const removefavorite = (opportunity) => ({
  type: REMOVEFAVORITE,
  payload: opportunity,
});

export const end = () => ({
  type: END,
});

export const loggedIn = () => ({
  type: LOGGEDIN,
});

export const adduser = (user) => ({
  type: ADDUSER,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const selectOpportunity = (opportunity) => ({
  type: SELECTOPPORTUNITY,
  payload: opportunity,
});
