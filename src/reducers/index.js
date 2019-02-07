import * as actionTypes from "./actionTypes";

const initialState = {
  currentItem: {},
  isViewerOpen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_ITEM:
      return { ...state, currentItem: action.payload };
    case actionTypes.CHANGE_VIEWER_STATUS:
      return { ...state, isViewerOpen: !state.isViewerOpen };
    default:
      return state;
  }
};

export default reducer;
