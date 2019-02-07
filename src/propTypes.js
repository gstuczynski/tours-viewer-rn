import { func, shape, number, string, bool } from "prop-types";

export default {
  currentItem: shape({
    id: number,
    text: string,
    img: string,
    url: string
  }).isRequired,
  isViewerOpen: bool,
  onChangeViewerState: func.isRequired,
  setCurrentItem: func.isRequired
};
