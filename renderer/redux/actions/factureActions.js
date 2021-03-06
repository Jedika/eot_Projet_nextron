import * as types from "../constants/factureActionTypes";

export const addFacture = payload => ({
  type: types.ADD_FACTURE,
  payload
});

export const initFacture = payload => ({
  type: types.INIT_FACTURE,
  payload
});

export const setSelectedFacture = payload => ({
  type: types.SET_SELECTED_FACTURE,
  payload
});

export const setSelectFactureBySearchName = payload => ({
  type: types.SET_SELECT_FACTURE_BY_SEARCH_NAME,
  payload
});

export const setBeforeSetSelectedFacture = payload => ({
  type: types.SET_BEFORE_SET_SELECTED_FACTURE,
  payload
});
