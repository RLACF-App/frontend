
export const TEST = 'TEST';
export const STARTFETCHING = 'STARTFETCHING';
export const ENDFETCHING = 'ENDFETCHING';
export const ADDOPPORTUNITIES = 'ADDOPPORTUNITIES';
export const END = 'END';
export const SELECTOPPORTUNITY = 'SELECTEDOPPORTUNITY';
export const ADDFAVORITES = 'ADDFAVORITES';
export const REMOVEFAVORITE = 'REMOVEFAVORITE';

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

export const selectOpportunity = (opportunity) => ({
  type: SELECTOPPORTUNITY,
  payload: opportunity,
});
